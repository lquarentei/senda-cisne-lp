# 🦢 Senda do Cisne - Comece Aqui

Bem-vindo! Este é o guia de início rápido.

---

## 🎯 O Que Você Tem

Uma **landing page completa** e **pronta para uso**, sem necessidade de banco de dados ou configurações complexas.

---

## ⚡ Início Ultra Rápido (3 passos)

### 1️⃣ Instalar

```bash
npm install
```

### 2️⃣ Editar Links

Abra `/src/config/landing-page.ts` e cole seus links:

```typescript
links: {
  checkout: 'https://pay.hotmart.com/SEU-LINK-AQUI',
  whatsapp: 'https://wa.me/5511999999999?text=Olá',
}
```

### 3️⃣ Testar

```bash
npm run dev
```

Acesse: http://localhost:5173/

**Pronto!** 🎉

---

## 📝 Próximos Passos (Opcional)

### Adicionar Suas Fotos

1. Coloque em `/public/images/`
   - `logo.png`
   - `hero-principal.jpg`
   - `patty-perfil.jpg`

2. Atualize em `/src/config/landing-page.ts`:
   ```typescript
   export const imagens = {
     logo: '/images/logo.png',
     heroPrincipal: '/images/hero-principal.jpg',
     pattyPerfil: '/images/patty-perfil.jpg',
   };
   ```

### Editar Preços

No mesmo arquivo:
```typescript
preco: {
  valorCheio: 'R$ 3.997',
  valorPromocional: 'R$ 1.997',
  parcelamento: '12x de R$ 197',
}
```

### Editar Depoimentos

```typescript
depoimentos: [
  {
    nome: 'Sua Cliente',
    foto: '/images/depoimentos/foto1.jpg',
    texto: 'Meu depoimento...',
    cargo: 'Profissão, Idade',
  },
]
```

---

## 🚀 Deploy (Quando Estiver Pronto)

### Netlify

1. Conecte seu GitHub ao Netlify
2. Configuração:
   - Build: `npm run build`
   - Pasta: `dist`
3. Deploy automático! ✨

**Sem variáveis de ambiente necessárias.**

---

## 📚 Documentação

| Guia | Para Que Serve |
|------|----------------|
| **[COMO_EDITAR.md](./COMO_EDITAR.md)** | Guia completo passo a passo |
| **[README.md](./README.md)** | Documentação técnica |
| **[README_SIMPLES.md](./README_SIMPLES.md)** | Resumo ultra rápido |
| **[/public/images/README.md](./public/images/README.md)** | Guia de imagens |

---

## 🎨 Anatomia do Projeto

```
seu-projeto/
├── 📝 INICIO.md                  ← VOCÊ ESTÁ AQUI
├── 📝 COMO_EDITAR.md             ← Guia principal
├── 📁 public/images/             ← Suas fotos aqui
└── 📁 src/config/
    └── landing-page.ts           ← Editar links/textos aqui
```

---

## ✅ Checklist

Antes de fazer deploy:

- [ ] Links dos botões configurados (checkout, WhatsApp)
- [ ] Número do WhatsApp correto
- [ ] Preços atualizados
- [ ] (Opcional) Logo adicionada
- [ ] (Opcional) Fotos principais adicionadas
- [ ] Testado localmente
- [ ] Build sem erros (`npm run build`)

---

## 🆘 Ajuda Rápida

**Onde editar links?**
→ `/src/config/landing-page.ts`

**Onde colocar fotos?**
→ `/public/images/`

**Como testar?**
→ `npm run dev`

**Como fazer deploy?**
→ `npm run build` + Netlify/Vercel

**Mais ajuda?**
→ Ver [COMO_EDITAR.md](./COMO_EDITAR.md)

---

## 💡 Dica Pro

**Edite primeiro os links e teste localmente antes de adicionar fotos.**

Assim você garante que a funcionalidade está OK antes de otimizar o visual! 😉

---

**Boa sorte com seu lançamento!** 🚀✨
