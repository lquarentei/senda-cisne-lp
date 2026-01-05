import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from 'jsr:@supabase/supabase-js@2';
import { isAdmin, isValidURL, sanitizeText, createAuditLog, IMAGE_VALIDATION } from './admin-config.tsx';

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-a977770f/health", (c) => {
  return c.json({ status: "ok" });
});

// ========================================
// ADMIN AUTH MIDDLEWARE
// ========================================
async function requireAdmin(c: any, next: any) {
  const accessToken = c.req.header('Authorization')?.split(' ')[1];
  
  if (!accessToken) {
    return c.json({ error: 'Token de autenticação não fornecido' }, 401);
  }

  const { isAdmin: authorized, userId, email } = await isAdmin(accessToken);

  if (!authorized) {
    return c.json({ error: 'Acesso negado. Apenas administradores podem acessar este recurso.' }, 403);
  }

  // Adicionar dados do usuário ao contexto
  c.set('userId', userId);
  c.set('userEmail', email);

  await next();
}

// ========================================
// ADMIN ROUTES - IMAGES
// ========================================

// GET: Listar todas as imagens configuradas
app.get("/make-server-a977770f/admin/images", requireAdmin, async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data, error } = await supabase
      .from('site_images')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return c.json({ success: true, images: data });
  } catch (error) {
    console.error('Erro ao listar imagens:', error);
    return c.json({ success: false, error: 'Erro ao listar imagens' }, 500);
  }
});

// POST: Upload de nova imagem
app.post("/make-server-a977770f/admin/images/upload", requireAdmin, async (c) => {
  try {
    const userId = c.get('userId');
    const body = await c.req.json();
    const { imageType, imageKey, file, fileName } = body;

    // Validar tipo de imagem
    if (!IMAGE_VALIDATION[imageType as keyof typeof IMAGE_VALIDATION]) {
      return c.json({ success: false, error: 'Tipo de imagem inválido' }, 400);
    }

    const validation = IMAGE_VALIDATION[imageType as keyof typeof IMAGE_VALIDATION];

    // Validar tamanho (file deve ser base64)
    const base64Data = file.split(',')[1] || file;
    const fileSize = (base64Data.length * 3) / 4;

    if (fileSize > validation.maxSize) {
      return c.json({ 
        success: false, 
        error: `Arquivo muito grande. Máximo: ${validation.maxSize / 1024 / 1024}MB` 
      }, 400);
    }

    // Upload para Supabase Storage
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const bucketName = 'make-a977770f-site-assets';

    // Criar bucket se não existir
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);

    if (!bucketExists) {
      await supabase.storage.createBucket(bucketName, {
        public: true,
        fileSizeLimit: 10 * 1024 * 1024, // 10MB
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
      });
    }

    // Gerar nome único do arquivo
    const fileExt = fileName.split('.').pop();
    const uniqueFileName = `${imageType}/${imageKey}-${Date.now()}.${fileExt}`;

    // Converter base64 para Uint8Array
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Upload
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(uniqueFileName, bytes, {
        contentType: validation.acceptedFormats[0],
        upsert: false,
      });

    if (uploadError) throw uploadError;

    // Obter URL pública
    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(uniqueFileName);

    // Salvar no banco de dados
    const { data: imageData, error: dbError } = await supabase
      .from('site_images')
      .insert({
        image_key: imageKey,
        image_type: imageType,
        url: urlData.publicUrl,
        storage_path: uniqueFileName,
        uploaded_by: userId,
        is_active: true,
      })
      .select()
      .single();

    if (dbError) throw dbError;

    // Criar log de auditoria
    await createAuditLog(
      userId,
      'upload_image',
      'site_images',
      imageData.id,
      { imageKey, imageType, url: urlData.publicUrl }
    );

    return c.json({ 
      success: true, 
      image: imageData,
      message: 'Imagem enviada com sucesso' 
    });

  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    return c.json({ success: false, error: 'Erro ao fazer upload da imagem' }, 500);
  }
});

// PUT: Ativar/desativar imagem
app.put("/make-server-a977770f/admin/images/:id/toggle", requireAdmin, async (c) => {
  try {
    const userId = c.get('userId');
    const imageId = c.req.param('id');
    const { isActive } = await c.req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data, error } = await supabase
      .from('site_images')
      .update({ is_active: isActive })
      .eq('id', imageId)
      .select()
      .single();

    if (error) throw error;

    await createAuditLog(
      userId,
      isActive ? 'activate_image' : 'deactivate_image',
      'site_images',
      imageId,
      { isActive }
    );

    return c.json({ success: true, image: data });
  } catch (error) {
    console.error('Erro ao atualizar status da imagem:', error);
    return c.json({ success: false, error: 'Erro ao atualizar imagem' }, 500);
  }
});

// DELETE: Deletar imagem
app.delete("/make-server-a977770f/admin/images/:id", requireAdmin, async (c) => {
  try {
    const userId = c.get('userId');
    const imageId = c.req.param('id');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Buscar imagem antes de deletar
    const { data: image } = await supabase
      .from('site_images')
      .select('*')
      .eq('id', imageId)
      .single();

    if (!image) {
      return c.json({ success: false, error: 'Imagem não encontrada' }, 404);
    }

    // Deletar do storage
    const { error: storageError } = await supabase.storage
      .from('make-a977770f-site-assets')
      .remove([image.storage_path]);

    if (storageError) {
      console.error('Erro ao deletar do storage:', storageError);
    }

    // Deletar do banco
    const { error: dbError } = await supabase
      .from('site_images')
      .delete()
      .eq('id', imageId);

    if (dbError) throw dbError;

    await createAuditLog(
      userId,
      'delete_image',
      'site_images',
      imageId,
      { imageKey: image.image_key, url: image.url }
    );

    return c.json({ success: true, message: 'Imagem deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar imagem:', error);
    return c.json({ success: false, error: 'Erro ao deletar imagem' }, 500);
  }
});

// ========================================
// ADMIN ROUTES - LINKS
// ========================================

// GET: Listar todos os links
app.get("/make-server-a977770f/admin/links", requireAdmin, async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data, error } = await supabase
      .from('site_links')
      .select('*')
      .order('link_key', { ascending: true });

    if (error) throw error;

    return c.json({ success: true, links: data });
  } catch (error) {
    console.error('Erro ao listar links:', error);
    return c.json({ success: false, error: 'Erro ao listar links' }, 500);
  }
});

// POST: Criar novo link
app.post("/make-server-a977770f/admin/links", requireAdmin, async (c) => {
  try {
    const userId = c.get('userId');
    const { linkKey, url, label, openInNewTab, isActive } = await c.req.json();

    // Validar URL
    if (!isValidURL(url)) {
      return c.json({ success: false, error: 'URL inválida ou insegura' }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data, error } = await supabase
      .from('site_links')
      .insert({
        link_key: linkKey,
        url: url,
        label: sanitizeText(label),
        open_in_new_tab: openInNewTab ?? false,
        is_active: isActive ?? true,
        updated_by: userId,
      })
      .select()
      .single();

    if (error) throw error;

    await createAuditLog(
      userId,
      'create_link',
      'site_links',
      data.id,
      { linkKey, url, label }
    );

    return c.json({ success: true, link: data, message: 'Link criado com sucesso' });
  } catch (error) {
    console.error('Erro ao criar link:', error);
    return c.json({ success: false, error: 'Erro ao criar link' }, 500);
  }
});

// PUT: Atualizar link existente
app.put("/make-server-a977770f/admin/links/:id", requireAdmin, async (c) => {
  try {
    const userId = c.get('userId');
    const linkId = c.req.param('id');
    const { url, label, openInNewTab, isActive } = await c.req.json();

    // Validar URL se fornecida
    if (url && !isValidURL(url)) {
      return c.json({ success: false, error: 'URL inválida ou insegura' }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const updateData: any = {
      updated_by: userId,
      updated_at: new Date().toISOString(),
    };

    if (url !== undefined) updateData.url = url;
    if (label !== undefined) updateData.label = sanitizeText(label);
    if (openInNewTab !== undefined) updateData.open_in_new_tab = openInNewTab;
    if (isActive !== undefined) updateData.is_active = isActive;

    const { data, error } = await supabase
      .from('site_links')
      .update(updateData)
      .eq('id', linkId)
      .select()
      .single();

    if (error) throw error;

    await createAuditLog(
      userId,
      'update_link',
      'site_links',
      linkId,
      updateData
    );

    return c.json({ success: true, link: data, message: 'Link atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar link:', error);
    return c.json({ success: false, error: 'Erro ao atualizar link' }, 500);
  }
});

// DELETE: Deletar link
app.delete("/make-server-a977770f/admin/links/:id", requireAdmin, async (c) => {
  try {
    const userId = c.get('userId');
    const linkId = c.req.param('id');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { error } = await supabase
      .from('site_links')
      .delete()
      .eq('id', linkId);

    if (error) throw error;

    await createAuditLog(
      userId,
      'delete_link',
      'site_links',
      linkId,
      {}
    );

    return c.json({ success: true, message: 'Link deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar link:', error);
    return c.json({ success: false, error: 'Erro ao deletar link' }, 500);
  }
});

// ========================================
// PUBLIC ROUTES (Frontend consumption)
// ========================================

// GET: Obter configurações públicas do site
app.get("/make-server-a977770f/public/config", async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    // Buscar imagens ativas
    const { data: images } = await supabase
      .from('site_images')
      .select('image_key, url, image_type')
      .eq('is_active', true);

    // Buscar links ativos
    const { data: links } = await supabase
      .from('site_links')
      .select('link_key, url, label, open_in_new_tab')
      .eq('is_active', true);

    // Organizar dados por chave
    const imagesMap = images?.reduce((acc, img) => {
      acc[img.image_key] = img.url;
      return acc;
    }, {} as Record<string, string>) || {};

    const linksMap = links?.reduce((acc, link) => {
      acc[link.link_key] = {
        url: link.url,
        label: link.label,
        openInNewTab: link.open_in_new_tab,
      };
      return acc;
    }, {} as Record<string, any>) || {};

    return c.json({
      success: true,
      config: {
        images: imagesMap,
        links: linksMap,
      },
    });
  } catch (error) {
    console.error('Erro ao buscar configurações públicas:', error);
    return c.json({ success: false, error: 'Erro ao buscar configurações' }, 500);
  }
});

// GET: Logs de auditoria (apenas admin)
app.get("/make-server-a977770f/admin/audit-logs", requireAdmin, async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) throw error;

    return c.json({ success: true, logs: data });
  } catch (error) {
    console.error('Erro ao buscar logs de auditoria:', error);
    return c.json({ success: false, error: 'Erro ao buscar logs' }, 500);
  }
});

Deno.serve(app.fetch);