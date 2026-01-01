# 🎯 Guia Visual Rápido

Guia visual super simplificado para começar em 5 minutos.

---

## 📍 Passo 1: Abrir o Arquivo de Configuração

```
📁 Abra: /src/config/landing-page.ts
```

Este é o **ÚNICO arquivo** que você precisa editar! 🎉

---

## ✏️ Passo 2: Editar Links

Encontre esta parte no arquivo:

```typescript
links: {
  checkout: 'https://pay.hotmart.com/SEU-PRODUTO-AQUI',  // ← COLE SEU LINK AQUI
  whatsapp: 'https://wa.me/5511999999999',              // ← SEU WHATSAPP AQUI
  instagram: 'https://instagram.com/pattydomingues',    // ← SEU INSTAGRAM AQUI
}
```

### 🔗 Como obter o link do WhatsApp:

```
Formato: https://wa.me/5511999999999?text=Mensagem

Exemplo: https://wa.me/5511987654321?text=Olá,%20quero%20saber%20mais
         └──────┘ └──────────────┘ └────────────────────────────┘
         wa.me    DDD + Número     Mensagem (opcional)
```

---

## 💰 Passo 3: Editar Preços (Opcional)

```typescript
preco: {
  valorCheio: 'R$ 3.997',        // ← Preço original
  valorPromocional: 'R$ 1.997',  // ← Preço com desconto
  parcelamento: '12x de R$ 197', // ← Parcelamento
}
```

---

## 🖼️ Passo 4: Adicionar Suas Fotos (Opcional)

### A) Colocar fotos na pasta:

```
📁 /public/images/
   ├── logo.png              ← Sua logo aqui
   ├── hero-principal.jpg    ← Foto principal (topo)
   └── patty-perfil.jpg      ← Foto da Patty
```

### B) Atualizar caminhos no mesmo arquivo:

```typescript
export const imagens = {
  logo: '/images/logo.png',                    // ← Nome do arquivo
  heroPrincipal: '/images/hero-principal.jpg', // ← Nome do arquivo
  pattyPerfil: '/images/patty-perfil.jpg',     // ← Nome do arquivo
}
```

⚠️ **Importante:** O nome deve bater EXATAMENTE com o arquivo!

---

## 🚀 Passo 5: Testar

### Rodar localmente:

```bash
npm install  # Só na primeira vez
npm run dev  # Toda vez que for testar
```

Acesse: http://localhost:5173/

---

## 📤 Passo 6: Publicar

### Fazer commit:

```bash
git add .
git commit -m "Atualizar links e imagens"
git push origin main
```

### Deploy no Netlify:

1. Conecte seu GitHub: https://app.netlify.com
2. Escolha o repositório
3. Configurar:
   - Build: `npm run build`
   - Pasta: `dist`
4. **Deploy!** 🎉

---

## 📋 Checklist Rápido

**Antes de publicar, verifique:**

- [ ] ✅ Link do checkout configurado
- [ ] ✅ Número do WhatsApp correto
- [ ] ✅ Preços atualizados
- [ ] ✅ Testado com `npm run dev`
- [ ] ✅ Commit feito no Git
- [ ] ✅ Deploy no Netlify

---

## 🎨 Dica de Imagens

### Tamanhos Ideais:

```
Logo:          200 x 60 px   (PNG transparente)
Hero:          1920 x 1080 px (JPG otimizado)
Patty:         800 x 800 px   (JPG otimizado)
Depoimentos:   400 x 400 px   (JPG otimizado)
```

### Comprimir antes de adicionar:

🔗 Use: https://tinypng.com/

---

## 🆘 Erros Comuns

### ❌ Imagem não aparece

```
✅ Solução:
1. Arquivo está em /public/images/ ?
2. Nome bate exatamente? (maiúsculas/minúsculas)
3. Caminho começa com /images/ ?
4. Reiniciou o servidor? (Ctrl+C e npm run dev)
```

### ❌ Link não funciona

```
✅ Solução:
1. Link tem https:// no início?
2. Salvou o arquivo landing-page.ts?
3. Recarregou a página? (Ctrl+R ou Cmd+R)
```

### ❌ Build falha

```
✅ Solução:
npm install    # Reinstalar dependências
npm run build  # Testar build local
```

---

## 📚 Precisa de Mais Detalhes?

| Guia | Link |
|------|------|
| **Início** | [INICIO.md](./INICIO.md) |
| **Edição Completa** | [COMO_EDITAR.md](./COMO_EDITAR.md) |
| **Deploy Detalhado** | [DEPLOY.md](./DEPLOY.md) |
| **Índice de Tudo** | [DOCUMENTACAO.md](./DOCUMENTACAO.md) |

---

## 💡 Resumo Ultra Resumido

```
1. Editar /src/config/landing-page.ts
   ↓
2. npm run dev
   ↓
3. Testar
   ↓
4. git push
   ↓
5. Deploy Netlify
   ↓
6. 🎉 PRONTO!
```

---

**Só isso! Simples assim.** ✨

---

_Tempo estimado: 5-10 minutos_ ⏱️
