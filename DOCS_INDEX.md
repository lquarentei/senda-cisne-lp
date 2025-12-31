# 📚 Índice de Documentação

Todos os guias e documentação do projeto Senda do Cisne organizados por objetivo.

---

## 🚀 Começando

| Documento | Para quê? | Tempo | Dificuldade |
|-----------|-----------|-------|-------------|
| **[START_HERE.md](./START_HERE.md)** | Seu primeiro passo! Setup inicial em 3 comandos | 5 min | ⭐ |
| **[README.md](./README.md)** | Visão geral completa do projeto | 10 min leitura | ⭐ |
| **[TESTE_RAPIDO.md](./TESTE_RAPIDO.md)** | Testar localmente ultra rápido | 5 min | ⭐ |

---

## 🧪 Testando Localmente

| Documento | Para quê? | Tempo | Dificuldade |
|-----------|-----------|-------|-------------|
| **[COMO_TESTAR_AGORA.md](./COMO_TESTAR_AGORA.md)** | Guia passo a passo completo com troubleshooting | 15 min | ⭐⭐ |
| **[ADMIN_QUICK_START.md](./ADMIN_QUICK_START.md)** | Setup rápido apenas do Admin Panel | 10 min | ⭐⭐ |

---

## 🌐 Deploy & Produção

| Documento | Para quê? | Tempo | Dificuldade |
|-----------|-----------|-------|-------------|
| **[DEPLOY_NETLIFY.md](./DEPLOY_NETLIFY.md)** | Deploy completo no Netlify + Supabase | 15 min | ⭐⭐ |
| **[NETLIFY_ENV_VARS.md](./NETLIFY_ENV_VARS.md)** | Configurar variáveis de ambiente no Netlify | 3 min | ⭐ |

---

## 🔧 Documentação Técnica

| Documento | Para quê? | Tempo | Dificuldade |
|-----------|-----------|-------|-------------|
| **[ADMIN_MODULE_SETUP.md](./ADMIN_MODULE_SETUP.md)** | Documentação técnica completa do módulo admin | 30 min leitura | ⭐⭐⭐ |
| **[ADMIN_SCHEMA.sql](./ADMIN_SCHEMA.sql)** | Schema SQL do banco de dados | N/A | ⭐⭐⭐ |

---

## 📖 Por Categoria

### ⚡ Quero Começar AGORA
1. [START_HERE.md](./START_HERE.md)
2. [TESTE_RAPIDO.md](./TESTE_RAPIDO.md)

### 🏠 Desenvolvimento Local
1. [COMO_TESTAR_AGORA.md](./COMO_TESTAR_AGORA.md)
2. [ADMIN_QUICK_START.md](./ADMIN_QUICK_START.md)

### 🚀 Colocar no Ar
1. [DEPLOY_NETLIFY.md](./DEPLOY_NETLIFY.md)
2. [NETLIFY_ENV_VARS.md](./NETLIFY_ENV_VARS.md)

### 🤓 Entender a Fundo
1. [README.md](./README.md)
2. [ADMIN_MODULE_SETUP.md](./ADMIN_MODULE_SETUP.md)

---

## 🎯 Fluxo Recomendado

### Para Iniciantes:
```
1. START_HERE.md
   ↓
2. TESTE_RAPIDO.md
   ↓
3. COMO_TESTAR_AGORA.md
   ↓
4. DEPLOY_NETLIFY.md
```

### Para Desenvolvedores:
```
1. README.md
   ↓
2. ADMIN_MODULE_SETUP.md
   ↓
3. DEPLOY_NETLIFY.md
```

### Para Deploy Urgente:
```
1. NETLIFY_ENV_VARS.md
   ↓
2. DEPLOY_NETLIFY.md
```

---

## 🔍 Encontrar Rapidamente

### Preciso saber como...

**...configurar variáveis de ambiente?**
→ [NETLIFY_ENV_VARS.md](./NETLIFY_ENV_VARS.md)

**...testar o admin localmente?**
→ [COMO_TESTAR_AGORA.md](./COMO_TESTAR_AGORA.md)

**...fazer deploy no Netlify?**
→ [DEPLOY_NETLIFY.md](./DEPLOY_NETLIFY.md)

**...entender a arquitetura?**
→ [ADMIN_MODULE_SETUP.md](./ADMIN_MODULE_SETUP.md)

**...começar do zero?**
→ [START_HERE.md](./START_HERE.md)

**...fazer upload de imagens?**
→ [ADMIN_QUICK_START.md](./ADMIN_QUICK_START.md) (seção "Como Usar")

**...criar tabelas no banco?**
→ [ADMIN_SCHEMA.sql](./ADMIN_SCHEMA.sql) + [COMO_TESTAR_AGORA.md](./COMO_TESTAR_AGORA.md) (seção "Configurar o Supabase")

**...autorizar novos admins?**
→ [ADMIN_QUICK_START.md](./ADMIN_QUICK_START.md) (seção "Autorização")

**...ver logs de auditoria?**
→ [ADMIN_MODULE_SETUP.md](./ADMIN_MODULE_SETUP.md) (seção "Logs de Auditoria")

---

## 📊 Estrutura do Projeto

```
/
├── 📄 Documentação
│   ├── START_HERE.md              ⭐ COMECE AQUI
│   ├── README.md                  Visão geral
│   ├── TESTE_RAPIDO.md            Setup rápido
│   ├── COMO_TESTAR_AGORA.md       Guia completo de testes
│   ├── DEPLOY_NETLIFY.md          Deploy em produção
│   ├── NETLIFY_ENV_VARS.md        Config de ambiente
│   ├── ADMIN_QUICK_START.md       Início rápido admin
│   ├── ADMIN_MODULE_SETUP.md      Docs técnicas
│   └── ADMIN_SCHEMA.sql           Schema do banco
│
├── 🎨 Frontend
│   └── src/app/components/
│       ├── SendaDoCisneLP.tsx     Landing page
│       ├── AdminPanel.tsx         Painel admin
│       └── ui/                    Componentes base
│
├── ⚙️ Backend
│   └── supabase/functions/server/
│       ├── index.ts               API endpoints
│       ├── admin-config.tsx       Configurações
│       └── types.ts               TypeScript types
│
└── 🌐 Deploy
    ├── netlify.toml               Config Netlify
    ├── .env.example               Exemplo de .env
    └── package.json               Dependencies
```

---

## ✅ Checklist de Setup Completo

### Local (Desenvolvimento)
- [ ] Li [START_HERE.md](./START_HERE.md)
- [ ] Instalei dependências (`npm install`)
- [ ] Criei `.env.local` com variáveis corretas
- [ ] Executei SQL schema no Supabase
- [ ] Criei usuário admin
- [ ] Autorizei email em `admin-config.tsx`
- [ ] Rodei `npm run dev`
- [ ] Testei landing page (`/`)
- [ ] Testei admin panel (`/admin.html`)
- [ ] Fiz upload de teste
- [ ] Vi logs de auditoria

### Produção (Deploy)
- [ ] Li [DEPLOY_NETLIFY.md](./DEPLOY_NETLIFY.md)
- [ ] Configurei variáveis no Netlify
- [ ] Fiz deploy das Edge Functions
- [ ] Build passou sem erros
- [ ] Site está no ar
- [ ] Admin funciona em produção
- [ ] Upload funciona
- [ ] Links podem ser editados

---

## 🆘 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| Build falha | Ver [DEPLOY_NETLIFY.md](./DEPLOY_NETLIFY.md) seção "Problemas Comuns" |
| Admin não conecta | Ver [COMO_TESTAR_AGORA.md](./COMO_TESTAR_AGORA.md) seção "Problemas Comuns" |
| Upload falha | Ver [ADMIN_QUICK_START.md](./ADMIN_QUICK_START.md) seção "Validações" |
| Login não funciona | Ver [ADMIN_MODULE_SETUP.md](./ADMIN_MODULE_SETUP.md) seção "Autenticação" |
| Variáveis não carregam | Ver [NETLIFY_ENV_VARS.md](./NETLIFY_ENV_VARS.md) seção "Troubleshooting" |

---

## 📞 Ajuda Adicional

Se nenhum guia resolveu seu problema:

1. **Verifique o console** do navegador (F12)
2. **Veja os logs** do Netlify deploy
3. **Confira logs** das Edge Functions no Supabase
4. **Revise o checklist** de setup completo acima

---

**Última atualização**: Dezembro 2025  
**Versão da documentação**: 1.0
