# 🖼️ Pasta de Imagens

## Como Usar

1. **Coloque suas fotos aqui** (nesta pasta `/public/images/`)
2. **Atualize os caminhos** em `/src/config/landing-page.ts`

---

## 📂 Estrutura Recomendada

```
/public/images/
├── logo.png
├── favicon.png
├── hero-principal.jpg
├── patty-perfil.jpg
├── patty-secundaria.jpg
├── comunidade.jpg
├── transformacao.jpg
└── depoimentos/
    ├── cliente1.jpg
    ├── cliente2.jpg
    └── cliente3.jpg
```

---

## 📏 Tamanhos Recomendados

| Tipo | Dimensões | Peso Máx |
|------|-----------|----------|
| **Hero** | 1920x1080px | 500KB |
| **Patty** | 800x800px | 300KB |
| **Depoimentos** | 400x400px | 150KB |
| **Logo** | 200x60px | 50KB |
| **Favicon** | 32x32px | 10KB |

---

## 🔧 Otimizar Imagens

Use ferramentas gratuitas:
- [TinyPNG](https://tinypng.com/)
- [Squoosh](https://squoosh.app/)
- [iloveimg](https://www.iloveimg.com/pt/comprimir-imagem)

---

## ✅ Exemplo de Configuração

Depois de adicionar `hero-principal.jpg` aqui, edite:

**`/src/config/landing-page.ts`:**
```typescript
export const imagens = {
  heroPrincipal: '/images/hero-principal.jpg',
};
```

**Importante:** O caminho começa com `/images/` (com a barra inicial).

---

## 🆘 Troubleshooting

**Imagem não aparece?**
- ✅ Arquivo está em `/public/images/` (não `/src/images/`)
- ✅ Nome do arquivo bate exatamente (maiúsculas/minúsculas)
- ✅ Caminho no config está correto: `/images/nome.jpg`
- ✅ Recarregou a página (Ctrl+R)

---

**Guia completo:** [/COMO_EDITAR.md](../../COMO_EDITAR.md)
