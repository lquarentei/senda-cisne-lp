# 🧪 Como Testar o Admin Module AGORA

## 🎯 Passo a Passo Completo (15 minutos)

---

## ⚙️ PARTE 1: Configurar o Supabase (5 min)

### 1.1 - Criar as Tabelas no Banco de Dados

1. Acesse seu projeto no Supabase: https://app.supabase.com
2. Clique em **SQL Editor** (ícone `</>` no menu lateral esquerdo)
3. Clique em **+ New Query** (botão verde no topo)
4. Abra o arquivo `ADMIN_SCHEMA.sql` deste projeto
5. **Copie TUDO** (Ctrl+A → Ctrl+C)
6. **Cole** no SQL Editor do Supabase
7. Clique em **RUN** (ou F5)
8. ✅ Deve aparecer: **"Success. No rows returned"**

---

### 1.2 - Criar seu Usuário Admin

1. No Supabase, clique em **Authentication** (ícone de cadeado 🔒)
2. Clique em **Users**
3. Clique no botão verde **Add user** → **Create new user**
4. Preencha:
   ```
   Email: seu-email@gmail.com
   Password: MinhaS3nhaF0rt3!
   ```
5. **IMPORTANTE**: ✅ Marque a opção **"Auto Confirm User"**
6. Clique em **Create user**
7. ✅ Anote o email e senha que você criou!

---

### 1.3 - Adicionar seu Email na Lista de Admins

1. Abra o arquivo `/supabase/functions/server/admin-config.tsx`
2. Na linha 22, troque para SEU email:

```typescript
export const ADMIN_EMAILS = [
  'seu-email@gmail.com',  // ← COLOQUE SEU EMAIL AQUI
  'patty@sendadocisne.com',
];
```

3. **Salve** o arquivo (Ctrl+S)

---

## 🖥️ PARTE 2: Rodar Localmente (2 min)

### 2.1 - Instalar Dependências (se não fez ainda)

Abra o terminal na pasta do projeto e rode:

```bash
npm install
```

ou

```bash
pnpm install
```

⏳ Aguarde terminar...

---

### 2.2 - Iniciar o Servidor de Desenvolvimento

No terminal, rode:

```bash
npm run dev
```

✅ Deve aparecer algo como:

```
  VITE v6.3.5  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

---

## 🎨 PARTE 3: Testar o Painel Admin (5 min)

### 3.1 - Acessar a Página de Login

1. Abra seu navegador
2. Digite na URL: 
   ```
   http://localhost:5173/admin.html
   ```

3. ✅ Deve aparecer a **tela de login** com:
   - Logo do escudo 🛡️
   - Título "Admin Panel"
   - Campos de Email e Senha

---

### 3.2 - Fazer Login

1. Digite o **email** que você criou no Supabase
2. Digite a **senha** que você criou
3. Clique em **Entrar**

✅ **Se tudo deu certo**, você verá o painel com 3 abas:
- 📸 **Imagens**
- 🔗 **Links**  
- 📝 **Logs**

---

### 3.3 - Testar Upload de Imagem

1. Clique na aba **Imagens**
2. No formulário "Upload de Nova Imagem":
   - **Tipo**: Deixe "Hero / Banner Principal"
   - **Identificador**: Digite `hero_teste`
   - **Arquivo**: Clique e selecione uma imagem do seu PC
3. Veja o **preview** aparecer do lado direito
4. Clique em **Enviar Imagem**

✅ **Sucesso!** Deve aparecer:
- Notificação verde: "Imagem enviada com sucesso!"
- Imagem aparece na lista abaixo

---

### 3.4 - Testar Gerenciamento de Links

1. Clique na aba **Links**
2. Você verá os 5 links padrão já criados
3. Clique em **Editar** em qualquer link
4. Mude a **URL** para: `https://google.com`
5. Mude o **Texto** para: `Teste Google`
6. Clique em **Salvar**

✅ **Sucesso!** Deve aparecer:
- Notificação verde: "Link atualizado com sucesso!"

---

### 3.5 - Ver Logs de Auditoria

1. Clique na aba **Logs**
2. Você verá todas as ações que fez:
   - "Upload de Imagem"
   - "Atualizar Link"
   - Data/hora de cada ação

---

## 🐛 Problemas Comuns

### ❌ "Token de autenticação não fornecido"

**Causa**: Você não está logado  
**Solução**: Volte para `http://localhost:5173/admin.html` e faça login

---

### ❌ "Acesso negado. Apenas administradores..."

**Causa**: Seu email não está na lista `ADMIN_EMAILS`  
**Solução**:
1. Abra `/supabase/functions/server/admin-config.tsx`
2. Adicione seu email na linha 22
3. Salve o arquivo
4. Faça login novamente

---

### ❌ "Erro ao listar imagens" ou "Erro ao listar links"

**Causa**: As tabelas não foram criadas no banco  
**Solução**:
1. Vá no Supabase → SQL Editor
2. Execute o arquivo `ADMIN_SCHEMA.sql` completo
3. Recarregue a página do admin

---

### ❌ Página em branco ou erro 404

**Causa**: Servidor não está rodando ou URL errada  
**Solução**:
1. Certifique-se que `npm run dev` está rodando
2. Use exatamente: `http://localhost:5173/admin.html` (com `/admin.html` no final)

---

### ❌ "Arquivo muito grande"

**Causa**: Imagem excede o limite do tipo  
**Solução**: Use uma imagem menor:
- Hero: máximo 5MB
- Logo: máximo 1MB
- Section: máximo 3MB
- Favicon: máximo 100KB

---

## ✅ Checklist de Teste

Marque conforme for testando:

- [ ] Executei o `ADMIN_SCHEMA.sql` no Supabase
- [ ] Criei usuário admin no Supabase Authentication
- [ ] Adicionei meu email em `admin-config.tsx`
- [ ] Rodei `npm install`
- [ ] Rodei `npm run dev`
- [ ] Acessei `http://localhost:5173/admin.html`
- [ ] Consegui fazer login
- [ ] Vi as 3 abas (Imagens, Links, Logs)
- [ ] Fiz upload de uma imagem
- [ ] Editei um link
- [ ] Vi os logs de auditoria

---

## 🎥 Fluxo Completo Resumido

```
1. Supabase → SQL Editor → Executar ADMIN_SCHEMA.sql
2. Supabase → Authentication → Criar usuário admin
3. Código → admin-config.tsx → Adicionar seu email
4. Terminal → npm install
5. Terminal → npm run dev
6. Navegador → http://localhost:5173/admin.html
7. Login com email/senha
8. Testar upload e edição
9. ✅ FUNCIONANDO!
```

---

## 📞 Precisa de Ajuda?

Se algo não funcionar:

1. **Copie a mensagem de erro** que aparece
2. **Print da tela** onde deu erro
3. **Me envie** para eu te ajudar

---

## 🎉 Está Funcionando?

Parabéns! 🎊 Agora você tem:

✅ Painel admin completo  
✅ Upload de imagens  
✅ Gerenciamento de links  
✅ Logs de auditoria  
✅ Sistema seguro e profissional  

**Próximo passo**: Fazer deploy no Netlify/Vercel!

---

**⏰ Tempo total**: ~15 minutos  
**Dificuldade**: ⭐⭐ (Fácil com este guia!)
