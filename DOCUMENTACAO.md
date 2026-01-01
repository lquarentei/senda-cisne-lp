# 📚 Documentação - Senda do Cisne

Índice completo de todos os guias disponíveis.

---

## 🎯 Para Começar

| Guia | Descrição | Quando Usar |
|------|-----------|-------------|
| **[INICIO.md](./INICIO.md)** | Guia de início rápido | ⭐ Comece aqui! |
| **[README.md](./README.md)** | Documentação técnica completa | Para entender o projeto |
| **[README_SIMPLES.md](./README_SIMPLES.md)** | Resumo ultra rápido | Para referência rápida |

---

## ✏️ Para Editar

| Guia | Descrição | Quando Usar |
|------|-----------|-------------|
| **[COMO_EDITAR.md](./COMO_EDITAR.md)** | Guia completo de edição | Para editar links, textos, imagens |
| **[/src/config/landing-page.ts](./src/config/landing-page.ts)** | Arquivo de configuração | ⭐ Edite tudo aqui! |
| **[/public/images/README.md](./public/images/README.md)** | Guia de imagens | Para adicionar fotos |

---

## 🚀 Para Fazer Deploy

| Guia | Descrição | Quando Usar |
|------|-----------|-------------|
| **[DEPLOY.md](./DEPLOY.md)** | Guia completo de deploy | Para colocar no ar |

---

## 📁 Estrutura Rápida

```
📝 Documentação
├── INICIO.md                    ← Comece aqui
├── COMO_EDITAR.md               ← Como editar tudo
├── DEPLOY.md                    ← Como fazer deploy
├── README.md                    ← Documentação técnica
└── README_SIMPLES.md            ← Resumo rápido

📂 Código
├── /src/config/landing-page.ts  ← ⭐ EDITAR AQUI
├── /src/app/components/         ← Componentes React
└── /public/images/              ← Suas fotos aqui
```

---

## 🎓 Trilha de Aprendizado

### Nível 1: Primeiros Passos
1. Ler [INICIO.md](./INICIO.md)
2. Instalar: `npm install`
3. Rodar: `npm run dev`

### Nível 2: Personalização Básica
4. Editar links em `/src/config/landing-page.ts`
5. Testar localmente
6. Seguir [COMO_EDITAR.md](./COMO_EDITAR.md)

### Nível 3: Personalização Avançada
7. Adicionar suas fotos em `/public/images/`
8. Editar preços e textos
9. Otimizar imagens

### Nível 4: Deploy
10. Fazer commit no Git
11. Seguir [DEPLOY.md](./DEPLOY.md)
12. Publicar no Netlify/Vercel

---

## 🔍 Busca Rápida

**"Como edito os links dos botões?"**
→ Ver [COMO_EDITAR.md - Seção 1](./COMO_EDITAR.md#1-editar-links-dos-botões)

**"Como adiciono minhas fotos?"**
→ Ver [COMO_EDITAR.md - Seção 2](./COMO_EDITAR.md#2-trocar-imagens)

**"Como mudo os preços?"**
→ Ver [COMO_EDITAR.md - Seção 3](./COMO_EDITAR.md#3-editar-preços)

**"Como faço deploy?"**
→ Ver [DEPLOY.md](./DEPLOY.md)

**"Como funciona o projeto?"**
→ Ver [README.md](./README.md)

**"Preciso de um guia rápido!"**
→ Ver [README_SIMPLES.md](./README_SIMPLES.md)

---

## 🆘 Ajuda Rápida

### Erros Comuns

| Problema | Solução | Guia |
|----------|---------|------|
| Imagem não aparece | Verificar pasta `/public/images/` | [COMO_EDITAR.md](./COMO_EDITAR.md) |
| Link não funciona | Verificar `landing-page.ts` | [COMO_EDITAR.md](./COMO_EDITAR.md) |
| Build falha | Testar `npm run build` | [DEPLOY.md](./DEPLOY.md) |
| Deploy não funciona | Verificar configurações | [DEPLOY.md](./DEPLOY.md) |

---

## 📝 Arquivos Importantes

### Para Editar
- ✅ `/src/config/landing-page.ts` - Configurações gerais
- ✅ `/public/images/` - Suas imagens

### Para Não Mexer (a não ser que saiba o que está fazendo)
- ⚠️ `/src/app/components/SendaDoCisneLP.tsx` - Código da landing page
- ⚠️ `/src/styles/` - Estilos CSS
- ⚠️ `/vite.config.ts` - Configuração do Vite
- ⚠️ `/package.json` - Dependências

---

## 💡 Dicas Pro

1. **Sempre teste localmente** antes de fazer deploy
2. **Faça commits frequentes** no Git
3. **Otimize imagens** antes de adicionar
4. **Use nomes descritivos** para arquivos
5. **Leia os comentários** no código

---

## 🎯 Fluxo de Trabalho Recomendado

```
1. Clonar projeto
   ↓
2. npm install
   ↓
3. Editar /src/config/landing-page.ts
   ↓
4. npm run dev (testar)
   ↓
5. Adicionar imagens (opcional)
   ↓
6. git commit + push
   ↓
7. Deploy no Netlify
   ↓
8. 🎉 Site no ar!
```

---

## 📊 Tempo Estimado

| Tarefa | Tempo | Dificuldade |
|--------|-------|-------------|
| Setup inicial | 5 min | ⭐ Fácil |
| Editar links | 2 min | ⭐ Fácil |
| Adicionar fotos | 10-30 min | ⭐⭐ Médio |
| Deploy | 5-10 min | ⭐ Fácil |
| **Total** | **~30-45 min** | ⭐ Fácil |

---

## ✅ Checklist Completo

### Antes de Começar
- [ ] Node.js 18+ instalado
- [ ] Git instalado
- [ ] Editor de código (VS Code, etc)
- [ ] Conta no GitHub (opcional mas recomendado)

### Configuração
- [ ] `npm install` executado
- [ ] Projeto roda localmente
- [ ] Links editados em `landing-page.ts`
- [ ] Número WhatsApp configurado

### Personalização (Opcional)
- [ ] Logo adicionada
- [ ] Foto hero adicionada
- [ ] Foto da Patty adicionada
- [ ] Depoimentos editados
- [ ] Preços atualizados

### Deploy
- [ ] Build sem erros (`npm run build`)
- [ ] Conta no Netlify/Vercel criada
- [ ] Repositório conectado
- [ ] Deploy realizado
- [ ] Site testado online

---

## 🎓 Recursos Adicionais

### Aprender Mais

- **React:** https://react.dev/
- **Tailwind CSS:** https://tailwindcss.com/
- **Vite:** https://vitejs.dev/
- **Netlify:** https://docs.netlify.com/
- **Vercel:** https://vercel.com/docs

### Ferramentas Úteis

- **Otimizar Imagens:** [TinyPNG](https://tinypng.com/)
- **Paleta de Cores:** [Coolors](https://coolors.co/)
- **Fontes:** [Google Fonts](https://fonts.google.com/)
- **Ícones:** [Lucide](https://lucide.dev/)

---

## 🏆 Próximos Passos

Depois que sua landing page estiver no ar:

1. ✅ Testar em dispositivos móveis
2. ✅ Testar todos os links
3. ✅ Configurar domínio próprio (opcional)
4. ✅ Configurar analytics (Google Analytics, etc)
5. ✅ Compartilhar com o mundo! 🚀

---

**Boa sorte com seu lançamento!** 🦢✨

---

_Última atualização: Janeiro 2026_
