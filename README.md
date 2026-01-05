# 🦢 Senda do Cisne - Landing Page + Admin Panel

Landing page premium para o programa de mentoria "Senda do Cisne" da Patty Domingues, com painel administrativo completo para gerenciamento de conteúdo.

---

## 🚀 Quick Start

### 1. Instalação

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_SUPABASE_PROJECT_ID=seu-project-id
VITE_SUPABASE_ANON_KEY=seu-anon-key
```

> 📝 Use o `.env.example` como referência

### 3. Rodar Localmente

```bash
npm run dev
```

- **Landing Page**: http://localhost:5173/
- **Admin Panel**: http://localhost:5173/admin.html

---

## 📦 O que está incluído?

### ✨ Landing Page (`/src/app/components/SendaDoCisneLP.tsx`)
- Design elegante e premium (branco, bege, rose gold)
- Copy emocional focado em conversão
- Seções: Hero, Identificação, Sobre Patty, Pilares, Diferencial, Comunidade, Investimento
- Totalmente responsiva
- Animações suaves com Motion (Framer Motion)

### 🔐 Admin Panel (`/src/app/components/AdminPanel.tsx`)
- Upload e gerenciamento de imagens
- Edição de links e CTAs
- Logs de auditoria completos
- Sistema de autenticação seguro
- Interface moderna e intuitiva

### ⚙️ Backend (Supabase Edge Functions)
- 13 endpoints REST
- Autenticação via JWT
- Row Level Security (RLS)
- Validações automáticas
- Versionamento de imagens

---

## 📚 Documentação Completa

| Documento | Descrição |
|-----------|-----------|
| **[COMO_TESTAR_AGORA.md](./COMO_TESTAR_AGORA.md)** | Guia passo a passo para testar localmente |
| **[TESTE_RAPIDO.md](./TESTE_RAPIDO.md)** | 3 comandos para setup ultra rápido |
| **[DEPLOY_NETLIFY.md](./DEPLOY_NETLIFY.md)** | Instruções de deploy completo |
| **[ADMIN_MODULE_SETUP.md](./ADMIN_MODULE_SETUP.md)** | Documentação técnica do módulo admin |
| **[ADMIN_QUICK_START.md](./ADMIN_QUICK_START.md)** | Guia rápido do admin |

---

## 🛠️ Stack Tecnológica

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (Framer Motion)
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage
- **Deploy**: Netlify (frontend) + Supabase (backend)

---

## 🔧 Setup do Supabase

### 1. Criar Tabelas

Execute o arquivo SQL no Supabase SQL Editor:

```bash
# Arquivo: ADMIN_SCHEMA.sql
```

### 2. Criar Usuário Admin

1. Supabase → Authentication → Users → Add user
2. Marque "Auto Confirm User"
3. Anote o email e senha

### 3. Autorizar Email

Edite `/supabase/functions/server/admin-config.tsx`:

```typescript
export const ADMIN_EMAILS = ['seu@email.com'];
```

### 4. Deploy Edge Functions

```bash
supabase login
supabase link --project-ref seu-project-id
supabase functions deploy make-server-a977770f
```

---

## 🌐 Deploy

### Netlify

**🎯 RECOMENDADO**: Use a integração automática!

👉 **Instale a extensão**: https://app.netlify.com/extensions/supabase

Configura automaticamente:
- ✅ `VITE_SUPABASE_PROJECT_ID`
- ✅ `VITE_SUPABASE_ANON_KEY`
- ✅ Deploy automático

📖 Ver guia completo: [NETLIFY_SUPABASE_INTEGRATION.md](./NETLIFY_SUPABASE_INTEGRATION.md)

---

**Alternativa - Configuração Manual:**

1. Configure as variáveis de ambiente:
   - `VITE_SUPABASE_PROJECT_ID`
   - `VITE_SUPABASE_ANON_KEY`

2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

3. Deploy! 🚀

> 📖 Ver guia manual completo: [DEPLOY_NETLIFY.md](./DEPLOY_NETLIFY.md)

---

## 📁 Estrutura do Projeto

```
/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── SendaDoCisneLP.tsx    # Landing page principal
│   │   │   ├── AdminPanel.tsx        # Painel administrativo
│   │   │   └── ui/                   # Componentes UI base
│   │   └── App.tsx                   # Entry point
│   ├── utils/
│   │   └── supabase/
│   │       └── info.ts               # Config Supabase
│   └── styles/
│       └── theme.css                 # Tema Tailwind
├── supabase/
│   └── functions/
│       └── server/                   # Edge Functions
│           ├── index.ts              # API endpoints
│           ├── admin-config.tsx      # Configurações admin
│           └── types.ts              # TypeScript types
├── public/
│   └── admin.html                    # Página de admin
├── ADMIN_SCHEMA.sql                  # Schema do banco
└── package.json
```

---

## 🎯 Como Usar o Admin Panel

### 1. Login
```
URL: /admin.html
Credenciais: configuradas no Supabase Auth
```

### 2. Upload de Imagens
- Escolha o tipo (Hero, Logo, Section, etc)
- Selecione arquivo (validação automática)
- Preview em tempo real
- Envio seguro para Supabase Storage

### 3. Gerenciar Links
- Edite URLs dos CTAs
- Altere textos dos botões
- Ative/desative links
- Histórico completo nos logs

### 4. Ver Logs
- Todas as ações são registradas
- Filtro por tipo de ação
- Data/hora precisa
- Identificação do usuário

---

## 🔒 Segurança

- ✅ Autenticação JWT obrigatória
- ✅ Row Level Security (RLS) no Supabase
- ✅ Validação de tipos de arquivo
- ✅ Limite de tamanho por tipo de imagem
- ✅ Sanitização de inputs
- ✅ Lista de emails autorizados
- ✅ Logs de auditoria completos

---

## 🐛 Troubleshooting

### Build falhando?
```bash
# Limpe cache e reinstale
rm -rf node_modules dist
npm install
npm run build
```

### Admin não funciona?
1. ✅ Variáveis de ambiente configuradas?
2. ✅ SQL Schema executado?
3. ✅ Edge Functions deployadas?
4. ✅ Email autorizado em `admin-config.tsx`?

### Upload de imagem falha?
- Verifique tamanho (Hero: 5MB, Logo: 1MB, etc)
- Formato aceito (PNG, JPG, JPEG, WebP)
- Conexão com Supabase Storage OK?

---

## 📝 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Deploy Supabase Functions
supabase functions deploy make-server-a977770f

# Ver logs das functions
supabase functions logs make-server-a977770f
```

---

## 🎨 Customização

### Cores
Edite `/src/styles/theme.css`:
```css
--color-primary: #your-color;
--color-accent: #your-accent;
```

### Fontes
Importe em `/src/styles/fonts.css`

### Textos
Edite diretamente em `SendaDoCisneLP.tsx`

---

## 📄 Licença

Propriedade de Patty Domingues. Todos os direitos reservados.

---

## 🆘 Suporte

Para dúvidas ou problemas:
1. Consulte a documentação em `/docs`
2. Verifique os guias de troubleshooting
3. Revise os logs do Supabase

---

**Desenvolvido com 🤍 para o programa Senda do Cisne**

Versão: 1.0.0  
Última atualização: Dezembro 2025