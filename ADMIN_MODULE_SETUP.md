# 🔐 Módulo Administrativo - Senda do Cisne

## 📋 Visão Geral

Sistema completo de gerenciamento de conteúdo (CMS) para a landing page da Senda do Cisne, permitindo que administradores atualizem imagens, logos e links sem conhecimento técnico.

---

## 🏗️ Arquitetura do Sistema

```
┌──────────────────────────────────────────────────────────────┐
│                    CAMADA FRONTEND                           │
│  ┌────────────────┐              ┌──────────────────┐        │
│  │ Landing Page   │              │  Painel Admin    │        │
│  │ (Público)      │              │  (Protegido)     │        │
│  └────────┬───────┘              └────────┬─────────┘        │
└───────────┼──────────────────────────────┼──────────────────┘
            │                              │
            │ GET /public/config          │ Auth + CRUD
            │                              │
┌───────────▼──────────────────────────────▼──────────────────┐
│               CAMADA API (Hono + Deno)                       │
│  ┌─────────────────────────────────────────────────┐         │
│  │  Rotas Públicas:                                │         │
│  │    GET /public/config                           │         │
│  ├─────────────────────────────────────────────────┤         │
│  │  Rotas Admin (requer autenticação):             │         │
│  │    GET    /admin/images                         │         │
│  │    POST   /admin/images/upload                  │         │
│  │    PUT    /admin/images/:id/toggle              │         │
│  │    DELETE /admin/images/:id                     │         │
│  │    GET    /admin/links                          │         │
│  │    POST   /admin/links                          │         │
│  │    PUT    /admin/links/:id                      │         │
│  │    DELETE /admin/links/:id                      │         │
│  │    GET    /admin/audit-logs                     │         │
│  └─────────────────────────────────────────────────┘         │
└──────────────────────────┬───────────────────────────────────┘
                           │
┌──────────────────────────▼───────────────────────────────────┐
│                   CAMADA SUPABASE                            │
│  ┌──────────────────────────────────────────────┐            │
│  │  Auth: Controle de acesso por email         │            │
│  └──────────────────────────────────────────────┘            │
│  ┌──────────────────────────────────────────────┐            │
│  │  Storage: Bucket make-a977770f-site-assets   │            │
│  │    - Imagens hero                            │            │
│  │    - Logos                                   │            │
│  │    - Imagens de seção                        │            │
│  │    - Favicons                                │            │
│  └──────────────────────────────────────────────┘            │
│  ┌──────────────────────────────────────────────┐            │
│  │  Database PostgreSQL:                        │            │
│  │    📊 site_images                            │            │
│  │    📊 site_links                             │            │
│  │    📊 audit_logs                             │            │
│  └──────────────────────────────────────────────┘            │
└──────────────────────────────────────────────────────────────┘
```

---

## 🗄️ Estrutura do Banco de Dados

### Tabela: `site_images`
Armazena metadados das imagens do site.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID | Identificador único (PK) |
| `image_key` | TEXT | Chave identificadora (ex: "hero_main") |
| `image_type` | TEXT | Tipo: hero, logo, section, favicon |
| `url` | TEXT | URL pública da imagem (CDN Supabase) |
| `storage_path` | TEXT | Caminho no Storage |
| `uploaded_by` | UUID | ID do usuário que fez upload |
| `is_active` | BOOLEAN | Se a imagem está ativa |
| `created_at` | TIMESTAMP | Data de criação |

### Tabela: `site_links`
Gerencia os links de CTAs e botões.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID | Identificador único (PK) |
| `link_key` | TEXT | Chave identificadora (ex: "cta_hero") |
| `url` | TEXT | URL do link |
| `label` | TEXT | Texto do botão/link |
| `open_in_new_tab` | BOOLEAN | Abrir em nova aba |
| `is_active` | BOOLEAN | Se o link está ativo |
| `updated_by` | UUID | Último usuário que atualizou |
| `updated_at` | TIMESTAMP | Data da última atualização |

### Tabela: `audit_logs`
Logs de auditoria para rastreabilidade.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID | Identificador único (PK) |
| `user_id` | UUID | ID do usuário que executou a ação |
| `action` | TEXT | Ação executada (upload_image, etc) |
| `resource_type` | TEXT | Tipo de recurso afetado |
| `resource_id` | TEXT | ID do recurso |
| `details` | JSONB | Detalhes adicionais da ação |
| `created_at` | TIMESTAMP | Data/hora da ação |

---

## 🚀 Configuração Inicial

### 1️⃣ Criar Tabelas no Supabase

Acesse o **SQL Editor** no painel do Supabase e execute:

\`\`\`sql
-- Tabela de Imagens
CREATE TABLE IF NOT EXISTS site_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_key TEXT NOT NULL,
  image_type TEXT NOT NULL CHECK (image_type IN ('hero', 'logo', 'section', 'favicon')),
  url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  uploaded_by UUID,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_site_images_key ON site_images(image_key);
CREATE INDEX idx_site_images_active ON site_images(is_active);

-- Tabela de Links
CREATE TABLE IF NOT EXISTS site_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  link_key TEXT NOT NULL UNIQUE,
  url TEXT NOT NULL,
  label TEXT NOT NULL,
  open_in_new_tab BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  updated_by UUID,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_site_links_key ON site_links(link_key);
CREATE INDEX idx_site_links_active ON site_links(is_active);

-- Tabela de Logs de Auditoria
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);

-- Habilitar Row Level Security (RLS)
ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso público (apenas leitura para dados ativos)
CREATE POLICY "Public read active images" ON site_images
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public read active links" ON site_links
  FOR SELECT USING (is_active = true);

-- Comentário: Políticas de admin devem ser configuradas manualmente
-- ou via service_role_key (sem RLS)
\`\`\`

### 2️⃣ Criar Usuário Admin

No **Authentication** do Supabase:

1. Vá em **Authentication** → **Users**
2. Clique em **Add user** → **Create new user**
3. Preencha:
   - **Email**: `admin@pattydomingues.com`
   - **Password**: `[senha segura]`
   - Marque: ✅ **Auto Confirm User**
4. Clique em **Create user**

### 3️⃣ Configurar Emails Autorizados

Edite o arquivo `/supabase/functions/server/admin-config.tsx`:

\`\`\`typescript
export const ADMIN_EMAILS = [
  'admin@pattydomingues.com',
  'patty@sendadocisne.com',
  // Adicione mais emails conforme necessário
];
\`\`\`

---

## 🔒 Segurança Implementada

### ✅ Camadas de Proteção

1. **Autenticação Supabase Auth**
   - Login com email/senha
   - Tokens JWT com expiração
   - Session management automático

2. **Lista de Admins Autorizada**
   - Apenas emails na lista `ADMIN_EMAILS` têm acesso
   - Verificação em cada requisição

3. **Validação de Upload**
   - Formatos permitidos: PNG, JPG, WEBP, SVG
   - Tamanho máximo por tipo
   - Dimensões mínimas validadas

4. **Proteção contra XSS**
   - Sanitização de texto com `sanitizeText()`
   - Validação de URLs com `isValidURL()`
   - Bloqueio de `javascript:` e `data:` schemes

5. **Storage Seguro**
   - Bucket privado com acesso controlado
   - URLs públicas apenas para imagens ativas
   - Controle de MIME types

6. **Auditoria Completa**
   - Log de todas as ações administrativas
   - Rastreamento de usuário, timestamp e detalhes
   - Histórico imutável

### 🚫 Proteções Contra Ataques

| Ataque | Proteção |
|--------|----------|
| **SQL Injection** | Supabase SDK com prepared statements |
| **XSS** | Sanitização de inputs com escape HTML |
| **CSRF** | Token JWT em Authorization header |
| **File Upload Malicioso** | Validação de MIME type e extensão |
| **URL Injection** | Validação de protocolo e formato |
| **Unauthorized Access** | Middleware `requireAdmin` em todas as rotas |

---

## 📱 Como Usar o Painel Admin

### Acessar o Painel

1. Acesse: `https://seu-site.com/admin`
2. Faça login com email e senha de admin
3. Você será redirecionado para o dashboard

### Gerenciar Imagens

#### Upload de Nova Imagem

1. Vá para a aba **"Imagens"**
2. Selecione o **tipo de imagem**:
   - **Hero**: Banner principal (máx 5MB, mín 1200x600px)
   - **Logo**: Logo da marca (máx 1MB, mín 200x50px)
   - **Section**: Imagens de seções (máx 3MB, mín 800x400px)
   - **Favicon**: Ícone do site (máx 100KB, mín 16x16px)
3. Defina um **identificador único** (ex: `hero_main`, `logo_header`)
4. Selecione o arquivo
5. Veja o preview
6. Clique em **"Enviar Imagem"**

#### Ativar/Desativar Imagem

- Use o switch **Ativa/Inativa** para controlar visibilidade
- Imagens inativas não aparecem no site, mas permanecem no banco

#### Deletar Imagem

- Clique no ícone de **lixeira**
- Confirme a exclusão
- ⚠️ Ação irreversível!

### Gerenciar Links

1. Vá para a aba **"Links"**
2. Clique em **"Editar"** no link desejado
3. Atualize:
   - **URL**: Endereço do link
   - **Texto do Botão**: Label visível
   - **Abrir em nova aba**: Toggle para `target="_blank"`
   - **Ativo**: Mostrar/ocultar o botão
4. Clique em **"Salvar"**

### Ver Histórico (Audit Logs)

1. Vá para a aba **"Logs"**
2. Veja todas as ações realizadas:
   - Quem fez
   - Quando
   - Que tipo de ação
   - Detalhes técnicos

---

## 🔄 Integração com a Landing Page

### Consumir Configurações no Frontend

Atualize `/src/app/components/SendaDoCisneLP.tsx`:

\`\`\`typescript
import { useEffect, useState } from 'react';
import { projectId } from '../../utils/supabase/info';

const API_URL = \`https://\${projectId}.supabase.co/functions/v1/make-server-a977770f\`;

export const SendaDoCisneLP = () => {
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    // Buscar configurações do site
    fetch(\`\${API_URL}/public/config\`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setConfig(data.config);
        }
      });
  }, []);

  // Usar imagens dinâmicas
  const heroImage = config?.images?.hero_main || 'fallback-url.jpg';
  const logoUrl = config?.images?.logo_header || 'fallback-logo.png';

  // Usar links dinâmicos
  const ctaHeroLink = config?.links?.cta_hero?.url || '#';
  const ctaHeroLabel = config?.links?.cta_hero?.label || 'Saiba Mais';

  return (
    <div>
      <img src={heroImage} alt="Hero" />
      <a href={ctaHeroLink}>{ctaHeroLabel}</a>
    </div>
  );
};
\`\`\`

---

## 🧪 Validações Automáticas

### Imagens

| Tipo | Tamanho Máx | Dimensão Mín | Formatos Aceitos |
|------|-------------|--------------|------------------|
| **hero** | 5 MB | 1200x600 | JPG, PNG, WEBP |
| **logo** | 1 MB | 200x50 | PNG, SVG, WEBP |
| **section** | 3 MB | 800x400 | JPG, PNG, WEBP |
| **favicon** | 100 KB | 16x16 | PNG, ICO, SVG |

### URLs

- ✅ Permitidos: `http://`, `https://`, `/caminho`, `#ancora`
- ❌ Bloqueados: `javascript:`, `data:`, `file://`

### Textos

- Escape automático de caracteres HTML: `<`, `>`, `"`, `'`, `/`
- Prevenção de injeção de scripts

---

## 📊 Monitoramento

### Logs de Auditoria

Todas as ações ficam registradas:

\`\`\`json
{
  "user_id": "abc-123-def",
  "action": "upload_image",
  "resource_type": "site_images",
  "resource_id": "img-456",
  "details": {
    "imageKey": "hero_main",
    "imageType": "hero",
    "url": "https://..."
  },
  "created_at": "2025-01-31T10:30:00Z"
}
\`\`\`

### Tipos de Ações

- `upload_image`
- `delete_image`
- `activate_image`
- `deactivate_image`
- `create_link`
- `update_link`
- `delete_link`

---

## 🛠️ Manutenção

### Adicionar Novo Admin

1. Crie usuário no Supabase Auth
2. Adicione email em `admin-config.tsx`
3. Redeploy do backend (automático no Supabase)

### Alterar Validações de Imagem

Edite `IMAGE_VALIDATION` em `/supabase/functions/server/admin-config.tsx`:

\`\`\`typescript
export const IMAGE_VALIDATION = {
  hero: {
    maxSize: 10 * 1024 * 1024, // Aumentar para 10MB
    minWidth: 1920, // Aumentar resolução mínima
    minHeight: 1080,
    acceptedFormats: ['image/jpeg', 'image/png', 'image/webp'],
  },
  // ...
};
\`\`\`

### Limpar Storage Antigo

Execute periodicamente para remover arquivos órfãos:

\`\`\`sql
-- Buscar imagens deletadas do banco que ainda estão no storage
SELECT storage_path FROM site_images WHERE deleted = true;
\`\`\`

---

## ⚠️ Avisos Importantes

1. **Não compartilhe o SUPABASE_SERVICE_ROLE_KEY**
   - Nunca exponha no frontend
   - Use apenas no backend

2. **Backup Regular**
   - Faça backup das tabelas semanalmente
   - Supabase oferece backups automáticos no plano pago

3. **Rate Limiting**
   - Considere adicionar rate limiting para uploads
   - Protege contra abuso

4. **Monitoramento**
   - Verifique os logs regularmente
   - Configure alertas para ações suspeitas

---

## 📞 Suporte Técnico

Para dúvidas ou problemas:

1. Verifique os logs no Supabase Dashboard
2. Consulte a documentação do Supabase
3. Entre em contato com o desenvolvedor

---

**Desenvolvido com 💗 para transformar o gerenciamento do Senda do Cisne**
