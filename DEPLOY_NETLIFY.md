# 🚀 Deploy no Netlify - Guia Completo

## ✅ Build Local (Teste antes de fazer deploy)

```bash
npm run build
```

Se o build passar sem erros, está pronto para deploy! ✨

---

## 🔧 Configurar Variáveis de Ambiente no Netlify

### 1. Acesse seu site no Netlify
`https://app.netlify.com/sites/[seu-site]/settings/env`

### 2. Adicione as variáveis:

Clique em **"Add a variable"** e adicione:

**Variável 1:**
```
Key: VITE_SUPABASE_PROJECT_ID
Value: seu-project-id
```
> 📍 Encontre em: Supabase → Settings → General → Reference ID

**Variável 2:**
```
Key: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
> 📍 Encontre em: Supabase → Settings → API → Project API keys → `anon` `public`

### 3. Clique em **"Save"**

### 4. Faça um novo deploy:
- Option A: Faça um novo commit/push
- Option B: Netlify → Deploys → Trigger deploy → Deploy site

---

## 🎯 Checklist Completo

### ✅ Antes do Deploy:
- [ ] Executei `npm run build` localmente sem erros
- [ ] Código está commitado no Git
- [ ] Repositório está conectado ao Netlify

### ✅ No Netlify:
- [ ] Adicionei `VITE_SUPABASE_PROJECT_ID`
- [ ] Adicionei `VITE_SUPABASE_ANON_KEY`
- [ ] Build settings: 
  - Build command: `npm run build`
  - Publish directory: `dist`

### ✅ No Supabase:
- [ ] Executei o SQL schema (`ADMIN_SCHEMA.sql`)
- [ ] Criei usuário admin em Authentication
- [ ] Adicionei email em `admin-config.tsx`
- [ ] Fiz deploy das Edge Functions (veja abaixo)

---

## 🔥 Deploy das Edge Functions (Supabase)

### 1. Instale o Supabase CLI

```bash
npm install -g supabase
```

### 2. Login no Supabase

```bash
supabase login
```

### 3. Link com seu projeto

```bash
supabase link --project-ref seu-project-id
```

> Encontre o `project-ref` na URL do Supabase: `https://app.supabase.com/project/[project-ref]`

### 4. Deploy das functions

```bash
supabase functions deploy make-server-a977770f
```

✅ **Pronto!** Sua API estará disponível em:
```
https://[seu-project-id].supabase.co/functions/v1/make-server-a977770f
```

---

## 🧪 Testar Após Deploy

### 1. Testar a Landing Page
```
https://seu-site.netlify.app/
```
✅ Deve carregar a página "Senda do Cisne"

### 2. Testar o Admin Panel
```
https://seu-site.netlify.app/admin.html
```
✅ Deve carregar a tela de login

### 3. Fazer Login no Admin
- Use o email/senha que criou no Supabase Authentication
- ✅ Deve entrar no dashboard

### 4. Testar Upload
- Tente fazer upload de uma imagem
- ✅ Deve aparecer "Imagem enviada com sucesso!"

---

## ❌ Problemas Comuns

### Build falhando no Netlify

**Erro**: `Could not resolve "../../utils/supabase/info"`
**Solução**: 
- ✅ Arquivo já criado: `/src/utils/supabase/info.ts`
- ✅ Variáveis de ambiente configuradas

**Erro**: `figma:asset cannot be resolved`
**Solução**: 
- ✅ Já corrigido! Usamos URLs do Unsplash

---

### Admin Panel não funciona

**Sintoma**: Login não funciona ou "Erro ao listar imagens"

**Checklist**:
1. ✅ Variáveis de ambiente estão corretas no Netlify?
2. ✅ Edge Functions foram deployadas no Supabase?
3. ✅ SQL Schema foi executado?
4. ✅ Usuário foi criado em Authentication?
5. ✅ Email está autorizado em `admin-config.tsx`?

---

### CORS Error

**Sintoma**: Erro de CORS no console do navegador

**Solução**: Adicione sua URL do Netlify no Supabase:
1. Supabase → Authentication → URL Configuration
2. Adicione em **Site URL**: `https://seu-site.netlify.app`
3. Adicione em **Redirect URLs**: `https://seu-site.netlify.app/admin.html`

---

## 🎉 Deploy Completo!

Quando tudo estiver funcionando:

✅ Landing page no ar  
✅ Admin panel acessível  
✅ Login funcionando  
✅ Upload de imagens OK  
✅ Edição de links OK  

**Próximos passos:**
1. Faça upload da foto real da Patty
2. Configure os links dos CTAs
3. Ajuste textos e preços
4. Compartilhe com o mundo! 🚀

---

## 📞 Comandos Úteis

```bash
# Build local
npm run build

# Deploy functions (Supabase)
supabase functions deploy make-server-a977770f

# Ver logs das functions
supabase functions logs make-server-a977770f

# Trigger novo deploy no Netlify (via CLI)
netlify deploy --prod
```

---

**Tempo estimado**: 10-15 minutos  
**Dificuldade**: ⭐⭐ (Fácil com este guia)

Bom deploy! 🎊
