// ========================================
// 🎨 CONFIGURAÇÃO DA LANDING PAGE
// ========================================
// Este arquivo centraliza TODOS os textos, links e configurações da página
// Edite aqui para alterar qualquer conteúdo!

export const landingPageConfig = {
  // ========================================
  // 🔗 LINKS DOS BOTÕES (CTAs)
  // ========================================
  // Cole aqui os links do WhatsApp, formulário, checkout, etc.
  
  links: {
    // Link principal de checkout/pagamento
    checkout: 'https://pay.hotmart.com/SEU-PRODUTO-AQUI',
    
    // Link do WhatsApp para contato
    whatsapp: 'https://wa.me/5511999999999?text=Olá,%20quero%20saber%20mais%20sobre%20a%20Senda%20do%20Cisne',
    
    // Link do Instagram
    instagram: 'https://instagram.com/pattydomingues',
    
    // Outros links (se necessário)
    formulario: 'https://forms.gle/SEU-FORMULARIO',
  },

  // ========================================
  // 💰 PREÇO E INVESTIMENTO
  // ========================================
  
  preco: {
    valorCheio: 'R$ 3.997',
    valorPromocional: 'R$ 1.997',
    parcelamento: '12x de R$ 197',
    mostrarPromocao: true, // true = mostra preço promocional
  },

  // ========================================
  // 👤 DADOS DE CONTATO
  // ========================================
  
  contato: {
    email: 'contato@pattydomingues.com',
    telefone: '(11) 99999-9999',
    instagram: '@pattydomingues',
  },

  // ========================================
  // ✨ TEXTOS PERSONALIZÁVEIS
  // ========================================
  // Se quiser mudar algum texto específico da página
  
  textos: {
    heroTitulo: 'Desperte a Mulher que Você Sempre Soube Ser',
    heroSubtitulo: 'Uma jornada de autoconhecimento através da imagem e estilo pessoal',
    ctaPrincipal: 'Quero Iniciar Minha Transformação',
    ctaSecundario: 'Falar com Patty no WhatsApp',
  },

  // ========================================
  // 🎁 BÔNUS E OFERTAS
  // ========================================
  
  bonus: [
    {
      titulo: 'Análise de Coloração Pessoal',
      descricao: 'Descubra sua paleta de cores ideal',
      valor: 'R$ 497',
    },
    {
      titulo: 'Guia de Montagem de Looks',
      descricao: 'PDF exclusivo com 50+ combinações',
      valor: 'R$ 197',
    },
    {
      titulo: 'Consultoria de Closet',
      descricao: '1 hora de sessão individual',
      valor: 'R$ 897',
    },
  ],

  // ========================================
  // ⏰ CONFIGURAÇÕES DE ESCASSEZ
  // ========================================
  
  escassez: {
    mostrarContador: true,
    dataLimite: '2026-02-01T23:59:59', // Formato: YYYY-MM-DDTHH:MM:SS
    vagasLimitadas: 30,
    mostrarVagas: true,
  },

  // ========================================
  // 📊 DEPOIMENTOS
  // ========================================
  // Adicione ou remova depoimentos aqui
  
  depoimentos: [
    {
      nome: 'Ana Paula Silva',
      foto: '/images/depoimentos/ana.jpg', // Coloque a foto em /public/images/depoimentos/
      texto: 'A Senda do Cisne mudou completamente como me vejo. Hoje me sinto confiante e alinhada com quem eu realmente sou.',
      cargo: 'Executiva, 42 anos',
    },
    {
      nome: 'Mariana Costa',
      foto: '/images/depoimentos/mariana.jpg',
      texto: 'Patty me ajudou a descobrir um estilo autêntico. Não é sobre moda, é sobre identidade.',
      cargo: 'Empreendedora, 38 anos',
    },
    {
      nome: 'Juliana Fernandes',
      foto: '/images/depoimentos/juliana.jpg',
      texto: 'Finalmente entendi que minha imagem é uma extensão de quem eu sou. Obrigada, Patty!',
      cargo: 'Arquiteta, 35 anos',
    },
  ],
};

// ========================================
// 🖼️ CONFIGURAÇÃO DE IMAGENS
// ========================================
// COMO TROCAR AS FOTOS:
// 
// 1. Coloque suas imagens na pasta /public/images/
// 2. Atualize os caminhos abaixo
// 3. Recomendado: use nomes descritivos (ex: hero-principal.jpg)
//
// DICAS:
// - Hero: 1920x1080px (landscape)
// - Patty: 800x800px (quadrada)
// - Depoimentos: 400x400px (quadradas)
// - Logo: 200x60px (horizontal) ou SVG
// ========================================

export const imagens = {
  // Logo do site
  logo: '/images/logo.png',
  favicon: '/images/favicon.png',
  
  // Imagem principal (Hero)
  heroPrincipal: '/images/hero-principal.jpg',
  
  // Foto da Patty
  pattyPerfil: '/images/patty-perfil.jpg',
  pattySecundaria: '/images/patty-secundaria.jpg',
  
  // Imagens de seções
  comunidade: '/images/comunidade.jpg',
  transformacao: '/images/transformacao.jpg',
  elegancia: '/images/elegancia.jpg',
  
  // Background patterns (opcional)
  bgPattern: '/images/bg-pattern.svg',
};

// ========================================
// 🎨 CORES E ESTILO
// ========================================
// Se quiser ajustar cores, edite aqui

export const cores = {
  primaria: '#C8A882', // Rose gold
  secundaria: '#FDFBF7', // Bege claro
  destaque: '#B8860B', // Dourado
  texto: '#2C2C2C', // Cinza escuro
};
