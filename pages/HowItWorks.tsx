
import React, { useState, useEffect } from 'react';
import { AppStep } from '../types';
import { 
  UserPlus, FileSearch, Lightbulb, RefreshCw, 
  ArrowRight, Book, CheckCircle2, ChevronRight, Zap
} from 'lucide-react';

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
      vrot: (Math.random() - 0.5) * 0.5,
    }));
    setItems(initialItems);

    let animationFrameId: number;
    const update = () => {
      setItems(prev => prev.map(item => {
        let newX = item.x + item.vx;
        let newY = item.y + item.vy;
        let newVx = item.vx;
        let newVy = item.vy;

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

const HowItWorks: React.FC<{ onStart: () => void; onNavigate: (step: AppStep) => void }> = ({ onStart, onNavigate }) => {
  const steps = [
    {
      id: "01",
      icon: <UserPlus size={40} />,
      title: "Mapeamento",
      text: "Definimos sua carga horária, dias de estudo e nível atual de conhecimento por disciplina.",
      detail: "Diagnóstico personalizado em 2 minutos."
    },
    {
      id: "02",
      icon: <FileSearch size={40} />,
      title: "Análise IA",
      text: "Nossa IA processa o edital bruto e identifica o 'Caminho Crítico' de aprovação.",
      detail: "Processamento ultra-rápido de dados."
    },
    {
      id: "03",
      icon: <Lightbulb size={40} />,
      title: "Plano de Ação",
      text: "Geramos uma agenda de missões diárias com metas claras de teoria e exercícios.",
      detail: "Ciclos de estudo inteligentes."
    },
    {
      id: "04",
      icon: <RefreshCw size={40} />,
      title: "Adaptação",
      text: "Caso sua rotina mude ou você falhe em uma meta, a IA recalcula todo o plano.",
      detail: "Flexibilidade total para sua rotina."
    }
  ];

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
          <button onClick={() => onNavigate(AppStep.ADVANTAGES)} className="hover:text-nubank transition-colors">Vantagens</button>
          <button className="text-nubank border-b-2 border-nubank pb-1">Como funciona</button>
          <button onClick={() => onNavigate(AppStep.PRICING)} className="hover:text-nubank transition-colors">Preços</button>
        </div>
        <button onClick={() => onNavigate(AppStep.LOGIN)} className="bg-nubank text-white px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-md">
          Logar na Mentoria IA
        </button>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-16 lg:py-24 space-y-32">
        <header className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-nubank/5 text-nubank rounded-full text-xs font-black uppercase tracking-widest mb-4">
            <Zap size={14} className="fill-nubank" /> Fluxo de Aprovação
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-none tracking-tight">
            Seu estudo em <br/><span className="text-nubank">piloto automático.</span>
          </h1>
          <p className="text-xl text-gray-500 font-medium">Esqueça as planilhas complexas. Deixe a IA cuidar da burocracia enquanto você foca no aprendizado.</p>
        </header>

        {/* Stepper Horizontal Progressivo */}
        <div className="space-y-16 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-8 relative">
          <div className="hidden lg:block absolute top-12 left-0 w-full h-[2px] bg-gray-100 -z-0"></div>
          
          {steps.map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-gray-100 flex items-center justify-center text-nubank mb-8 group-hover:border-nubank transition-all shadow-xl group-hover:shadow-nubank/20 group-hover:scale-110">
                <div className="bg-gray-50 p-4 rounded-full text-nubank transition-colors group-hover:bg-nubank group-hover:text-white">
                  {step.icon}
                </div>
              </div>
              <div className="space-y-4">
                <div className="text-xs font-black text-nubank uppercase tracking-[0.2em] bg-nubank/5 py-1 px-3 rounded-full inline-block">Passo {step.id}</div>
                <h3 className="text-2xl font-bold text-gray-900 leading-tight">{step.title}</h3>
                <p className="text-base text-gray-500 font-medium leading-relaxed">{step.text}</p>
                <div className="pt-2 px-4 py-1.5 bg-gray-50 rounded-xl text-[10px] font-bold text-gray-400 uppercase tracking-wider inline-block">
                  {step.detail}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Seção Showcase Visual do App */}
        <section className="bg-gray-50 rounded-[64px] p-10 lg:p-20 flex flex-col lg:flex-row items-center gap-16 shadow-inner border border-gray-100">
           <div className="lg:w-1/2 space-y-10">
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">Um Dashboard que <br/><span className="text-nubank">elimina a paralisia.</span></h2>
              <p className="text-gray-500 font-medium text-lg leading-relaxed">Nossa interface foi desenhada por psicólogos cognitivos. Ao logar, você vê apenas o que importa para as próximas 2 horas de estudo.</p>
              <div className="grid grid-cols-1 gap-5">
                {[
                  "Fim das dúvidas sobre o que estudar",
                  "Métricas de desempenho instantâneas",
                  "Avisos de 'temas quentes' do edital"
                ].map((txt, i) => (
                  <div key={i} className="flex items-center gap-4 font-bold text-gray-700 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm transition-transform hover:translate-x-2">
                    <CheckCircle2 className="text-green-500 shrink-0" size={24} /> {txt}
                  </div>
                ))}
              </div>
           </div>
           <div className="lg:w-1/2 w-full aspect-square bg-white rounded-[56px] shadow-2xl border border-gray-100 p-12 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-nubank/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="space-y-6 relative z-10">
                 <div className="h-4 w-1/3 bg-nubank/20 rounded-full animate-pulse"></div>
                 <div className="h-16 w-full bg-gray-50 rounded-[24px] border border-gray-100 flex items-center px-6 gap-4">
                    <div className="w-8 h-8 rounded-lg bg-nubank/10"></div>
                    <div className="h-3 w-1/2 bg-gray-200 rounded-full"></div>
                 </div>
                 <div className="h-16 w-full bg-gray-50 rounded-[24px] border border-gray-100 flex items-center px-6 gap-4">
                    <div className="w-8 h-8 rounded-lg bg-nubank/10"></div>
                    <div className="h-3 w-2/3 bg-gray-200 rounded-full"></div>
                 </div>
                 <div className="h-24 w-full bg-nubank/5 rounded-[32px] border border-nubank/10 p-6 flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="h-3 w-24 bg-nubank/20 rounded-full"></div>
                      <div className="h-2 w-32 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="w-12 h-12 bg-nubank rounded-2xl shadow-lg shadow-nubank/20"></div>
                 </div>
              </div>
              <div className="flex justify-center relative z-10 pt-8">
                 <div className="w-40 h-40 bg-white border-8 border-gray-50 rounded-full flex flex-col items-center justify-center text-gray-900 font-black text-4xl shadow-xl transition-transform group-hover:scale-110">
                    <span className="text-nubank">92%</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">Pronto</span>
                 </div>
              </div>
           </div>
        </section>

        <div className="text-center space-y-10 py-10">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Vamos construir seu sucesso?</h2>
          <button 
            onClick={() => onNavigate(AppStep.PRICING)} 
            className="bg-nubank text-white px-12 py-6 rounded-full text-xl font-bold hover:scale-105 transition-all shadow-2xl shadow-nubank/40 flex items-center gap-3 mx-auto"
          >
            Compre Agora <ChevronRight size={24} />
          </button>
        </div>
      </main>

      <footer className="py-12 border-t border-gray-100 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest z-10 bg-white">
        <p>© 2024 Mentoria IA - Plataforma de Alta Performance.</p>
      </footer>
    </div>
  );
};

export default HowItWorks;
