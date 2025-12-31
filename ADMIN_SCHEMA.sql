-- ========================================
-- SQL SCHEMA PARA ADMIN MODULE
-- Senda do Cisne - Landing Page CMS
-- ========================================

-- Execute este script no SQL Editor do Supabase
-- Dashboard → SQL Editor → New Query → Cole e Execute

-- ========================================
-- 1. TABELA: site_images
-- Armazena metadados das imagens do site
-- ========================================

CREATE TABLE IF NOT EXISTS site_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_key TEXT NOT NULL,
  image_type TEXT NOT NULL CHECK (image_type IN ('hero', 'logo', 'section', 'favicon')),
  url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  uploaded_by UUID REFERENCES auth.users(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_site_images_key ON site_images(image_key);
CREATE INDEX idx_site_images_active ON site_images(is_active);
CREATE INDEX idx_site_images_type ON site_images(image_type);

-- Comentários para documentação
COMMENT ON TABLE site_images IS 'Metadados das imagens do site gerenciadas pelo admin';
COMMENT ON COLUMN site_images.image_key IS 'Identificador único da imagem (ex: hero_main, logo_header)';
COMMENT ON COLUMN site_images.image_type IS 'Tipo da imagem: hero, logo, section ou favicon';
COMMENT ON COLUMN site_images.url IS 'URL pública da imagem no Supabase Storage';
COMMENT ON COLUMN site_images.storage_path IS 'Caminho completo no bucket do Storage';
COMMENT ON COLUMN site_images.is_active IS 'Se true, a imagem aparece no site';

-- ========================================
-- 2. TABELA: site_links
-- Gerencia links de CTAs e botões
-- ========================================

CREATE TABLE IF NOT EXISTS site_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  link_key TEXT NOT NULL UNIQUE,
  url TEXT NOT NULL,
  label TEXT NOT NULL,
  open_in_new_tab BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  updated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_site_links_key ON site_links(link_key);
CREATE INDEX idx_site_links_active ON site_links(is_active);

-- Comentários para documentação
COMMENT ON TABLE site_links IS 'Links de CTAs, botões e menus do site';
COMMENT ON COLUMN site_links.link_key IS 'Identificador único do link (ex: cta_hero, btn_whatsapp)';
COMMENT ON COLUMN site_links.url IS 'URL de destino do link';
COMMENT ON COLUMN site_links.label IS 'Texto exibido no botão/link';
COMMENT ON COLUMN site_links.open_in_new_tab IS 'Se true, abre em nova aba (target="_blank")';
COMMENT ON COLUMN site_links.is_active IS 'Se true, o link aparece no site';

-- ========================================
-- 3. TABELA: audit_logs
-- Logs de auditoria para rastreamento
-- ========================================

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_type, resource_id);

-- Comentários para documentação
COMMENT ON TABLE audit_logs IS 'Logs de auditoria de todas as ações administrativas';
COMMENT ON COLUMN audit_logs.action IS 'Tipo de ação (upload_image, delete_link, etc)';
COMMENT ON COLUMN audit_logs.resource_type IS 'Tipo de recurso afetado (site_images, site_links)';
COMMENT ON COLUMN audit_logs.resource_id IS 'ID do recurso afetado';
COMMENT ON COLUMN audit_logs.details IS 'Detalhes adicionais em formato JSON';

-- ========================================
-- 4. TABELA: image_versions
-- Versionamento de imagens para rollback
-- ========================================

CREATE TABLE IF NOT EXISTS image_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_id UUID REFERENCES site_images(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  replaced_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_image_versions_image_id ON image_versions(image_id);
CREATE INDEX idx_image_versions_version ON image_versions(version_number DESC);

-- Comentários para documentação
COMMENT ON TABLE image_versions IS 'Histórico de versões de imagens para rollback';
COMMENT ON COLUMN image_versions.version_number IS 'Número sequencial da versão (1, 2, 3...)';
COMMENT ON COLUMN image_versions.url IS 'URL da versão anterior da imagem';

-- ========================================
-- 5. ROW LEVEL SECURITY (RLS)
-- Proteção de dados com políticas de acesso
-- ========================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE image_versions ENABLE ROW LEVEL SECURITY;

-- Política: Leitura pública apenas de dados ativos
CREATE POLICY "Public read active images" 
  ON site_images 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Public read active links" 
  ON site_links 
  FOR SELECT 
  USING (is_active = true);

-- Política: Admin tem acesso total (via service_role_key)
-- Nota: As operações do admin são feitas com SERVICE_ROLE_KEY
-- que bypassa RLS, portanto não criamos políticas adicionais aqui

-- ========================================
-- 6. TRIGGERS AUTOMÁTICOS
-- Atualizar timestamps e criar versões
-- ========================================

-- Trigger: Atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_site_images_updated_at 
  BEFORE UPDATE ON site_images
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_links_updated_at 
  BEFORE UPDATE ON site_links
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger: Criar versão anterior quando imagem é atualizada
CREATE OR REPLACE FUNCTION create_image_version()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.url != NEW.url THEN
        INSERT INTO image_versions (
            image_id, 
            version_number, 
            url, 
            storage_path, 
            replaced_by
        )
        SELECT 
            OLD.id,
            COALESCE(MAX(version_number), 0) + 1,
            OLD.url,
            OLD.storage_path,
            NEW.uploaded_by
        FROM image_versions
        WHERE image_id = OLD.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_image_version_on_update
  BEFORE UPDATE ON site_images
  FOR EACH ROW
  WHEN (OLD.url IS DISTINCT FROM NEW.url)
  EXECUTE FUNCTION create_image_version();

-- ========================================
-- 7. DADOS INICIAIS (SEED DATA)
-- Links padrão da Senda do Cisne
-- ========================================

-- Inserir links padrão do site
INSERT INTO site_links (link_key, url, label, open_in_new_tab, is_active) VALUES
  ('cta_hero', 'https://wa.me/5511999999999?text=Olá!%20Quero%20saber%20mais%20sobre%20a%20Senda%20do%20Cisne', 'Quero entrar na Senda do Cisne', true, true),
  ('cta_whatsapp', 'https://wa.me/5511999999999', 'Falar com a equipe no WhatsApp', true, true),
  ('cta_program', 'https://wa.me/5511999999999?text=Tenho%20interesse%20no%20programa', 'Quero viver essa jornada', true, true),
  ('cta_investment', '#investimento', 'Ver valores completos', false, true),
  ('cta_final', 'https://wa.me/5511999999999', 'Entrar na Senda do Cisne', true, true)
ON CONFLICT (link_key) DO NOTHING;

-- ========================================
-- 8. FUNÇÕES ÚTEIS
-- Helper functions para o admin
-- ========================================

-- Função: Restaurar versão anterior de imagem
CREATE OR REPLACE FUNCTION restore_image_version(
  p_image_id UUID,
  p_version_number INTEGER
)
RETURNS BOOLEAN AS $$
DECLARE
  v_version RECORD;
BEGIN
  -- Buscar a versão especificada
  SELECT * INTO v_version
  FROM image_versions
  WHERE image_id = p_image_id
    AND version_number = p_version_number;

  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;

  -- Atualizar imagem atual com a versão antiga
  UPDATE site_images
  SET 
    url = v_version.url,
    storage_path = v_version.storage_path,
    updated_at = NOW()
  WHERE id = p_image_id;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION restore_image_version IS 'Restaura uma versão anterior de uma imagem';

-- Função: Limpar versões antigas (manter apenas N últimas)
CREATE OR REPLACE FUNCTION cleanup_old_versions(
  p_image_id UUID,
  p_keep_count INTEGER DEFAULT 5
)
RETURNS INTEGER AS $$
DECLARE
  v_deleted_count INTEGER;
BEGIN
  WITH versions_to_delete AS (
    SELECT id
    FROM image_versions
    WHERE image_id = p_image_id
    ORDER BY version_number DESC
    OFFSET p_keep_count
  )
  DELETE FROM image_versions
  WHERE id IN (SELECT id FROM versions_to_delete);

  GET DIAGNOSTICS v_deleted_count = ROW_COUNT;
  RETURN v_deleted_count;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION cleanup_old_versions IS 'Remove versões antigas de imagens, mantendo apenas as N mais recentes';

-- ========================================
-- 9. VIEWS ÚTEIS
-- Views para consultas rápidas
-- ========================================

-- View: Imagens ativas com informações do uploader
CREATE OR REPLACE VIEW v_active_images AS
SELECT 
  i.id,
  i.image_key,
  i.image_type,
  i.url,
  i.created_at,
  u.email as uploaded_by_email,
  COUNT(v.id) as version_count
FROM site_images i
LEFT JOIN auth.users u ON i.uploaded_by = u.id
LEFT JOIN image_versions v ON v.image_id = i.id
WHERE i.is_active = true
GROUP BY i.id, i.image_key, i.image_type, i.url, i.created_at, u.email;

COMMENT ON VIEW v_active_images IS 'View de imagens ativas com informações do uploader';

-- View: Links ativos
CREATE OR REPLACE VIEW v_active_links AS
SELECT 
  l.id,
  l.link_key,
  l.url,
  l.label,
  l.open_in_new_tab,
  l.updated_at,
  u.email as updated_by_email
FROM site_links l
LEFT JOIN auth.users u ON l.updated_by = u.id
WHERE l.is_active = true;

COMMENT ON VIEW v_active_links IS 'View de links ativos com informações do editor';

-- View: Últimas ações do log
CREATE OR REPLACE VIEW v_recent_actions AS
SELECT 
  a.id,
  a.action,
  a.resource_type,
  a.resource_id,
  a.details,
  a.created_at,
  u.email as user_email
FROM audit_logs a
LEFT JOIN auth.users u ON a.user_id = u.id
ORDER BY a.created_at DESC
LIMIT 100;

COMMENT ON VIEW v_recent_actions IS 'View das 100 ações mais recentes do log de auditoria';

-- ========================================
-- 10. VERIFICAÇÃO FINAL
-- Query para verificar se tudo foi criado
-- ========================================

SELECT 
  'Tables' as object_type,
  COUNT(*) as count
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('site_images', 'site_links', 'audit_logs', 'image_versions')

UNION ALL

SELECT 
  'Indexes' as object_type,
  COUNT(*) as count
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN ('site_images', 'site_links', 'audit_logs', 'image_versions')

UNION ALL

SELECT 
  'Triggers' as object_type,
  COUNT(*) as count
FROM information_schema.triggers
WHERE event_object_schema = 'public'
  AND event_object_table IN ('site_images', 'site_links')

UNION ALL

SELECT 
  'Views' as object_type,
  COUNT(*) as count
FROM information_schema.views
WHERE table_schema = 'public'
  AND table_name LIKE 'v_%';

-- ========================================
-- FIM DO SCHEMA
-- ========================================
