# 🎯 COMECE AQUI!

## ⚡ 3 Passos para Rodar o Projeto

### 1️⃣ Instalar Dependências
```bash
npm install
```

### 2️⃣ Criar Arquivo `.env.local`
Crie na raiz do projeto com:
```env
VITE_SUPABASE_PROJECT_ID=seu-project-id
VITE_SUPABASE_ANON_KEY=seu-anon-key
```

**Onde encontrar esses valores?**
- Acesse: https://app.supabase.com/project/[seu-projeto]/settings/api
- **Project ID**: Na URL ou em "Project Settings → General → Reference ID"
- **Anon Key**: Em "Project API keys" → copie a chave `anon` `public`

### 3️⃣ Rodar Servidor de Desenvolvimento
```bash
npm run dev
```

Pronto! ✨
- Landing Page: http://localhost:5173/
- Admin Panel: http://localhost:5173/admin.html

---

## 📚 Próximos Passos

### Para usar o Admin Panel:

1. **Configure o Banco de Dados**
   - Vá em: https://app.supabase.com/project/[seu-projeto]/sql/new
   - Copie todo o conteúdo de `ADMIN_SCHEMA.sql`
   - Cole e execute (RUN)

2. **Crie um Usuário Admin**
   - Vá em: https://app.supabase.com/project/[seu-projeto]/auth/users
   - Clique "Add user" → "Create new user"
   - ✅ Marque "Auto Confirm User"
   - Anote email e senha

3. **Autorize o Email**
   - Abra: `/supabase/functions/server/admin-config.tsx`
   - Adicione seu email no array `ADMIN_EMAILS`

4. **Acesse o Admin**
   - http://localhost:5173/admin.html
   - Faça login com email/senha criados

---

## 🚀 Para Fazer Deploy

**⚡ RECOMENDADO**: Use a integração automática Netlify + Supabase!

👉 **[NETLIFY_SUPABASE_INTEGRATION.md](./NETLIFY_SUPABASE_INTEGRATION.md)** - 2 minutos, zero erros

**Link direto**: https://app.netlify.com/extensions/supabase

---

**Alternativa**: Configuração manual completa em **[DEPLOY_NETLIFY.md](./DEPLOY_NETLIFY.md)**

---

## 📖 Documentação Completa

| O que você precisa | Onde está |
|-------------------|-----------|
| Testar localmente | [COMO_TESTAR_AGORA.md](./COMO_TESTAR_AGORA.md) |
| Deploy no Netlify | [DEPLOY_NETLIFY.md](./DEPLOY_NETLIFY.md) |
| Setup rápido | [TESTE_RAPIDO.md](./TESTE_RAPIDO.md) |
| Docs técnicas | [ADMIN_MODULE_SETUP.md](./ADMIN_MODULE_SETUP.md) |
| Visão geral | [README.md](./README.md) |

---

## ❌ Problemas?

### "Module not found"
```bash
rm -rf node_modules
npm install
```

### "Cannot connect to Supabase"
- Verifique se `.env.local` está criado
- Verifique se os valores estão corretos

### Admin não funciona
1. ✅ SQL Schema executado?
2. ✅ Usuário criado no Supabase Auth?
3. ✅ Email autorizado em `admin-config.tsx`?

---

## 🎉 Está Funcionando?

Parabéns! Agora você pode:
- ✅ Editar a landing page
- ✅ Gerenciar imagens pelo admin
- ✅ Configurar links dos CTAs
- ✅ Ver logs de auditoria

**Próximo passo**: Faça deploy! 🚀

---

⏰ **Tempo estimado**: 5 minutos  
🔧 **Dificuldade**: ⭐ (Muito Fácil)