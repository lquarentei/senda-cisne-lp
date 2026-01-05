# ⚡ TESTE RÁPIDO - 3 Comandos

## 🚀 Setup Ultra Rápido

### 1️⃣ Configure o Supabase (Web)

Abra: https://app.supabase.com → Seu Projeto

**a) Criar Tabelas:**
- SQL Editor → New Query → Cole `ADMIN_SCHEMA.sql` → RUN

**b) Criar Admin:**
- Authentication → Users → Add user
- Email: `seu@email.com` + Senha
- ✅ Marque "Auto Confirm User"

**c) Autorizar Email:**
Edite `/supabase/functions/server/admin-config.tsx` linha 22:
```typescript
export const ADMIN_EMAILS = ['seu@email.com'];
```

---

### 2️⃣ Instale e Rode (Terminal)

```bash
npm install
npm run dev
```

---

### 3️⃣ Acesse e Teste (Navegador)

```
http://localhost:5173/admin.html
```

Login → Upload Imagem → Editar Link → ✅ Pronto!

---

## 🎯 O que você vai ver:

1. **Tela de Login** 
   - Email + Senha
   - Botão "Entrar"

2. **Dashboard com 3 Abas:**
   - 📸 **Imagens**: Upload, ativar/desativar, deletar
   - 🔗 **Links**: Editar URLs e labels
   - 📝 **Logs**: Histórico de todas as ações

---

## ✅ Teste Rápido de Funcionalidade

**Upload de Imagem:**
1. Aba Imagens
2. Tipo: Hero
3. Identificador: `teste_hero`
4. Selecione imagem
5. Enviar → ✅ "Imagem enviada com sucesso!"

**Editar Link:**
1. Aba Links
2. Clique "Editar" em qualquer link
3. Mude URL para `https://google.com`
4. Salvar → ✅ "Link atualizado com sucesso!"

**Ver Logs:**
1. Aba Logs
2. ✅ Veja suas ações listadas com data/hora

---

## ❌ Deu Erro?

**"Acesso negado":**
- Verifique se seu email está em `ADMIN_EMAILS`

**"Erro ao listar imagens":**
- Execute `ADMIN_SCHEMA.sql` no Supabase

**Tela branca:**
- Acesse com `/admin.html` no final da URL

---

## 📱 URLs Importantes

- **Admin Local**: http://localhost:5173/admin.html
- **Site Local**: http://localhost:5173/
- **Supabase**: https://app.supabase.com

---

**Tempo total: ~5 minutos** ⏱️
