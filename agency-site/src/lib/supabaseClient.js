import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase;

if (supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your_supabase_url_here' && supabaseUrl.trim() !== '') {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn("Supabase credentials not configured. Operating in mock mode.");
  supabase = {
    from: (table) => ({
      insert: async (data) => {
        console.log(`[Mock Supabase INSERT into ${table}]:`, data);
        try {
          const key = `mock_supabase_${table}`;
          const existing = JSON.parse(localStorage.getItem(key) || '[]');
          const formattedRows = Array.isArray(data) ? data : [data];
          const newRows = formattedRows.map(row => ({
            id: Math.random().toString(36).substr(2, 9),
            ...row,
            created_at: new Date().toISOString()
          }));
          existing.push(...newRows);
          localStorage.setItem(key, JSON.stringify(existing));
          console.log(`[Mock Database Saved]:`, newRows);
        } catch (e) {
          console.error("Local storage mock write failed:", e);
        }
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        return { data, error: null };
      },
      select: async () => {
        console.log(`[Mock Supabase SELECT from ${table}]`);
        let localData = [];
        try {
          localData = JSON.parse(localStorage.getItem(`mock_supabase_${table}`) || '[]');
        } catch (e) {
          console.error("Local storage mock read failed:", e);
        }
        return { data: localData, error: null };
      }
    })
  };
}

export { supabase };
