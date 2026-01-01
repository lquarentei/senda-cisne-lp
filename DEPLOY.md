# 🚀 Deploy - Guia Simples

Como colocar sua landing page no ar.

---

## 🎯 Opções de Deploy

1. **Netlify** ⭐ (Recomendado - Mais fácil)
2. **Vercel** (Alternativa excelente)
3. **Outros** (Qualquer host de site estático)

---

## 🟢 Opção 1: Netlify (Recomendado)

### Via Interface Web (Mais Fácil)

1. **Criar conta gratuita**
   - Acesse: https://netlify.com
   - Cadastre-se com GitHub

2. **Conectar repositório**
   - New site → Import an existing project
   - Escolha seu repositório GitHub

3. **Configurar build**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Deploy site!

4. **Pronto!** 🎉
   - Seu site estará no ar em minutos
   - URL: `https://seu-site.netlify.app`

### Via CLI (Avançado)

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

---

## 🔵 Opção 2: Vercel

### Via Interface Web

1. **Criar conta**
   - Acesse: https://vercel.com
   - Login com GitHub

2. **Importar projeto**
   - New Project
   - Import Git Repository

3. **Deploy automático**
   - Vercel detecta Vite automaticamente
   - Sem configuração necessária!

4. **Pronto!**
   - URL: `https://seu-site.vercel.app`

### Via CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel
```

---

## ⚪ Opção 3: Outros Hosts

Qualquer serviço que hospede sites estáticos funciona:

### GitHub Pages

```bash
npm run build
# Fazer upload da pasta /dist
```

### Hostinger, Locaweb, etc.

1. Fazer build: `npm run build`
2. Fazer upload da pasta `/dist` via FTP
3. Pronto!

---

## ⚙️ Configuração (Todos os Hosts)

### Build Settings

```
Build Command: npm run build
Output Directory: dist
Node Version: 18 ou superior
```

### Variáveis de Ambiente

**Não é necessário nenhuma variável!** ✅

Esta landing page não precisa de:
- ❌ Banco de dados
- ❌ API keys
- ❌ Secrets
- ❌ Configurações extras

---

## 🌐 Domínio Customizado

Depois do deploy, você pode adicionar seu próprio domínio.

### Netlify

1. Site settings → Domain management
2. Add custom domain
3. Seguir instruções DNS

### Vercel

1. Project → Settings → Domains
2. Add domain
3. Configurar DNS

---

## 📊 Monitoramento

### Netlify

- **Analytics**: Gratuito no plano básico
- **Forms**: Formulários sem backend
- **Functions**: Opcional (não necessário aqui)

### Vercel

- **Analytics**: Gratuito
- **Speed Insights**: Métricas de performance
- **Logs**: Acesso aos logs de deploy

---

## 🔄 Deploy Automático

Ambos Netlify e Vercel fazem **deploy automático** quando você:

1. Faz `git push` no GitHub
2. Merge de pull request
3. Atualiza a branch principal

**Ou seja:** Edite → Commit → Push → Site atualizado! 🎉

---

## ✅ Checklist Pré-Deploy

Antes de fazer deploy pela primeira vez:

- [ ] Testado localmente (`npm run dev`)
- [ ] Build sem erros (`npm run build`)
- [ ] Links dos botões configurados
- [ ] Número do WhatsApp correto
- [ ] Preços atualizados
- [ ] Imagens otimizadas (se adicionou)
- [ ] Código commitado no Git

---

## 🐛 Troubleshooting

### Build falha

**Problema:** Build command falhou

**Solução:**
```bash
# Testar localmente primeiro
npm install
npm run build

# Se funcionar local, problema é no host
# Verifique versão do Node (18+)
```

### Site em branco após deploy

**Problema:** Página não carrega

**Solução:**
- Verifique se a pasta de output é `dist`
- Verifique se `index.html` está em `/dist`
- Limpe cache e faça redeploy

### Imagens não aparecem

**Problema:** Fotos não carregam

**Solução:**
- Imagens devem estar em `/public/images/`
- Caminhos devem começar com `/images/`
- Commit das imagens no Git

---

## 📈 Performance

Sua landing page já está otimizada, mas você pode:

### Comprimir Imagens

Use antes de fazer upload:
- [TinyPNG](https://tinypng.com/)
- [Squoosh](https://squoosh.app/)

### Lazy Loading

Já implementado automaticamente! ✅

### Lighthouse Score

Teste seu site:
1. Abra DevTools (F12)
2. Lighthouse tab
3. Generate report

Meta: 90+ em todas as categorias! 🎯

---

## 💰 Custos

| Host | Plano Gratuito | Suficiente? |
|------|----------------|-------------|
| **Netlify** | 100GB/mês | ✅ Sim |
| **Vercel** | 100GB/mês | ✅ Sim |
| **GitHub Pages** | Ilimitado | ✅ Sim |

Para uma landing page, o plano gratuito é **mais que suficiente**.

---

## 🎯 Recomendação Final

**Use Netlify** se você:
- ✅ Quer a opção mais simples
- ✅ Precisa de suporte brasileiro
- ✅ Pode usar formulários no futuro

**Use Vercel** se você:
- ✅ Já usa Next.js em outros projetos
- ✅ Quer analytics detalhado
- ✅ Prefere a interface deles

**Ambos são excelentes!** Não tem erro. 😊

---

## 🆘 Precisa de Ajuda?

**Netlify:** https://docs.netlify.com/  
**Vercel:** https://vercel.com/docs

**Ou pergunte no grupo/suporte da Patty!**

---

**Boa sorte com seu lançamento!** 🚀✨
