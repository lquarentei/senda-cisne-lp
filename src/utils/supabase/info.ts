// Supabase connection info
// These values should be set in your environment variables

// A integração Netlify + Supabase cria variáveis com prefixo "SUPABASE_"
// Mas também aceitamos o prefixo "VITE_" para compatibilidade
export const projectId = 
  import.meta.env.VITE_SUPABASE_PROJECT_ID || 
  import.meta.env.SUPABASE_PROJECT_ID || 
  '';

export const publicAnonKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  import.meta.env.SUPABASE_ANON_KEY || 
  import.meta.env.SUPABASE_KEY ||
  '';

// URL completa (algumas integrações fornecem isso diretamente)
export const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  import.meta.env.SUPABASE_URL || 
  (projectId ? `https://${projectId}.supabase.co` : '');