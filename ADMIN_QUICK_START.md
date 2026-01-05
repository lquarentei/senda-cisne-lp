# 🚀 Quick Start - Admin Module

## 🎯 Setup em 5 Passos

### 1️⃣ Criar Tabelas no Supabase

1. Acesse seu projeto no [Supabase Dashboard](https://app.supabase.com)
2. Vá em **SQL Editor** (ícone `</>` na barra lateral)
3. Clique em **New Query**
4. Copie TUTTO o conteúdo de `ADMIN_SCHEMA.sql`
5. Cole e clique em **RUN** ▶️

✅ **Resultado esperado**: "Success. No rows returned"

---

### 2️⃣ Criar Usuário Admin

1. No Supabase, vá em **Authentication** → **Users**
2. Clique em **Add user** → **Create new user**
3. Preencha:
   - **Email**: `admin@pattydomingues.com`
   - **Password**: `[sua-senha-segura]`
   - ✅ **Auto Confirm User** (marcar!)
4. Clique em **Create user**

---

### 3️⃣ Configurar Emails Autorizados

Edite `/supabase/functions/server/admin-config.tsx`:

```typescript
export const ADMIN_EMAILS = [
  'admin@pattydomingues.com',  // ← Seu email aqui
  'patty@sendadocisne.com',
];
```

---

### 4️⃣ Acessar o Painel Admin

**Localmente (dev):**
```bash
npm run dev
```
Acesse: `http://localhost:5173/admin.html`

**Em produção (após deploy):**
```
https://seu-site.com/admin.html
```

---

### 5️⃣ Fazer Login

1. Use o email e senha criados no passo 2
2. Pronto! Você terá acesso às abas:
   - 📸 **Imagens** - Upload e gerenciamento
   - 🔗 **Links** - Edição de CTAs
   - 📝 **Logs** - Histórico de alterações

---

## 📋 Checklist de Funcionalidades

### ✅ Imagens

- [x] Upload com validação de tamanho e tipo
- [x] Preview antes de salvar
- [x] Ativar/Desativar sem deletar
- [x] Deletar com confirmação
- [x] Versionamento automático
- [x] 4 tipos: Hero, Logo, Section, Favicon

### ✅ Links

- [x] Editar URL e label
- [x] Toggle "abrir em nova aba"
- [x] Ativar/Desativar
- [x] Validação de URL contra XSS
- [x] Sanitização de texto

### ✅ Segurança

- [x] Login com Supabase Auth
- [x] Controle por lista de emails
- [x] Validação de tamanho de arquivo
- [x] Bloqueio de javascript: e data: URLs
- [x] Logs de auditoria com IP e user-agent
- [x] RLS (Row Level Security)

### ✅ Auditoria

- [x] Log de todas as ações
- [x] Quem fez, quando e o quê
- [x] Detalhes em JSON
- [x] 100 últimas ações

---

## 🔧 Troubleshooting

### ❌ "Token de autenticação não fornecido"
**Solução**: Faça login novamente. O token expira após algumas horas.

### ❌ "Acesso negado. Apenas administradores..."
**Solução**: Verifique se seu email está na lista `ADMIN_EMAILS` em `admin-config.tsx`

### ❌ "Erro ao listar imagens"
**Solução**: Verifique se as tabelas foram criadas executando `ADMIN_SCHEMA.sql`

### ❌ "Arquivo muito grande"
**Solução**: Reduza o tamanho da imagem:
- Hero: máx 5MB
- Logo: máx 1MB
- Section: máx 3MB
- Favicon: máx 100KB

---

## 📞 Consumir Configurações no Frontend

Em qualquer componente React:

```tsx
import { useEffect, useState } from 'react';
import { projectId } from '../../utils/supabase/info';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-a977770f`;

function MeuComponente() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    // Buscar configurações públicas
    fetch(`${API_URL}/public/config`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setConfig(data.config);
        }
      });
  }, []);

  // Usar imagens dinâmicas
  const heroImage = config?.images?.hero_main || 'fallback.jpg';
  const logoUrl = config?.images?.logo_header || 'logo.png';

  // Usar links dinâmicos
  const ctaUrl = config?.links?.cta_hero?.url || '#';
  const ctaLabel = config?.links?.cta_hero?.label || 'Clique aqui';
  const openInNewTab = config?.links?.cta_hero?.openInNewTab;

  return (
    <div>
      <img src={heroImage} alt="Hero" />
      <a 
        href={ctaUrl}
        target={openInNewTab ? '_blank' : '_self'}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
      >
        {ctaLabel}
      </a>
    </div>
  );
}
```

---

## 🎨 Customizar Validações

Edite `/supabase/functions/server/admin-config.tsx`:

```typescript
export const IMAGE_VALIDATION = {
  hero: {
    maxSize: 10 * 1024 * 1024, // 10MB
    minWidth: 1920,
    minHeight: 1080,
    acceptedFormats: ['image/jpeg', 'image/png', 'image/webp'],
  },
  // ... outros tipos
};
```

---

## 📚 Documentação Completa

Para mais detalhes, veja:
- `ADMIN_MODULE_SETUP.md` - Documentação completa
- `ADMIN_SCHEMA.sql` - Schema do banco de dados
- `/supabase/functions/server/admin-config.tsx` - Configurações
- `/supabase/functions/server/index.tsx` - API endpoints

---

**🎉 Pronto! Seu painel admin está funcionando!**
