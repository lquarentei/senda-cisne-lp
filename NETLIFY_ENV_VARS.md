# 🔐 Variáveis de Ambiente - Netlify

## 📍 Onde Configurar

1. Acesse seu site no Netlify
2. **Site settings → Environment variables**
3. Ou direto: `https://app.netlify.com/sites/[seu-site]/settings/env`

---

## ✅ Variáveis Necessárias

### 1. VITE_SUPABASE_PROJECT_ID

**Descrição**: ID do seu projeto Supabase

**Como encontrar**:
1. Acesse: https://app.supabase.com/project/[seu-projeto]/settings/general
2. Procure por **"Reference ID"** ou veja na URL
3. Exemplo: `abcdefghijklmnop`

**No Netlify**:
```
Key: VITE_SUPABASE_PROJECT_ID
Value: abcdefghijklmnop
Options: 
  ☑ Same value for all deploy contexts
  ☐ Keep this value secret
```

---

### 2. VITE_SUPABASE_ANON_KEY

**Descrição**: Chave pública/anônima do Supabase

**Como encontrar**:
1. Acesse: https://app.supabase.com/project/[seu-projeto]/settings/api
2. Procure por **"Project API keys"**
3. Copie a chave `anon` `public` (começa com `eyJhbGc...`)
4. Exemplo: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc...`

**No Netlify**:
```
Key: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Options: 
  ☑ Same value for all deploy contexts
  ☐ Keep this value secret (é pública mesmo, pode deixar desmarcado)
```

---

## 🎯 Passo a Passo Visual

### No Supabase:

```
1. Settings (⚙️) → General
   ↓
   Reference ID: abcdefghijklmnop ← COPIE ISSO
   
2. Settings (⚙️) → API
   ↓
   Project API keys
   ↓
   anon | public
   eyJhbGciOiJIUzI1N... ← COPIE ISSO
```

### No Netlify:

```
1. Site settings → Environment variables
   ↓
2. Add a variable
   ↓
3. Preencha:
   
   Variable 1:
   Key: VITE_SUPABASE_PROJECT_ID
   Value: [cole o Reference ID]
   Scopes: ☑ All
   
   Variable 2:
   Key: VITE_SUPABASE_ANON_KEY
   Value: [cole a chave anon]
   Scopes: ☑ All
   
   ↓
4. Save
   ↓
5. Trigger deploy ou faça novo commit
```

---

## ✅ Checklist

Depois de configurar:

- [ ] Adicionei `VITE_SUPABASE_PROJECT_ID`
- [ ] Adicionei `VITE_SUPABASE_ANON_KEY`
- [ ] Cliquei em "Save"
- [ ] Fiz novo deploy (commit ou trigger manual)
- [ ] Build passou sem erros
- [ ] Site está no ar
- [ ] `/admin.html` carrega a tela de login

---

## 🐛 Troubleshooting

### Build continua falhando

**Possíveis causas**:
1. Nomes das variáveis errados (tem que ser exatamente `VITE_SUPABASE_PROJECT_ID` e `VITE_SUPABASE_ANON_KEY`)
2. Valores vazios ou incorretos
3. Esqueceu de salvar

**Solução**:
- Delete as variáveis
- Recrie com os nomes EXATOS
- Salve
- Trigger deploy

---

### Admin não conecta

**Sintoma**: Login falha ou "Erro ao conectar"

**Checklist**:
1. ✅ Variáveis configuradas corretamente?
2. ✅ Build passou sem erros?
3. ✅ SQL Schema foi executado no Supabase?
4. ✅ Edge Functions foram deployadas?

**Como verificar se variáveis estão OK**:
1. Abra DevTools do navegador (F12)
2. Console → Digite:
   ```javascript
   import.meta.env.VITE_SUPABASE_PROJECT_ID
   ```
3. Deve retornar seu Project ID
4. Se retornar `undefined`, variáveis não foram carregadas

---

### Valores de Teste (NÃO USE EM PRODUÇÃO!)

Para testar se as variáveis estão sendo lidas:

```env
VITE_SUPABASE_PROJECT_ID=test123
VITE_SUPABASE_ANON_KEY=test456
```

Se o build passar com isso, significa que o problema é nos valores reais do Supabase.

---

## 📱 URLs de Referência

- **Supabase Settings**: https://app.supabase.com/project/_/settings
- **Netlify Env Vars**: https://app.netlify.com/sites/[seu-site]/settings/env
- **Netlify Deploy Logs**: https://app.netlify.com/sites/[seu-site]/deploys

---

## 🎉 Deu Certo!

Se tudo funcionar, você verá:

✅ Build passou no Netlify  
✅ Site carrega sem erros  
✅ Console sem erros de "undefined"  
✅ `/admin.html` mostra tela de login  

**Próximo passo**: Deploy das Edge Functions! Ver [DEPLOY_NETLIFY.md](./DEPLOY_NETLIFY.md)

---

**Tempo**: 2-3 minutos  
**Dificuldade**: ⭐ (Muito Fácil)
