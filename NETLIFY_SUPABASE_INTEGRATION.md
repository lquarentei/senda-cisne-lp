# 🚀 Integração Netlify + Supabase (RECOMENDADO)

## ⚡ Método Mais Fácil - Extensão Oficial

O Netlify tem uma **integração nativa com Supabase** que configura tudo automaticamente!

---

## 🎯 Opção 1: Integração Automática (RECOMENDADO)

### 1. Instale a Extensão Supabase

**Link direto:** https://app.netlify.com/extensions/supabase

**Ou pelo dashboard:**
1. Acesse seu site no Netlify
2. Vá em: **Integrations** → **Add an integration**
3. Busque por "Supabase"
4. Clique em **"Add integration"**

---

### 2. Conecte seu Projeto Supabase

A extensão vai pedir:

1. **Login no Supabase**
   - Faça login com sua conta Supabase
   
2. **Selecione o projeto**
   - Escolha o projeto "Senda do Cisne" na lista
   
3. **Autorize a conexão**
   - Permita que o Netlify acesse as configurações

---

### 3. Configuração Automática ✨

A extensão vai configurar automaticamente:

✅ `VITE_SUPABASE_PROJECT_ID`  
✅ `VITE_SUPABASE_ANON_KEY`  
✅ `VITE_SUPABASE_URL`  

**Você não precisa fazer NADA!** 🎉

---

### 4. Deploy Automático

Após a integração:
- O Netlify vai fazer um novo deploy automaticamente
- Todas as variáveis estarão configuradas
- O site e admin estarão funcionando!

---

## 📝 Opção 2: Configuração Manual

Se preferir NÃO usar a extensão, siga o método manual:

### No Netlify:
1. `https://app.netlify.com/sites/[seu-site]/settings/env`
2. Adicione manualmente:
   ```
   VITE_SUPABASE_PROJECT_ID=seu-project-id
   VITE_SUPABASE_ANON_KEY=sua-anon-key
   ```

### Onde encontrar os valores:
- Supabase → Settings → API
- Project ID: na URL ou em "Reference ID"
- Anon Key: em "Project API keys" → copie `anon` `public`

📖 Ver guia detalhado: [NETLIFY_ENV_VARS.md](./NETLIFY_ENV_VARS.md)

---

## 🔍 Comparação dos Métodos

| Aspecto | Integração Automática | Configuração Manual |
|---------|----------------------|---------------------|
| **Tempo** | 2 minutos | 5 minutos |
| **Dificuldade** | ⭐ Muito Fácil | ⭐⭐ Fácil |
| **Erros** | Quase zero | Possíveis typos |
| **Sincronização** | Automática | Manual |
| **Recomendado** | ✅ SIM | Para casos específicos |

---

## ✅ Verificar se Funcionou

### 1. Acesse seu site
```
https://seu-site.netlify.app/admin.html
```

### 2. Verifique no console do navegador (F12)
```javascript
// Cole no console:
console.log({
  projectId: import.meta.env.VITE_SUPABASE_PROJECT_ID,
  hasAnonKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY
});
```

**Esperado:**
```javascript
{
  projectId: "abcdefgh123456",
  hasAnonKey: true
}
```

Se aparecer isso, está funcionando! ✨

---

## 🎁 Benefícios da Integração

### ✅ Automação Total
- Variáveis configuradas automaticamente
- Sem risco de erros de digitação
- Deploy automático após integração

### ✅ Sincronização
- Se mudar as keys no Supabase, pode re-sincronizar
- Não precisa copiar/colar manualmente

### ✅ Segurança
- Conexão OAuth segura
- Tokens gerenciados automaticamente

### ✅ Monitoramento
- Ver status da integração no dashboard
- Logs e alertas centralizados

---

## 🔧 Configurar a Integração (Passo a Passo)

### **Passo 1: Acesse a página da extensão**
```
https://app.netlify.com/extensions/supabase
```

### **Passo 2: Clique em "Add integration"**
![Botão verde no canto superior direito]

### **Passo 3: Selecione o site**
- Escolha o site "Senda do Cisne" na lista
- Clique "Continue"

### **Passo 4: Login no Supabase**
- Você será redirecionado para Supabase
- Faça login se necessário
- Autorize o Netlify

### **Passo 5: Escolha o projeto**
- Lista dos seus projetos Supabase aparecerá
- Selecione o projeto correto
- Clique "Integrate"

### **Passo 6: Aguarde**
- Netlify configura as variáveis (5-10 segundos)
- Deploy automático inicia
- Pronto! ✅

---

## ❌ Troubleshooting

### Integração não aparece

**Possível causa**: Extensão não habilitada no seu time

**Solução**:
1. Vá em: Team settings → Integrations
2. Verifique se Supabase está disponível
3. Se não estiver, use o método manual

---

### Deploy falhou após integração

**Possível causa**: Conflito com variáveis existentes

**Solução**:
1. Vá em: Site settings → Environment variables
2. Delete variáveis antigas do Supabase (se existirem)
3. Trigger novo deploy

---

### Variáveis não foram criadas

**Sintomas**: Admin mostra "Configuração Pendente"

**Checklist**:
1. ✅ Integração foi completada?
2. ✅ Deploy terminou sem erros?
3. ✅ Limpou cache do navegador?

**Solução**:
1. Desconecte a integração
2. Limpe todas as variáveis de ambiente
3. Reconecte a integração
4. Aguarde novo deploy

---

## 🎯 Próximos Passos

Depois da integração configurada:

### 1. Configure o Supabase Backend
```sql
-- Execute no Supabase SQL Editor
-- Arquivo: ADMIN_SCHEMA.sql
```

### 2. Crie Usuário Admin
```
Supabase → Authentication → Users → Add user
```

### 3. Autorize o Email
```typescript
// Arquivo: /supabase/functions/server/admin-config.tsx
export const ADMIN_EMAILS = ['seu@email.com'];
```

### 4. Deploy das Edge Functions
```bash
supabase login
supabase link --project-ref seu-project-id
supabase functions deploy make-server-a977770f
```

📖 Ver guia completo: [DEPLOY_NETLIFY.md](./DEPLOY_NETLIFY.md)

---

## 💡 Dicas Pro

### Múltiplos Ambientes

Se você tiver branches separadas (staging/production):

1. Configure a integração para cada branch
2. Supabase pode ter projetos diferentes por ambiente
3. Variáveis são isoladas automaticamente

### Re-sincronização

Se precisar atualizar as keys:

1. Vá em: Integrations → Supabase
2. Clique "Re-sync" ou "Update"
3. Novo deploy automático

### Desconectar

Para remover a integração:

1. Integrations → Supabase → Settings
2. "Remove integration"
3. Variáveis são mantidas (delete manualmente se quiser)

---

## 🎉 Pronto para Deploy!

Com a integração configurada:

✅ **Landing page funcionando**  
✅ **Admin panel conectado**  
✅ **Variáveis sincronizadas**  
✅ **Deploy automático**  

**Tempo total**: ~3 minutos  
**Dificuldade**: ⭐ (Muito Fácil)

---

## 📞 Links Úteis

- **Extensão Supabase**: https://app.netlify.com/extensions/supabase
- **Docs Netlify**: https://docs.netlify.com/integrations/supabase/
- **Docs Supabase**: https://supabase.com/docs/guides/integrations/netlify
- **Deploy completo**: [DEPLOY_NETLIFY.md](./DEPLOY_NETLIFY.md)

---

**Use a integração automática sempre que possível - é o método mais confiável! 🚀**
