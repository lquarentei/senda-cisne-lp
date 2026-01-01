# 🦢 Senda do Cisne - Guia Rápido

Landing page premium para **Senda do Cisne** - Patty Domingues

---

## 🚀 Começar

```bash
npm install
npm run dev
```

---

## ✏️ Editar

### 1. Links dos Botões

**Arquivo:** `/src/config/landing-page.ts`

```typescript
links: {
  checkout: 'https://pay.hotmart.com/SEU-LINK',
  whatsapp: 'https://wa.me/5511999999999',
}
```

### 2. Preços

```typescript
preco: {
  valorCheio: 'R$ 3.997',
  valorPromocional: 'R$ 1.997',
}
```

### 3. Imagens

1. Colocar em `/public/images/`
2. Atualizar caminhos:

```typescript
imagens: {
  logo: '/images/logo.png',
  heroPrincipal: '/images/hero.jpg',
}
```

---

## 🌐 Deploy

**Netlify:**
1. Conectar GitHub
2. Build: `npm run build`
3. Pasta: `dist`

**Sem variáveis de ambiente necessárias!**

---

## 📁 Estrutura

```
/public/images/           ← Suas fotos
/src/config/landing-page.ts  ← Editar tudo aqui
```

---

## 📖 Guia Completo

Ver [COMO_EDITAR.md](./COMO_EDITAR.md) para instruções detalhadas.

---

**Simples assim!** ✨
