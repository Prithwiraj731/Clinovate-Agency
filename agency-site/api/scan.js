// api/scan.js
// Vercel Serverless Function for Website Security Scanning

const rateLimitMap = new Map();
const LIMIT = 5; // max 5 scans per IP per window
const WINDOW = 60000; // 1 minute window

export default async function handler(req, res) {
  // Enforce CORS headers for local/production security
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: "Method not allowed. Use GET." });
  }

  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: "Query parameter 'url' is required." });
  }

  // 1. IP Rate Limiting (in-memory, clean-up inline)
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'anonymous';
  const now = Date.now();
  
  // Clean up old rates
  if (rateLimitMap.size > 1000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now - value.timestamp > WINDOW) {
        rateLimitMap.delete(key);
      }
    }
  }

  const clientData = rateLimitMap.get(ip) || { count: 0, timestamp: now };
  if (now - clientData.timestamp > WINDOW) {
    clientData.count = 1;
    clientData.timestamp = now;
  } else {
    clientData.count++;
  }
  rateLimitMap.set(ip, clientData);

  if (clientData.count > LIMIT) {
    return res.status(429).json({ 
      error: "Too many security scans. Please wait 1 minute before scanning another URL." 
    });
  }

  // 2. Format and sanitize URL
  let targetUrl = url.trim();
  if (!/^https?:\/\//i.test(targetUrl)) {
    targetUrl = 'https://' + targetUrl;
  }

  try {
    const parsedUrl = new URL(targetUrl);
    // Basic hostname validation
    if (!parsedUrl.hostname.includes('.')) {
      return res.status(400).json({ error: "Please enter a valid domain name." });
    }
  } catch (e) {
    return res.status(400).json({ error: "Invalid URL format." });
  }

  try {
    // 3. Perform Fetch Check
    // We use a short timeout (4 seconds) to avoid keeping the function open
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ClinovateSiteShieldScanner/1.0'
      },
      signal: controller.signal,
      redirect: 'follow'
    });
    
    clearTimeout(timeoutId);

    const headers = response.headers;
    const finalUrl = response.url;
    const isHttps = finalUrl.startsWith('https://');

    // 4. Inspect Security Headers & Score
    let score = 0;
    const findings = [];

    // HTTPS check (20 points)
    if (isHttps) {
      score += 20;
    } else {
      findings.push({
        severity: "critical",
        header: "HTTPS",
        message: "Connection is insecure (HTTP). Client data is transmitted in plain text."
      });
    }

    // Strict-Transport-Security (20 points)
    const hsts = headers.get('strict-transport-security');
    if (hsts) {
      score += 20;
    } else {
      findings.push({
        severity: "high",
        header: "Strict-Transport-Security (HSTS)",
        message: "HSTS is missing. Malicious actors could downgrade user sessions to insecure HTTP."
      });
    }

    // Content-Security-Policy (20 points)
    const csp = headers.get('content-security-policy');
    if (csp) {
      score += 20;
    } else {
      findings.push({
        severity: "high",
        header: "Content-Security-Policy (CSP)",
        message: "CSP is missing, leaving the site vulnerable to Cross-Site Scripting (XSS) injection."
      });
    }

    // X-Frame-Options (15 points)
    const xfo = headers.get('x-frame-options');
    if (xfo) {
      score += 15;
    } else {
      findings.push({
        severity: "medium",
        header: "X-Frame-Options",
        message: "Header is missing. The site can be embedded in an iframe, exposing it to Clickjacking."
      });
    }

    // X-Content-Type-Options (15 points)
    const xcto = headers.get('x-content-type-options');
    if (xcto && xcto.toLowerCase().includes('nosniff')) {
      score += 15;
    } else {
      findings.push({
        severity: "low",
        header: "X-Content-Type-Options",
        message: "Header is missing or not set to 'nosniff'. Browsers might MIME-sniff response types."
      });
    }

    // Referrer-Policy (10 points)
    const rp = headers.get('referrer-policy');
    if (rp) {
      score += 10;
    } else {
      findings.push({
        severity: "low",
        header: "Referrer-Policy",
        message: "Header is missing. Information about your users' navigation routes could leak to external domains."
      });
    }

    return res.status(200).json({
      url: targetUrl,
      resolvedUrl: finalUrl,
      sslEnabled: isHttps,
      score,
      findings
    });

  } catch (error) {
    // If the request fails, e.g. domain does not exist or connection blocked
    console.error("Scan error for url:", targetUrl, error);
    
    // Provide a structured error that handles offline/unreachable domains gracefully
    return res.status(500).json({ 
      error: "Unable to reach the domain. Please verify the URL and try again." 
    });
  }
}
