# ⚡ Deploy Rápido - 2 Minutos

## 🎯 Para Deploy no Netlify AGORA

### Opção 1: Integração Automática (RECOMENDADO)

**1 único passo:**

1. Acesse: https://app.netlify.com/extensions/supabase
2. Clique "Add integration"
3. Selecione seu site
4. Login no Supabase
5. Escolha o projeto
6. Pronto! ✅

**Tempo**: 2 minutos  
**Erros**: Zero  
**Resultado**: Deploy automático com variáveis configuradas

📖 [Ver guia completo](./NETLIFY_SUPABASE_INTEGRATION.md)

---

### Opção 2: Manual (3 minutos)

1. **Configurar variáveis no Netlify**:
   ```
   Site settings → Environment variables → Add variable
   
   VITE_SUPABASE_PROJECT_ID = seu-project-id
   VITE_SUPABASE_ANON_KEY = sua-anon-key
   ```

2. **Fazer commit/push**:
   ```bash
   git add .
   git commit -m "Configure Supabase"
   git push origin main
   ```

3. **Aguardar build** ✅

📖 [Ver guia manual](./DEPLOY_NETLIFY.md)

---

## 🔍 Onde Encontrar as Variáveis

**VITE_SUPABASE_PROJECT_ID**:
- URL do Supabase: `https://app.supabase.com/project/[ESTE-É-O-ID]`
- Ou: Settings → General → Reference ID

**VITE_SUPABASE_ANON_KEY**:
- Settings → API → Project API keys
- Copie a chave `anon` `public` (começa com `eyJhbG...`)

---

## ✅ Checklist Mínimo

Antes de fazer deploy:

- [ ] Código está no Git
- [ ] Conectado ao Netlify
- [ ] Build local passou (`npm run build`)

Depois de configurar integração/variáveis:

- [ ] Build passou no Netlify
- [ ] Site carrega (`https://seu-site.netlify.app`)
- [ ] Admin carrega (`https://seu-site.netlify.app/admin.html`)

---

## 🎯 Próximos Passos (Depois do Deploy)

1. **Configure o banco** - Execute `ADMIN_SCHEMA.sql` no Supabase
2. **Crie usuário admin** - Supabase → Authentication → Add user
3. **Deploy Edge Functions**:
   ```bash
   supabase login
   supabase link --project-ref seu-project-id
   supabase functions deploy make-server-a977770f
   ```

📖 [Ver guia completo de setup](./DEPLOY_NETLIFY.md)

---

## ❌ Se Der Erro

### Build falhou

**Erro**: `Could not resolve "../../utils/supabase/info"`
- ✅ Já resolvido! Arquivo criado automaticamente

**Erro**: `supabaseKey is required`
- ❌ Variáveis não configuradas
- ✅ Use a integração automática OU configure manualmente

### Admin não funciona

1. Variáveis configuradas? ✅
2. Build passou? ✅
3. SQL schema executado? ❓
4. Edge Functions deployadas? ❓

---

## 🚀 TL;DR - Ultra Rápido

```bash
# 1. Instale a extensão
# https://app.netlify.com/extensions/supabase

# 2. Faça commit
git add .
git commit -m "Deploy"
git push

# Pronto! ✅
```

---

**Prefere guias detalhados?**

- [START_HERE.md](./START_HERE.md) - Começar do zero
- [NETLIFY_SUPABASE_INTEGRATION.md](./NETLIFY_SUPABASE_INTEGRATION.md) - Integração passo a passo
- [DEPLOY_NETLIFY.md](./DEPLOY_NETLIFY.md) - Deploy completo
- [DOCS_INDEX.md](./DOCS_INDEX.md) - Índice de toda documentação

---

⏰ **Tempo total**: 2-3 minutos  
🎯 **Sucesso garantido**: 99% com integração automática
