// js/supabase.js
const SUPABASE_URL = "https://jewxoyffdjobpfwpvvon.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impld3hveWZmZGpvYnBmd3B2dm9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzNjY4MDQsImV4cCI6MjEwMDk0MjgwNH0.6r0FfKUYHFVUW5utBl0x2Drvxo7VjtionjvIVzJISEQ";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Login စစ်ဆေးရန် Helper
async function checkAuth(requiredRole = null) {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    if (window.location.pathname.endsWith('admin.html') || window.location.pathname.endsWith('inbox.html')) {
      window.location.href = 'login.html';
    }
    return null;
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  // Admin မဟုတ်ရင် Admin page ဝင်မရအောင် တားဆီးခြင်း
  if (requiredRole === 'admin' && profile?.role !== 'admin') {
    window.location.href = 'index.html';
    return null;
  }

  return { session, profile };
      }
