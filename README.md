# 🦢 Senda do Cisne - Landing Page

> **📚 [Ver Índice Completo da Documentação →](./DOCUMENTACAO.md)**

Landing page premium para o programa **"Senda do Cisne"** de Patty Domingues - Mentoria de Consultoria de Imagem e Estilo.

---

## ✨ Características

- 🎨 **Design Premium**: Rose gold, bege e branco
- 📱 **Totalmente Responsivo**: Desktop, tablet e mobile
- ⚡ **Animações Suaves**: Motion (Framer Motion)
- 🎯 **Copy Otimizado**: Focado em conversão
- ✏️ **Fácil de Editar**: Sem banco de dados, sem complicação
- 🚀 **Deploy Rápido**: Pronto para Netlify, Vercel, etc.

---

## 🚀 Quick Start

### 1. Instalar Dependências

```bash
npm install
```

### 2. Rodar Localmente

```bash
npm run dev
```

Acesse: http://localhost:5173/

### 3. Build para Produção

```bash
npm run build
```

---

## ✏️ Como Editar

### 🔗 Editar Links e Textos

**Arquivo:** `/src/config/landing-page.ts`

```typescript
export const landingPageConfig = {
  // Links dos botões
  links: {
    checkout: 'https://pay.hotmart.com/SEU-PRODUTO-AQUI',
    whatsapp: 'https://wa.me/5511999999999?text=Olá',
    instagram: 'https://instagram.com/pattydomingues',
  },

  // Preços
  preco: {
    valorCheio: 'R$ 3.997',
    valorPromocional: 'R$ 1.997',
    parcelamento: '12x de R$ 197',
  },

  // Textos principais
  textos: {
    heroTitulo: 'Desperte a Mulher que Você Sempre Soube Ser',
    ctaPrincipal: 'Quero Iniciar Minha Transformação',
  },
};
```

### 🖼️ Trocar Imagens

1. Coloque suas fotos em `/public/images/`
2. Atualize os caminhos em `/src/config/landing-page.ts`:

```typescript
export const imagens = {
  logo: '/images/logo.png',
  heroPrincipal: '/images/hero-principal.jpg',
  pattyPerfil: '/images/patty-perfil.jpg',
};
```

**📖 Guia completo:** [COMO_EDITAR.md](./COMO_EDITAR.md)

---

## 📁 Estrutura do Projeto

```
/
├── public/
│   └── images/              ← 🖼️ Suas imagens aqui
│       ├── logo.png
│       ├── hero-principal.jpg
│       └── patty-perfil.jpg
├── src/
│   ├── config/
│   │   └── landing-page.ts  ← ⭐ Editar links, textos, preços
│   ├── app/
│   │   ├── App.tsx
│   │   └── components/
│   │       ├── SendaDoCisneLP.tsx
│   │       └── ui/          ← Componentes shadcn/ui
│   └── styles/
│       └── theme.css        ← Tema Tailwind
├── COMO_EDITAR.md           ← 📖 Guia detalhado
└── README.md                ← Você está aqui
```

---

## 🌐 Deploy

### Netlify (Recomendado)

1. Conecte seu repositório GitHub ao Netlify
2. Configure:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. Deploy automático! 🎉

**Não precisa de variáveis de ambiente.**

### Vercel

```bash
npm install -g vercel
vercel
```

### Outros

Build estático em `/dist` - funciona em qualquer host.

---

## 🛠️ Stack Tecnológica

- **React 18** + TypeScript
- **Vite** (build tool)
- **Tailwind CSS v4** (styling)
- **Motion** (animações)
- **shadcn/ui** (componentes)

---

## 📝 Seções da Landing Page

1. **Hero** - Título impactante + CTA principal
2. **Identificação** - Dores e desejos do público
3. **Quem é Patty** - Credibilidade e autoridade
4. **Pilares do Programa** - Metodologia em 6 pilares
5. **Diferencial** - O que torna único
6. **Comunidade** - Prova social
7. **Investimento** - Preço e condições
8. **CTA Final** - Chamada para ação

---

## 🎨 Personalização

### Cores

Edite `/src/styles/theme.css`:

```css
:root {
  --color-primary: #C8A882; /* Rose gold */
  --color-secondary: #FDFBF7; /* Bege */
}
```

### Fontes

Importe em `/src/styles/fonts.css` (Google Fonts, etc.)

### Textos Longos

Edite diretamente em `/src/app/components/SendaDoCisneLP.tsx`

---

## 📖 Documentação

| Arquivo | Descrição |
|---------|-----------|
| [COMO_EDITAR.md](./COMO_EDITAR.md) | Guia completo de edição |
| [README_SIMPLES.md](./README_SIMPLES.md) | Versão resumida |

---

## ✅ Checklist Antes do Deploy

- [ ] Links dos botões configurados
- [ ] Número do WhatsApp atualizado
- [ ] Preços atualizados
- [ ] Logo adicionada
- [ ] Imagens principais adicionadas
- [ ] Depoimentos editados
- [ ] Testado localmente (`npm run dev`)
- [ ] Build sem erros (`npm run build`)

---

## 🆘 Precisa de Ajuda?

**Imagem não aparece?**
- Verifique se está em `/public/images/` (não `/src/images/`)
- Caminho começa com `/images/` (com a barra)
- Nome do arquivo bate exatamente

**Link não funciona?**
- Link completo com `https://`
- Salve o arquivo `/src/config/landing-page.ts`
- Recarregue a página

**Mais ajuda:** Ver [COMO_EDITAR.md](./COMO_EDITAR.md)

---

## 📄 Licença

Propriedade de Patty Domingues. Todos os direitos reservados.

---

**Desenvolvido com 🤍 para o programa Senda do Cisne**