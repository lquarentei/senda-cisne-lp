import { createClient } from 'jsr:@supabase/supabase-js@2';

// Configurações de validação de imagens
export const IMAGE_VALIDATION = {
  hero: {
    maxSize: 5 * 1024 * 1024, // 5MB
    minWidth: 1200,
    minHeight: 600,
    acceptedFormats: ['image/jpeg', 'image/png', 'image/webp'],
  },
  logo: {
    maxSize: 1 * 1024 * 1024, // 1MB
    minWidth: 200,
    minHeight: 50,
    acceptedFormats: ['image/png', 'image/svg+xml', 'image/webp'],
  },
  section: {
    maxSize: 3 * 1024 * 1024, // 3MB
    minWidth: 800,
    minHeight: 400,
    acceptedFormats: ['image/jpeg', 'image/png', 'image/webp'],
  },
  favicon: {
    maxSize: 100 * 1024, // 100KB
    minWidth: 16,
    minHeight: 16,
    acceptedFormats: ['image/png', 'image/x-icon', 'image/svg+xml'],
  },
};

// Lista de admins autorizados (emails)
export const ADMIN_EMAILS = [
  'prluccasflorencio@gmail.com',
  'patty@sendadocisne.com',
  // Adicione mais emails conforme necessário
];

// Verificar se usuário é admin
export async function isAdmin(accessToken: string): Promise<{ isAdmin: boolean; userId?: string; email?: string }> {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );

  const { data: { user }, error } = await supabase.auth.getUser(accessToken);

  if (error || !user) {
    return { isAdmin: false };
  }

  const isAuthorized = ADMIN_EMAILS.includes(user.email ?? '');

  return {
    isAdmin: isAuthorized,
    userId: user.id,
    email: user.email,
  };
}

// Validar URL para prevenir XSS
export function isValidURL(url: string): boolean {
  if (!url) return false;
  
  // Bloquear javascript: e data: schemes
  if (url.toLowerCase().startsWith('javascript:') || url.toLowerCase().startsWith('data:')) {
    return false;
  }

  // Validar formato de URL
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    // URLs relativas são aceitas
    return url.startsWith('/') || url.startsWith('#');
  }
}

// Sanitizar texto para prevenir XSS
export function sanitizeText(text: string): string {
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Criar log de auditoria
export async function createAuditLog(
  userId: string,
  action: string,
  resourceType: string,
  resourceId: string,
  details: Record<string, unknown>
) {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );

  const { error } = await supabase.from('audit_logs').insert({
    user_id: userId,
    action,
    resource_type: resourceType,
    resource_id: resourceId,
    details,
    created_at: new Date().toISOString(),
  });

  if (error) {
    console.error('Erro ao criar log de auditoria:', error);
  }
}
