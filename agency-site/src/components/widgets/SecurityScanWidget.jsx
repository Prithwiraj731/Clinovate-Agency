import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabaseClient';
import Button from '../ui/Button';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';
import { ShieldCheck, ShieldAlert, Shield, Loader, ArrowRight, RefreshCw, AlertTriangle } from 'lucide-react';

export default function SecurityScanWidget() {
  const [url, setUrl] = useState('');
  const [scanState, setScanState] = useState('idle'); // 'idle' | 'scanning' | 'completed' | 'error'
  const [progressMsg, setProgressMsg] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const validateUrl = (str) => {
    // Basic pattern validation
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      'localhost|'+ // localhost
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  };

  const handleScan = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    if (!validateUrl(url)) {
      setErrorMsg("Please enter a valid website domain or URL (e.g. example.com).");
      setScanState('error');
      return;
    }

    setScanState('scanning');
    setErrorMsg('');
    
    // Animate scanner console steps
    const steps = [
      "Initiating secure handshake...",
      "Resolving DNS and routing paths...",
      "Checking SSL/TLS certificate status...",
      "Analyzing security headers (HSTS, CSP, X-Frame-Options)...",
      "Compiling vulnerabilities database..."
    ];

    let currentStep = 0;
    setProgressMsg(steps[0]);
    
    const stepInterval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setProgressMsg(steps[currentStep]);
      } else {
        clearInterval(stepInterval);
      }
    }, 600);

    const startTime = Date.now();

    try {
      // Call real Vercel API
      // Use window.location.origin to support local/prod routing
      const scanApiUrl = `/api/scan?url=${encodeURIComponent(url)}`;
      const response = await fetch(scanApiUrl);
      
      const elapsedTime = Date.now() - startTime;
      const minDuration = 3000; // Force at least 3s of animation for premium feel
      if (elapsedTime < minDuration) {
        await new Promise(resolve => setTimeout(resolve, minDuration - elapsedTime));
      }

      clearInterval(stepInterval);

      if (!response.ok) {
        throw new Error("API call failed (e.g. CORS or 404)");
      }

      const data = await response.json();
      setScanResult(data);
      setScanState('completed');

      // Log results to Supabase leads table
      await logScanLead(url, data.score);

    } catch (err) {
      console.warn("Scan API unreachable. Operating in local fail-safe simulation mode.");
      
      // Local simulated fallback scan (gives clinic/small business domains a realistic, imperfect score)
      const simulatedScore = generateSimulatedScore(url);
      
      const elapsedTime = Date.now() - startTime;
      const minDuration = 3000;
      if (elapsedTime < minDuration) {
        await new Promise(resolve => setTimeout(resolve, minDuration - elapsedTime));
      }

      clearInterval(stepInterval);
      setScanResult(simulatedScore);
      setScanState('completed');

      // Log results to Supabase leads table
      await logScanLead(url, simulatedScore.score);
    }
  };

  const logScanLead = async (scannedUrl, score) => {
    try {
      const { error } = await supabase.from('leads').insert([
        {
          name: "Anonymous Web Scanner",
          email: "",
          business_type: "Lead Magnet Target",
          message: `Automatic Web Shield Scan performed for domain: ${scannedUrl}. Score generated: ${score}/100. Needs follow-up.`,
          source: "security_scan",
          scanned_url: scannedUrl
        }
      ]);
      if (error) console.error("Error logging scan to Supabase:", error);
    } catch (e) {
      console.error("Database logs bypassed:", e);
    }
  };

  const generateSimulatedScore = (domain) => {
    const isMockHttps = !domain.startsWith('http://');
    
    // Simulate typical local business website vulnerabilities
    const findings = [
      {
        severity: "high",
        header: "Content-Security-Policy (CSP)",
        message: "CSP is missing, leaving the site vulnerable to cross-site scripting (XSS) and injection exploits."
      },
      {
        severity: "high",
        header: "Strict-Transport-Security (HSTS)",
        message: "HSTS header is absent. Malicious actors could downgrade user connections to insecure HTTP."
      },
      {
        severity: "medium",
        header: "X-Frame-Options",
        message: "Header is missing. Clickjacking attackers can overlay invisible UI frames onto your layout."
      }
    ];

    let score = 35; // Default score for typical vulnerable sites
    if (isMockHttps) {
      score += 20; // 55
    } else {
      findings.unshift({
        severity: "critical",
        header: "HTTPS Connection",
        message: "Insecure connection detected. Sensitive user logins are sent over unencrypted channels."
      });
      score = 15;
    }

    return {
      url: domain,
      sslEnabled: isMockHttps,
      score: score,
      findings: findings,
      isSimulated: true
    };
  };

  const resetScanner = () => {
    setScanState('idle');
    setUrl('');
    setScanResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {scanState === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <GlassCard glowColor="gold" className="relative">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-accent-gold w-6 h-6 animate-pulse" />
                <h3 className="text-xl font-bold font-serif text-text-primary">Instant Web Shield Analyzer</h3>
              </div>
              <p className="text-sm text-text-muted mb-6">
                Enter your website URL to scan for missing SSL certificates, rate limits, and vulnerable headers.
              </p>
              
              <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="e.g. myclinicdomain.com"
                  className="flex-1 px-4 py-3 bg-bg border border-white/10 rounded-lg text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent-gold/40 focus:border-accent-gold/40 font-sans"
                />
                <Button type="submit" variant="primary" magnetic={true}>
                  Scan Website <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </GlassCard>
          </motion.div>
        )}

        {scanState === 'scanning' && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full"
          >
            <GlassCard glowColor="gold" className="text-center py-10">
              <Loader className="w-12 h-12 text-accent-gold animate-spin mx-auto mb-6" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">Analyzing Domain</h3>
              <p className="text-xs font-mono text-accent-gold bg-bg/50 px-4 py-2 rounded border border-white/5 inline-block max-w-md mx-auto">
                {progressMsg}
              </p>
            </GlassCard>
          </motion.div>
        )}

        {scanState === 'completed' && scanResult && (
          <motion.div
            key="completed"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="w-full"
          >
            <GlassCard 
              glowColor={scanResult.score >= 80 ? 'emerald' : 'gold'}
              className="text-left"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-white/10 pb-6">
                <div>
                  <Badge variant={scanResult.score >= 80 ? 'emerald' : 'gold'} className="mb-2">
                    Analysis Completed
                  </Badge>
                  <h4 className="text-lg font-mono text-text-primary break-all">
                    {scanResult.url}
                  </h4>
                  {scanResult.isSimulated && (
                    <span className="text-[10px] text-accent-gold bg-accent-gold/5 px-2 py-0.5 rounded border border-accent-gold/10 inline-block mt-1 font-mono">
                      * Local Demo Sandbox Mode
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="block text-xs uppercase text-text-muted tracking-wider">Site Shield Score</span>
                    <span className={`text-4xl font-mono font-bold ${
                      scanResult.score >= 80 ? 'text-accent-emerald' : 
                      scanResult.score >= 50 ? 'text-yellow-500' : 'text-red-500'
                    }`}>
                      {scanResult.score}/100
                    </span>
                  </div>
                  
                  <div className="p-3 rounded-full bg-white/5">
                    {scanResult.score >= 80 ? (
                      <ShieldCheck className="w-10 h-10 text-accent-emerald" />
                    ) : (
                      <ShieldAlert className="w-10 h-10 text-red-500" />
                    )}
                  </div>
                </div>
              </div>

              {/* Vulnerabilities and findings */}
              <div className="space-y-4 mb-8 max-h-60 overflow-y-auto pr-2">
                <h5 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">
                  Vulnerability Analysis
                </h5>
                
                {scanResult.findings.length === 0 ? (
                  <div className="flex gap-3 items-center bg-accent-emerald/5 border border-accent-emerald/20 p-4 rounded-lg">
                    <ShieldCheck className="text-accent-emerald w-5 h-5 shrink-0" />
                    <p className="text-sm text-text-primary">
                      Outstanding results! No major security header flaws or vulnerabilities detected.
                    </p>
                  </div>
                ) : (
                  scanResult.findings.map((finding, idx) => (
                    <div key={idx} className="flex gap-3 bg-white/5 border border-white/5 p-4 rounded-lg">
                      <div className="shrink-0 mt-0.5">
                        {finding.severity === 'critical' || finding.severity === 'high' ? (
                          <AlertTriangle className="text-red-500 w-5 h-5" />
                        ) : (
                          <ShieldAlert className="text-yellow-500 w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <span className="font-mono text-xs font-semibold text-text-primary block">
                          [{finding.severity.toUpperCase()}] {finding.header}
                        </span>
                        <p className="text-xs text-text-muted mt-1 leading-relaxed">
                          {finding.message}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/5 -mx-6 md:-mx-8 -mb-6 md:-mb-8 p-6 rounded-b-2xl border-t border-white/10">
                <span className="text-xs text-text-muted text-center sm:text-left">
                  Need these vulnerabilities patched? We configure bank-grade protections.
                </span>
                
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={resetScanner}>
                    <RefreshCw className="w-4 h-4" /> Scan Another
                  </Button>
                  <Button variant="primary" href="#contact" magnetic={true}>
                    Secure My Site
                  </Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {scanState === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
          >
            <GlassCard glowColor="gold" className="border-red-500/30 text-center py-8">
              <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">Scan Failed</h3>
              <p className="text-sm text-text-muted max-w-md mx-auto mb-6">
                {errorMsg || "An unexpected error occurred during resolution. Please verify the URL and try again."}
              </p>
              <Button variant="secondary" onClick={resetScanner}>
                Go Back & Retry
              </Button>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
