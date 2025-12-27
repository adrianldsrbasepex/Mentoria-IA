
import React, { useState, useEffect } from 'react';
import { AppStep } from '../types';
import { 
  Brain, Target, Zap, ShieldCheck, Clock, 
  CheckCircle, ArrowRight, Book, Sparkles
} from 'lucide-react';

interface ContentProps {
  onStart: () => void;
  onNavigate: (step: AppStep) => void;
}

const FloatingBackground = () => {
  const [items, setItems] = useState<{ id: number; x: number; y: number; vx: number; vy: number; rot: number; vrot: number }[]>([]);

  useEffect(() => {
    const numItems = 8;
    const initialItems = Array.from({ length: numItems }).map((_, i) => ({
      id: i,
      x: Math.random() * (window.innerWidth - 60),
      y: Math.random() * (window.innerHeight - 60),
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      rot: Math.random() * 360,
      vrot: (Math.random() - 0.5) * 0.4,
    }));
    setItems(initialItems);

    let animationFrameId: number;
    const update = () => {
      setItems(prev => prev.map(item => {
        let newX = item.x + item.vx;
        let newY = item.y + item.vy;
        let newVx = item.vx;
        let newVy = item.vy;

        // Efeito de quique nas bordas
        if (newX <= 0 || newX >= window.innerWidth - 60) newVx *= -1;
        if (newY <= 0 || newY >= window.innerHeight - 60) newVy *= -1;

        return { ...item, x: newX, y: newY, vx: newVx, vy: newVy, rot: item.rot + item.vrot };
      }));
      animationFrameId = requestAnimationFrame(update);
    };
    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-[0.05]">
      {items.map(item => (
        <div key={item.id} className="absolute text-nubank" style={{ transform: `translate(${item.x}px, ${item.y}px) rotate(${item.rot}deg)` }}>
          <Book size={64} />
        </div>
      ))}
    </div>
  );
};

const Advantages: React.FC<ContentProps> = ({ onStart, onNavigate }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      <FloatingBackground />

      {/* Menu Superior Sticky e Glassmorphism */}
      <nav className="flex items-center justify-between px-6 lg:px-12 h-20 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate(AppStep.LANDING)}>
          <div className="w-10 h-10 bg-nubank rounded-xl flex items-center justify-center shadow-lg shadow-nubank/20">
            <span className="text-white font-bold">IA</span>
          </div>
          <span className="text-xl font-bold text-nubank tracking-tight">Mentoria IA</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-bold text-gray-500">
          <button className="text-nubank border-b-2 border-nubank pb-1">Vantagens</button>
          <button onClick={() => onNavigate(AppStep.HOW_IT_WORKS)} className="hover:text-nubank transition-colors">Como funciona</button>
          <button onClick={() => onNavigate(AppStep.PRICING)} className="hover:text-nubank transition-colors">Preços</button>
        </div>
        <button onClick={onStart} className="bg-nubank text-white px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-md">
          Logar na Mentoria IA
        </button>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-16 lg:py-24 space-y-32">
        <header className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-nubank/5 text-nubank rounded-full text-xs font-black uppercase tracking-widest mb-4 animate-bounce-slow">
            <Sparkles size={14} /> Diferenciais de Elite
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-none tracking-tight">
            Tecnologia que <br/><span className="text-nubank">acelera sua mente.</span>
          </h1>
          <p className="text-xl text-gray-500 font-medium">Saia do amadorismo. Utilize a arquitetura de aprendizado mais avançada do mercado.</p>
        </header>

        {/* Grid de Benefícios Visualmente Atraente */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: <Brain size={32} />, 
              title: "Carga Cognitiva Otimizada", 
              text: "Distribuímos o conteúdo baseado na sua curva de esquecimento, garantindo retenção máxima sem exaustão."
            },
            { 
              icon: <Target size={32} />, 
              title: "Foco de Alta Precisão", 
              text: "Nossa IA cruza editais com estatísticas de provas anteriores para focar no que realmente gera pontos."
            },
            { 
              icon: <Zap size={32} />, 
              title: "Adaptação em Tempo Real", 
              text: "A vida mudou? O cronograma muda junto. Ajuste automático para imprevistos sem perder a meta final."
            }
          ].map((benefit, i) => (
            <div key={i} className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-nubank mb-8 group-hover:bg-nubank group-hover:text-white transition-colors shadow-inner">
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">{benefit.title}</h3>
              <p className="text-gray-500 leading-relaxed font-medium">{benefit.text}</p>
            </div>
          ))}
        </div>

        {/* Seção Comparativa Premium - Modo Escuro para Contraste */}
        <section className="bg-gray-900 rounded-[60px] p-10 lg:p-20 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-nubank/20 blur-[120px] rounded-full"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <h2 className="text-4xl lg:text-6xl font-black leading-tight">Por que não somos <br/><span className="text-nubank">apenas uma planilha?</span></h2>
              <div className="space-y-8">
                {[
                  { title: "Segurança de Nível Bancário", text: "Privacidade total dos seus dados de estudo e evolução." },
                  { title: "Pedagogia Ativa", text: "Metodologia baseada em Prática Deliberada e Revisão Espaçada." },
                  { title: "Dashboard Proprietário", text: "Interface limpa, sem distrações, focada em uma tarefa por vez." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group cursor-default">
                    <CheckCircle className="text-nubank shrink-0 mt-1 transition-transform group-hover:scale-125" size={24} />
                    <div>
                      <h4 className="font-bold text-xl">{item.title}</h4>
                      <p className="text-gray-400 text-base">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[48px] border border-white/10 space-y-8 shadow-2xl">
              <div className="flex items-center gap-5">
                <div className="p-4 bg-nubank/20 rounded-3xl text-nubank shadow-lg shadow-nubank/10">
                  <ShieldCheck size={44} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold">Certificação IA 3.0</h4>
                  <p className="text-nubank font-bold text-sm tracking-widest uppercase">Padrão Ouro de Mentoria</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">A Mentoria IA utiliza o motor Gemini 3.0 para processar linguagens naturais de editais complexos, transformando burocracia em planos de ação executáveis.</p>
              <div className="pt-6 flex items-center gap-4 text-sm font-black uppercase tracking-widest text-nubank/80">
                <Clock size={20} /> Mentor disponível 24h por dia
              </div>
            </div>
          </div>
        </section>

        <section className="text-center py-20 space-y-10">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Preparado para mudar seu patamar de estudo?</h2>
          <button 
            onClick={() => onNavigate(AppStep.PRICING)} 
            className="bg-nubank text-white px-12 py-6 rounded-full text-xl font-bold hover:scale-105 transition-all shadow-2xl shadow-nubank/40 flex items-center gap-3 mx-auto"
          >
            Ver Planos e Preços <ArrowRight size={24} />
          </button>
        </section>
      </main>

      <footer className="py-12 border-t border-gray-100 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest z-10 bg-white">
        <p>© 2024 Mentoria IA Soluções Educacionais Inteligentes.</p>
      </footer>
    </div>
  );
};

export default Advantages;
