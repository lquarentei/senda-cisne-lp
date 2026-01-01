# 🔍 Debug de Variáveis de Ambiente

## Como Verificar as Variáveis no Netlify

Após a integração automática com Supabase, use este guia para verificar quais variáveis foram criadas.

---

## 1️⃣ Ver no Console do Navegador

Acesse seu site deployado e abra o console (F12):

```javascript
// Cole isso no console:
console.log('🔍 Variáveis Supabase detectadas:');
console.log({
  // Padrão Netlify Integration
  SUPABASE_URL: import.meta.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: import.meta.env.SUPABASE_ANON_KEY || import.meta.env.SUPABASE_KEY,
  SUPABASE_PROJECT_ID: import.meta.env.SUPABASE_PROJECT_ID,
  
  // Padrão Manual (com VITE_)
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  VITE_SUPABASE_PROJECT_ID: import.meta.env.VITE_SUPABASE_PROJECT_ID,
});
```

---

## 2️⃣ Ver no Netlify Dashboard

1. Acesse: `https://app.netlify.com/sites/[seu-site]/settings/env`

2. Verifique quais variáveis foram criadas pela integração

**Possibilidades:**

### Cenário A: Integração Criou com Prefixo `SUPABASE_`
```
✅ SUPABASE_URL
✅ SUPABASE_ANON_KEY (ou SUPABASE_KEY)
❓ SUPABASE_PROJECT_ID (pode ou não ter)
```

### Cenário B: Você Configurou Manualmente com `VITE_`
```
✅ VITE_SUPABASE_PROJECT_ID
✅ VITE_SUPABASE_ANON_KEY
```

### Cenário C: Misturado (Integração + Manual)
```
✅ SUPABASE_URL (da integração)
✅ SUPABASE_ANON_KEY (da integração)
✅ VITE_SUPABASE_PROJECT_ID (manual)
```

---

## 3️⃣ Solução: Adicionar PROJECT_ID Manualmente

Se a integração **NÃO criou** `SUPABASE_PROJECT_ID` ou `VITE_SUPABASE_PROJECT_ID`:

### No Netlify:
1. `Site settings` → `Environment variables`
2. Click `Add a variable`
3. **Adicione:**
   ```
   Key: VITE_SUPABASE_PROJECT_ID
   Value: [copie da URL do Supabase]
   ```

### Onde encontrar o PROJECT_ID:

**Opção 1 - Da URL:**
```
https://app.supabase.com/project/abcdefgh123456/settings/api
                                 ^^^^^^^^^^^^^^^^
                                 ESTE É O PROJECT ID
```

**Opção 2 - No Dashboard:**
```
Supabase → Settings → General → Reference ID
```

4. Salve e faça novo deploy (ou trigger redeploy)

---

## 4️⃣ Verificar se Funcionou

Após adicionar a variável:

1. Aguarde o novo deploy terminar
2. Acesse: `https://seu-site.netlify.app/admin.html`
3. Deve aparecer a tela de login (não mais "Configuração Pendente")

---

## 🔧 Nosso Código Suporta Ambos os Padrões

O arquivo `/src/utils/supabase/info.ts` está configurado para aceitar AMBAS as convenções:

```typescript
// Tenta PRIMEIRO com VITE_, depois sem VITE_
export const projectId = 
  import.meta.env.VITE_SUPABASE_PROJECT_ID ||  // Manual
  import.meta.env.SUPABASE_PROJECT_ID ||       // Integração
  '';

export const publicAnonKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY ||    // Manual
  import.meta.env.SUPABASE_ANON_KEY ||         // Integração
  import.meta.env.SUPABASE_KEY ||              // Variação
  '';

export const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL ||         // Manual
  import.meta.env.SUPABASE_URL ||              // Integração
  (projectId ? `https://${projectId}.supabase.co` : '');
```

**Ou seja**: Funciona com QUALQUER combinação! 🎉

---

## ❗ Importante sobre Vite

⚠️ **Variáveis SEM o prefixo `VITE_` NÃO funcionam no build do Vite!**

### Por quê?
- Vite expõe apenas variáveis com prefixo `VITE_` para o código do navegador
- Variáveis sem `VITE_` ficam APENAS no servidor (build time)
- Não são acessíveis via `import.meta.env` no browser

### Solução:
**Sempre use `VITE_` na frente**, mesmo que a integração tenha criado sem:

```
SUPABASE_URL → ❌ Não funciona no browser
VITE_SUPABASE_URL → ✅ Funciona!

SUPABASE_ANON_KEY → ❌ Não funciona no browser
VITE_SUPABASE_ANON_KEY → ✅ Funciona!
```

---

## 📋 Checklist Final

- [ ] **1. Verificar variáveis criadas** (Netlify → Environment variables)
- [ ] **2. Se SUPABASE_* foi criado**: Criar versões VITE_SUPABASE_* também
- [ ] **3. Mínimo necessário**:
  - `VITE_SUPABASE_PROJECT_ID` 
  - `VITE_SUPABASE_ANON_KEY`
- [ ] **4. Opcional mas recomendado**:
  - `VITE_SUPABASE_URL`
- [ ] **5. Trigger novo deploy**
- [ ] **6. Testar** no console do navegador
- [ ] **7. Acessar** /admin.html

---

## 🎯 Solução Mais Rápida

**Cole isso no Netlify Environment Variables:**

```bash
# Copie do Supabase e cole aqui:

VITE_SUPABASE_PROJECT_ID=seu-project-id-aqui
VITE_SUPABASE_ANON_KEY=eyJhbG...sua-key-completa...
VITE_SUPABASE_URL=https://seu-project-id.supabase.co
```

**Onde encontrar:**
- Supabase → Settings → API
- Project URL = `VITE_SUPABASE_URL`
- anon/public key = `VITE_SUPABASE_ANON_KEY`
- Project ID (da URL ou Reference ID) = `VITE_SUPABASE_PROJECT_ID`

**Salve → Trigger deploy → Pronto! ✅**

---

## 💡 Dica Pro

Para não precisar adicionar manualmente toda vez:

1. Use a integração Netlify + Supabase (cria `SUPABASE_*`)
2. Depois, **adicione as versões `VITE_`** manualmente
3. Assim você tem:
   - ✅ Sincronização automática (integração)
   - ✅ Variáveis acessíveis no browser (VITE_)

Ou simplesmente:

**Esqueça a integração e configure tudo manual com `VITE_` que funciona 100%!** 🎯
