import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Star, ChevronDown, MessageCircle, ArrowRight, Heart, Sparkles, User, Users, ShieldCheck, PlayCircle, BookOpen, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Assuming standard shadcn button is available or I'll use standard Tailwind
import swanImage from 'figma:asset/fc99b7de0388ea0351ae08011c002bcdee83f137.png';
import mirrorImage from 'figma:asset/ae3f040a683fbc4062d462ede696fcf55472e74f.png';
import pattyImage from 'figma:asset/3d528e21c46966ccec6eeda45acae59d421344b7.png';
import logoImage from 'figma:asset/44ba26d1252a7c30699f52f2a7a8426bafb93659.png';

// Since I cannot be 100% sure shadcn components are fully set up with the right exports in the provided path without checking, 
// I will build the page using standard Tailwind and Motion for maximum reliability, using the ShadCN components if I see them in the file list.
// The file list showed @/components/ui/accordion.tsx exists.

import { Button as ShadButton } from "./ui/button";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export const SendaDoCisneLP = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-neutral-800 font-sans selection:bg-rose-100">
      {/* HEADER WITH LOGO */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#1a1512]/95 backdrop-blur-sm border-b border-white/10"
      >
        <div className="container mx-auto px-6 py-4 flex justify-center items-center">
          <img 
            src={logoImage} 
            alt="Patty Domingues" 
            className="h-8 md:h-10 w-auto"
          />
        </div>
      </motion.header>

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={swanImage} 
            alt="Senda do Cisne" 
            className="w-full h-full object-cover object-top opacity-90 brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1512] via-transparent to-transparent/30" />
        </div>

        <div className="relative z-10 container mx-auto px-6 pt-32 text-center text-white max-w-4xl">{/* Added pt-32 for header spacing */}
          <FadeIn>
            <span className="inline-block mb-4 px-3 py-1 border border-white/30 rounded-full text-xs tracking-[0.2em] uppercase font-light backdrop-blur-sm">
              Mentoria de Imagem & Essência
            </span>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium leading-tight mb-6">
              Não é sobre parecer outra.<br />
              <span className="italic font-light text-rose-100">É sobre finalmente ser você</span> — por inteiro.
            </h1>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-lg md:text-xl font-light text-neutral-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              Uma mentoria guiada para mulheres que desejam clareza, confiança e uma beleza impossível de ser ignorada.
            </p>
          </FadeIn>

          <FadeIn delay={0.6} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <ShadButton 
              size="lg" 
              className="bg-rose-100 text-neutral-900 hover:bg-white border-none rounded-none px-8 py-6 text-base tracking-wide transition-all duration-300 min-w-[280px]"
            >
              Quero entrar na Senda do Cisne
            </ShadButton>
            <ShadButton 
              variant="outline" 
              size="lg" 
              className="bg-transparent border-white text-white hover:bg-white/10 hover:text-white rounded-none px-8 py-6 text-base tracking-wide min-w-[280px]"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Falar com a equipe no WhatsApp
            </ShadButton>
          </FadeIn>

          <FadeIn delay={0.8} className="mt-12 text-sm text-neutral-400 font-light tracking-wider uppercase opacity-80">
            Uma jornada profunda conduzida por Patty Domingues
          </FadeIn>
        </div>
      </section>

      {/* IDENTIFICATION BLOCK */}
      <section className="py-24 px-6 bg-white relative">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-16 items-center">
          <FadeIn className="order-2 md:order-1 relative">
             <div className="aspect-[3/4] overflow-hidden relative">
                <img 
                  src={mirrorImage} 
                  alt="Reflexo no espelho" 
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 border border-neutral-100 m-4 pointer-events-none" />
             </div>
          </FadeIn>

          <div className="order-1 md:order-2">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-serif text-neutral-900 mb-8">
                Talvez você já tenha sentido isso…
              </h2>
            </FadeIn>
            
            <div className="space-y-6">
              {[
                "Ter um armário cheio e, ainda assim, sentir que nada te representa.",
                "Comprar roupas, errar, se frustrar — e começar a se culpar.",
                "Sentir que sua imagem não acompanha quem você se tornou.",
                "Saber que é bonita, mas não conseguir expressar isso no espelho."
              ].map((item, idx) => (
                <FadeIn delay={idx * 0.1} key={idx} className="flex items-start gap-4">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-300 shrink-0" />
                  <p className="text-lg text-neutral-600 font-light leading-relaxed">{item}</p>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.4} className="mt-12 p-8 bg-[#FDFBF7] border-l-2 border-rose-300">
              <p className="text-xl font-serif italic text-neutral-800">
                "A Senda do Cisne não começa no vestir. <br/>
                Ela começa no reconhecimento."
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ABOUT PATTY */}
      <section className="py-24 px-6 bg-[#1a1512] text-neutral-200 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-rose-900/10 via-transparent to-transparent opacity-50"></div>
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-16 items-center relative z-10">
          <FadeIn className="relative order-1 md:order-1">
             <div className="absolute -inset-4 bg-gradient-to-tr from-rose-500/10 to-transparent rounded-[2rem] blur-xl opacity-50"></div>
             <div className="relative rounded-[2px] overflow-hidden border border-white/5 shadow-2xl bg-neutral-800/50">
                <img 
                  src={pattyImage} 
                  alt="Patty Domingues" 
                  className="w-full h-auto object-cover opacity-95 hover:opacity-100 transition-opacity duration-700 hover:scale-105 transform" 
                />
             </div>
          </FadeIn>
          
          <div className="order-2 md:order-2 text-left">
            <FadeIn delay={0.2}>
              <span className="inline-block mb-6 px-3 py-1 border border-rose-500/30 rounded-full text-xs tracking-[0.2em] uppercase font-light text-rose-300">
                Sua Mentora
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">
                Eu não sou apenas uma consultora de imagem.
              </h2>
            </FadeIn>

            <FadeIn delay={0.3}>
              <h3 className="text-xl md:text-2xl text-rose-200 mb-8 font-light italic">
                Sou uma guia no processo de autodescoberta da beleza.
              </h3>
              
              <div className="space-y-6 text-neutral-400 text-lg leading-relaxed font-light">
                <p>
                  Ao longo dos últimos anos, acompanhei mais de <span className="text-white font-medium">3 mil mulheres</span> em jornadas profundas de reconexão com sua identidade, unindo o Sistema Kibbe, as 7 Essências de Estilo e metodologias autorais desenvolvidas a partir da prática real.
                </p>
                <p>
                  Meu trabalho não é sobre regras rígidas ou transformações superficiais. É sobre olhar para você e traduzir sua alma em imagem.
                </p>
                <div className="pl-6 border-l border-rose-500/30 py-2 my-8">
                  <p className="text-white font-serif text-xl italic">
                    "Ao final da Senda, você não terá apenas um estilo definido.
                    Você terá clareza, confiança e uma beleza que não precisa se provar — apenas existir."
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* WHAT IS SENDA DO CISNE */}
      <section className="py-24 px-6 bg-[#FDFBF7] text-center">
        <div className="container mx-auto max-w-3xl">
          <FadeIn>
            <div className="mb-6 mx-auto w-px h-16 bg-gradient-to-b from-transparent via-rose-300 to-transparent" />
            <h2 className="text-3xl md:text-5xl font-serif text-neutral-900 mb-8">
              O que é a Senda do Cisne?
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">
              A Senda do Cisne é um caminho de transformação delicado, profundo e intencional.
              Cada etapa revela uma nova camada da sua beleza verdadeira.
            </p>
            <p className="text-xl text-neutral-800 font-medium mb-12">
              Aqui, você não aprende a se encaixar. <br/>
              Você aprende a se reconhecer.
            </p>
          </FadeIn>

          <FadeIn delay={0.4} className="bg-white p-10 shadow-sm border border-neutral-100 mx-auto max-w-2xl">
             <Sparkles className="w-8 h-8 text-rose-300 mx-auto mb-4" />
             <p className="text-lg font-serif italic text-neutral-700">
               "O cisne representa a beleza revelada, a autenticidade e o poder silencioso de quem sabe quem é."
             </p>
          </FadeIn>
        </div>
      </section>

      {/* PROGRAM STRUCTURE & PILLARS */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 max-w-3xl mx-auto">
             <FadeIn>
               <h2 className="text-3xl md:text-4xl font-serif text-neutral-900 mb-6">
                 Estrutura do Programa
               </h2>
               <p className="text-lg text-neutral-600 mb-8">
                 Um programa estruturado em 12 encontros ao vivo, guiados por pilares que sustentam uma transformação real — consistente, aplicada e duradoura.
               </p>
               <ShadButton className="bg-neutral-900 text-white hover:bg-neutral-800 rounded-none px-8 py-3">
                 Quero viver essa jornada
               </ShadButton>
             </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Diagnóstico",
                desc: "Aqui você para de se comparar e começa a se reconhecer. Seu corpo deixa de ser dúvida e passa a ser direção. Você compreende sua identidade corporal, sua essência e suas cores com clareza e profundidade.",
                icon: <User className="w-6 h-6" />
              },
              {
                title: "Reconhecimento",
                desc: "Você passa a se enxergar com novos olhos. Recebe dossiês visuais personalizados, participa de aulas ao vivo e acessa materiais que organizam sua identidade com segurança.",
                icon: <BookOpen className="w-6 h-6" />
              },
              {
                title: "Vestir com Confiança",
                desc: "Vestir deixa de ser tentativa e erro. Você entende suas peças-chave, aprende a usar suas essências e passa a se vestir com intenção, coerência e verdade.",
                icon: <Star className="w-6 h-6" />
              },
              {
                title: "Laboratórios",
                desc: "Aqui a transformação ganha corpo. Você cria murais, reconhece peças, monta looks e aprende a aplicar tudo na vida real, com acompanhamento próximo.",
                icon: <Sparkles className="w-6 h-6" />
              }
            ].map((pillar, idx) => (
              <FadeIn delay={idx * 0.1} key={idx} className="h-full">
                <div className="h-full bg-[#FDFBF7] p-8 border border-neutral-100 hover:border-rose-200 transition-colors duration-300 flex flex-col">
                  <div className="w-12 h-12 bg-white flex items-center justify-center border border-neutral-100 mb-6 text-rose-400">
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-serif text-neutral-900 mb-2">Pilar {String(idx + 1).padStart(2, '0')}</h3>
                  <h4 className="text-lg font-medium text-neutral-800 mb-4">{pillar.title}</h4>
                  <p className="text-sm text-neutral-600 leading-relaxed flex-grow">
                    {pillar.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENTIATOR */}
      <section className="py-24 px-6 bg-[#1a1512] text-neutral-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800/20 via-transparent to-transparent opacity-30"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-8">
              Eu não vou te observar de longe.
            </h2>
            <p className="text-xl md:text-2xl text-rose-100 font-light mb-12">
              Eu vou analisar todos os seus looks junto com você.
            </p>
            <div className="h-px w-24 bg-rose-400/30 mx-auto mb-12"></div>
            <p className="text-lg text-neutral-400 uppercase tracking-widest">
              Essa jornada é acompanhada, guiada e personalizada — do início ao fim.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* COMMUNITY & SUPPORT */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-5xl grid md:grid-cols-2 gap-16">
          <FadeIn>
            <div className="bg-[#FDFBF7] p-10 h-full border-t-4 border-rose-300">
              <div className="flex items-center gap-4 mb-6">
                <Users className="w-8 h-8 text-rose-400" />
                <h3 className="text-2xl font-serif text-neutral-900">Comunidade</h3>
              </div>
              <p className="text-lg text-neutral-600 mb-6">
                Você fará parte do <strong>Jardim das Cisnes</strong> — uma comunidade feminina, segura e acolhedora, onde trocas sinceras fortalecem a caminhada.
              </p>
              <p className="text-neutral-900 font-medium italic">Você não caminha sozinha.</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-[#FDFBF7] p-10 h-full border-t-4 border-neutral-300">
              <div className="flex items-center gap-4 mb-6">
                <MessageCircle className="w-8 h-8 text-neutral-400" />
                <h3 className="text-2xl font-serif text-neutral-900">Suporte</h3>
              </div>
              <p className="text-lg text-neutral-600 mb-6">
                Você terá suporte individual no WhatsApp comigo e com minha equipe para dúvidas práticas, técnicas e de percurso.
              </p>
              <p className="text-neutral-900 font-medium italic">Você será acompanhada em cada etapa da sua Senda.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* IMPLEMENTATION CALL */}
      <section className="py-20 px-6 bg-rose-50/50">
        <div className="container mx-auto max-w-4xl">
           <FadeIn className="flex flex-col md:flex-row items-center gap-10">
             <div className="flex-1">
               <span className="text-rose-400 text-sm tracking-wider uppercase font-semibold mb-2 block">Exclusividade</span>
               <h2 className="text-3xl font-serif text-neutral-900 mb-6">Call Individual de Implementação</h2>
               <p className="text-lg text-neutral-600 mb-6">
                 Ao final da jornada, realizaremos uma call individual para validar sua transformação na prática.
               </p>
               <div className="space-y-3">
                 {[
                   "Revisar as peças que você já possui",
                   "Validar seus looks montados",
                   "Organizar seu lookbook",
                   "Criar um checklist claro para suas próximas compras"
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3">
                     <Check className="w-5 h-5 text-rose-400" />
                     <span className="text-neutral-700">{item}</span>
                   </div>
                 ))}
               </div>
             </div>
             <div className="flex-1 flex justify-center">
                <div className="relative w-64 h-64 bg-white rounded-full flex items-center justify-center border border-rose-100 shadow-xl p-8">
                   <div className="text-center">
                     <div className="text-5xl font-serif text-rose-300 mb-2">1:1</div>
                     <div className="text-sm text-neutral-500 uppercase tracking-wide">Mentoria Individual</div>
                   </div>
                </div>
             </div>
           </FadeIn>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl font-serif text-neutral-900">O que você vai receber</h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
             <FadeIn className="space-y-2">
               {[
                 { text: "12 encontros ao vivo de mentoria", icon: <Calendar className="w-5 h-5" /> },
                 { text: "12 meses de acesso à plataforma", icon: <Clock className="w-5 h-5" /> },
                 { text: "Diagnóstico individual (Kibbe + Essências + Cores)", icon: <User className="w-5 h-5" /> },
                 { text: "Dossiês visuais personalizados", icon: <BookOpen className="w-5 h-5" /> },
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-4 p-4 border-b border-neutral-100">
                   <div className="text-rose-400">{item.icon}</div>
                   <span className="text-lg text-neutral-800">{item.text}</span>
                 </div>
               ))}
             </FadeIn>
             <FadeIn delay={0.2} className="space-y-2">
               {[
                 { text: "Aulas ao vivo e gravadas", icon: <PlayCircle className="w-5 h-5" /> },
                 { text: "Comunidade exclusiva no WhatsApp", icon: <Users className="w-5 h-5" /> },
                 { text: "1 call individual de implementação", icon: <Check className="w-5 h-5" /> },
                 { text: "Materiais de apoio em PDF", icon: <BookOpen className="w-5 h-5" /> },
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-4 p-4 border-b border-neutral-100">
                   <div className="text-rose-400">{item.icon}</div>
                   <span className="text-lg text-neutral-800">{item.text}</span>
                 </div>
               ))}
             </FadeIn>
          </div>
          
          <FadeIn delay={0.4} className="mt-12 bg-[#FDFBF7] p-8 rounded-lg border border-neutral-100 flex flex-col md:flex-row items-center justify-between gap-6">
             <div>
               <span className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-2 block">Bônus Exclusivos</span>
               <h3 className="text-xl font-serif text-neutral-900">Ebook: 16 itens essenciais do seu tipo Kibbe</h3>
               <p className="text-neutral-600 mt-1">Guia completo "Como vestir meu corpo"</p>
             </div>
             <div className="h-12 w-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-500">
               <Star className="w-6 h-6 fill-current" />
             </div>
          </FadeIn>
        </div>
      </section>

      {/* GUARANTEE & INVESTMENT */}
      <section className="py-24 px-6 bg-[#1a1512] text-white">
        <div className="container mx-auto max-w-5xl">
          <FadeIn className="text-center mb-16">
            <span className="inline-block mb-4 px-3 py-1 border border-rose-500/30 rounded-full text-xs tracking-[0.2em] uppercase font-light text-rose-300">
              Investimento
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">
              Isso não é um gasto.<br/>
              <span className="text-rose-200 font-light italic">É um investimento em quem você está se tornando.</span>
            </h2>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              Enquanto uma viagem acaba, uma bolsa envelhece e tendências passam — sua clareza, confiança e autenticidade permanecem para sempre.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <FadeIn delay={0.1}>
              <div className="bg-white/5 border border-white/10 p-8 text-center h-full backdrop-blur-sm hover:border-rose-500/30 transition-all duration-300">
                <div className="text-4xl font-serif text-rose-300 mb-4">12x</div>
                <p className="text-neutral-300 text-lg mb-2">Parcelas sem juros</p>
                <p className="text-neutral-500 text-sm">Investimento acessível e planejado</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-gradient-to-br from-rose-900/20 to-transparent border-2 border-rose-500/40 p-8 text-center h-full backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-rose-400 text-neutral-900 text-xs px-3 py-1 font-semibold uppercase tracking-wider">
                  Exclusivo
                </div>
                <div className="text-4xl font-serif text-white mb-4">12</div>
                <p className="text-white text-lg mb-2 font-medium">Meses de transformação</p>
                <p className="text-rose-200 text-sm">Acompanhamento completo e personalizado</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="bg-white/5 border border-white/10 p-8 text-center h-full backdrop-blur-sm hover:border-rose-500/30 transition-all duration-300">
                <div className="text-4xl font-serif text-rose-300 mb-4">∞</div>
                <p className="text-neutral-300 text-lg mb-2">Resultados duradouros</p>
                <p className="text-neutral-500 text-sm">Uma transformação que não expira</p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.4}>
            <div className="bg-white/5 border border-white/10 p-10 rounded-lg backdrop-blur-sm max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 text-left">
                  <h3 className="text-2xl font-serif text-white mb-4">
                    Valor do investimento completo
                  </h3>
                  <p className="text-neutral-400 leading-relaxed mb-4">
                    Inclui tudo: 12 encontros ao vivo, diagnóstico personalizado, dossiês visuais, comunidade exclusiva, call individual e acesso de 12 meses à plataforma.
                  </p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-lg text-neutral-500">12x de</span>
                    <span className="text-4xl font-serif text-rose-200">R$ ***</span>
                    <span className="text-neutral-500">sem juros</span>
                  </div>
                  <p className="text-sm text-neutral-500 mt-2">ou à vista com condições especiais</p>
                </div>
                <div className="flex-shrink-0">
                  <ShadButton 
                    size="lg" 
                    className="bg-rose-100 text-neutral-900 hover:bg-white border-none rounded-none px-10 py-6 text-lg tracking-wide transition-all duration-300 min-w-[240px]"
                  >
                    Ver valores completos
                  </ShadButton>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.5} className="text-center mt-12">
            <div className="inline-flex items-center gap-2 text-rose-300 bg-rose-950/30 px-6 py-3 rounded-full border border-rose-500/20">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">Vagas limitadas por turma para garantir acompanhamento personalizado</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 bg-[#FDFBF7] relative">
        <div className="container mx-auto max-w-4xl text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-serif text-neutral-900 mb-8">
              Não é sobre mudar quem você é.<br/>
              <span className="italic text-neutral-500">É sobre finalmente honrar quem você sempre foi.</span>
            </h2>
            <p className="text-lg text-neutral-600 mb-10">
              Sua próxima etapa não é decidir sozinha.<br/>
              É conversar e sentir se essa Senda é para você.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <ShadButton 
                className="bg-neutral-900 text-white hover:bg-neutral-700 rounded-none px-8 py-6 text-base w-full sm:w-auto"
               >
                Entrar na Senda do Cisne
               </ShadButton>
               <ShadButton 
                variant="outline" 
                className="bg-white border-neutral-300 text-neutral-900 hover:bg-neutral-50 rounded-none px-8 py-6 text-base w-full sm:w-auto"
               >
                <MessageCircle className="w-4 h-4 mr-2" />
                Falar com a equipe
               </ShadButton>
            </div>
          </FadeIn>
        </div>
        <div className="text-center mt-20 text-neutral-400 text-sm">
          &copy; {new Date().getFullYear()} Patty Domingues. Todos os direitos reservados.
        </div>
      </section>
    </div>
  );
};