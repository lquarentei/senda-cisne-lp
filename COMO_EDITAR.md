# 📝 Como Editar a Landing Page - Guia Simplificado

## 🎯 Tudo que Você Precisa Saber

Esta landing page foi criada para ser **super fácil de editar** sem precisar de banco de dados, sistema admin ou conhecimento técnico avançado.

---

## 🔗 1. EDITAR LINKS DOS BOTÕES

### 📍 Onde editar:
```
/src/config/landing-page.ts
```

### ✏️ O que fazer:

1. Abra o arquivo `/src/config/landing-page.ts`
2. Encontre a seção `links:`
3. Cole seus links:

```typescript
links: {
  // Link do checkout (Hotmart, Eduzz, Kiwify, etc.)
  checkout: 'https://pay.hotmart.com/SEU-PRODUTO-AQUI',
  
  // Link do WhatsApp com mensagem pré-configurada
  whatsapp: 'https://wa.me/5511999999999?text=Olá,%20quero%20saber%20mais',
  
  // Instagram
  instagram: 'https://instagram.com/pattydomingues',
  
  // Outros
  formulario: 'https://forms.gle/SEU-FORMULARIO',
},
```

**Pronto!** Todos os botões da página vão usar esses links automaticamente.

---

## 🖼️ 2. TROCAR IMAGENS

### 📁 Onde colocar as imagens:
```
/public/images/
```

### 📂 Estrutura recomendada:

Crie a pasta `/public/images/` e organize assim:

```
/public/images/
├── logo.png
├── favicon.png
├── hero-principal.jpg     (1920x1080px - imagem principal)
├── patty-perfil.jpg       (800x800px - foto da Patty)
├── patty-secundaria.jpg   (800x800px - outra foto)
├── comunidade.jpg         (1200x800px - comunidade)
├── transformacao.jpg      (1200x800px)
└── depoimentos/
    ├── ana.jpg            (400x400px)
    ├── mariana.jpg        (400x400px)
    └── juliana.jpg        (400x400px)
```

### ✏️ Como configurar:

1. Coloque suas fotos na pasta `/public/images/`
2. Abra `/src/config/landing-page.ts`
3. Atualize os caminhos na seção `imagens`:

```typescript
export const imagens = {
  logo: '/images/logo.png',
  favicon: '/images/favicon.png',
  
  heroPrincipal: '/images/hero-principal.jpg',
  
  pattyPerfil: '/images/patty-perfil.jpg',
  pattySecundaria: '/images/patty-secundaria.jpg',
  
  comunidade: '/images/comunidade.jpg',
  transformacao: '/images/transformacao.jpg',
  elegancia: '/images/elegancia.jpg',
};
```

**Importante:**
- Os nomes devem bater exatamente (incluindo maiúsculas/minúsculas)
- Use `/images/` no início do caminho
- Formatos aceitos: `.jpg`, `.jpeg`, `.png`, `.webp`, `.svg`

---

## 💰 3. EDITAR PREÇOS

### 📍 Onde editar:
```
/src/config/landing-page.ts
```

### ✏️ O que fazer:

```typescript
preco: {
  valorCheio: 'R$ 3.997',
  valorPromocional: 'R$ 1.997',
  parcelamento: '12x de R$ 197',
  mostrarPromocao: true, // true = mostra preço riscado
},
```

---

## ✍️ 4. EDITAR TEXTOS

### 📍 Onde editar:
```
/src/config/landing-page.ts
```

### Títulos principais:

```typescript
textos: {
  heroTitulo: 'Desperte a Mulher que Você Sempre Soube Ser',
  heroSubtitulo: 'Uma jornada de autoconhecimento...',
  ctaPrincipal: 'Quero Iniciar Minha Transformação',
  ctaSecundario: 'Falar com Patty no WhatsApp',
},
```

### Depoimentos:

```typescript
depoimentos: [
  {
    nome: 'Ana Paula Silva',
    foto: '/images/depoimentos/ana.jpg',
    texto: 'A Senda do Cisne mudou completamente...',
    cargo: 'Executiva, 42 anos',
  },
  // Adicione mais ou remova
],
```

---

## 📞 5. EDITAR CONTATO

```typescript
contato: {
  email: 'contato@pattydomingues.com',
  telefone: '(11) 99999-9999',
  instagram: '@pattydomingues',
},
```

---

## 🎁 6. EDITAR BÔNUS

```typescript
bonus: [
  {
    titulo: 'Análise de Coloração Pessoal',
    descricao: 'Descubra sua paleta de cores ideal',
    valor: 'R$ 497',
  },
  // Adicione ou remova bônus
],
```

---

## ⏰ 7. CONTADOR DE ESCASSEZ

```typescript
escassez: {
  mostrarContador: true,              // true = mostra / false = esconde
  dataLimite: '2026-02-01T23:59:59', // Data de encerramento
  vagasLimitadas: 30,                 // Número de vagas
  mostrarVagas: true,                 // true = mostra contador de vagas
},
```

---

## 🚀 8. PUBLICAR AS MUDANÇAS

Depois de editar:

```bash
# 1. Salvar os arquivos
# 2. Fazer commit
git add .
git commit -m "Atualizar links e imagens"

# 3. Fazer push (se estiver usando Git/GitHub)
git push origin main

# 4. Deploy automático! ✨
```

**Se estiver rodando local:**
```bash
npm run dev
```

**📖 Guia completo de deploy:** [DEPLOY.md](./DEPLOY.md)

---

## 📋 CHECKLIST DE EDIÇÃO

Antes de fazer deploy, verifique:

- [ ] **Links dos botões** configurados (`checkout`, `whatsapp`)
- [ ] **Logo** adicionada em `/public/images/logo.png`
- [ ] **Foto hero** adicionada (imagem principal)
- [ ] **Foto da Patty** adicionada
- [ ] **Preços** atualizados
- [ ] **Depoimentos** editados (nome, foto, texto)
- [ ] **Contato** atualizado (email, telefone)
- [ ] **Testado localmente** (`npm run dev`)
- [ ] **Deploy feito** (git push)

---

## 🎨 DICAS DE IMAGENS

### Tamanhos Recomendados:

| Tipo | Tamanho | Formato | Onde Usar |
|------|---------|---------|-----------|
| **Hero** | 1920x1080px | JPG | Imagem principal do topo |
| **Patty Perfil** | 800x800px | JPG | Foto da mentora |
| **Depoimentos** | 400x400px | JPG | Fotos de clientes |
| **Logo** | 200x60px | PNG/SVG | Header e footer |
| **Favicon** | 32x32px | PNG/ICO | Ícone do navegador |

### Otimizar Imagens:

Use ferramentas online gratuitas:
- [TinyPNG](https://tinypng.com/) - Comprimir JPG/PNG
- [Squoosh](https://squoosh.app/) - Comprimir e converter
- [iloveimg](https://www.iloveimg.com/pt/comprimir-imagem) - Comprimir

**Por quê otimizar?**
- Site carrega mais rápido ⚡
- Melhor experiência no mobile 📱
- Melhor SEO no Google 📈

---

## 🆘 PRECISA DE AJUDA?

### Erro comum: Imagem não aparece

**Problema**: Coloquei a imagem mas não aparece

**Solução**:
1. Verifique se a pasta é `/public/images/` (não `/src/images/`)
2. Verifique se o nome do arquivo bate exatamente
3. Verifique se o caminho começa com `/images/` (com a barra)
4. Reinicie o servidor (`npm run dev`)

### Erro comum: Link não funciona

**Problema**: Botão não abre o link

**Solução**:
1. Verifique se o link está completo (`https://...`)
2. Salve o arquivo `/src/config/landing-page.ts`
3. Recarregue a página (Ctrl+R ou Cmd+R)

---

## 💡 ESTRUTURA DE ARQUIVOS

```
seu-projeto/
├── public/
│   └── images/              ⬅️ SUAS IMAGENS AQUI
│       ├── logo.png
│       ├── hero-principal.jpg
│       └── ...
├── src/
│   ├── config/
│   │   └── landing-page.ts  ⬅️ EDITAR LINKS/TEXTOS AQUI
│   └── app/
│       └── components/
│           └── SendaDoCisneLP.tsx  (não precisa editar)
└── COMO_EDITAR.md          ⬅️ VOCÊ ESTÁ AQUI
```

---

## 🎯 RESUMO ULTRA RÁPIDO

**Para editar links e textos:**
→ `/src/config/landing-page.ts`

**Para trocar imagens:**
→ Colocar em `/public/images/` e atualizar caminhos em `landing-page.ts`

**Para publicar:**
→ `git add . && git commit -m "Update" && git push`

---

**Simples assim! Sem banco de dados, sem complicação.** 🎉

Se tiver dúvidas, abra o arquivo `/src/config/landing-page.ts` - ele tem TODOS os comentários explicativos!