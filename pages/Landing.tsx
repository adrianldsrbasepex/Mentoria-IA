
import React, { useState, useEffect } from 'react';
import { ChevronRight, Target, Clock, ShieldCheck, Zap, Book } from 'lucide-react';
import { AppStep } from '../types';

const FloatingBooks = () => {
  const [items, setItems] = useState<{ id: number; x: number; y: number; vx: number; vy: number; rot: number; vrot: number }[]>([]);

  useEffect(() => {
    const numItems = 6;
    const initialItems = Array.from({ length: numItems }).map((_, i) => ({
      id: i,
      x: Math.random() * (window.innerWidth - 60),
      y: Math.random() * (window.innerHeight - 60),
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      rot: Math.random() * 360,
      vrot: (Math.random() - 0.5) * 0.1,
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
          <Book size={84} />
        </div>
      ))}
    </div>
  );
};

const Landing: React.FC<{ onStart: () => void; onNavigate: (step: AppStep) => void }> = ({ onStart, onNavigate }) => {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col relative overflow-hidden">
      <FloatingBooks />

      {/* Header - Crystal Light */}
      <nav className="flex items-center justify-between px-6 lg:px-12 h-20 border-b border-gray-100 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onNavigate(AppStep.LANDING)}>
          <div className="w-10 h-10 bg-nubank rounded-xl flex items-center justify-center shadow-lg shadow-nubank/20">
            <span className="text-white font-bold text-lg tracking-tighter">IA</span>
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">Mentoria IA</span>
        </div>
        
        <div className="hidden md:flex gap-10 text-sm font-semibold text-gray-500">
          <button onClick={() => onNavigate(AppStep.ADVANTAGES)} className="hover:text-nubank transition-colors">Vantagens</button>
          <button onClick={() => onNavigate(AppStep.HOW_IT_WORKS)} className="hover:text-nubank transition-colors">Método</button>
          <button onClick={() => onNavigate(AppStep.PRICING)} className="hover:text-nubank transition-colors">Planos</button>
        </div>

        <button onClick={onStart} className="bg-nubank text-white px-7 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-md">
          Acessar
        </button>
      </nav>

      {/* Hero Section - Clean Focus */}
      <section className="relative z-10 px-6 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-20 max-w-7xl mx-auto flex-1">
        <div className="lg:w-1/2 space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#F6E8FF] text-nubank rounded-full text-xs font-bold tracking-tight">
            <Zap size={14} className="fill-nubank" /> Mentoria baseada em IA 3.0
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-gray-900 tracking-tight">
            Seu estudo com <br/> <span className="text-nubank">clareza total.</span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed font-medium max-w-lg">
            Analisamos seu edital e criamos um caminho livre de distrações. Onde você foca, a aprovação floresce.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 pt-4">
            <button onClick={onStart} className="bg-nubank text-white px-10 py-4 rounded-full text-lg font-bold flex items-center justify-center gap-2 group shadow-lg shadow-nubank/20 hover:scale-[1.02] transition-all">
              Começar Agora
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
        
        <div className="lg:w-1/2 relative">
          <div className="w-full aspect-square bg-[#FAFAFA] rounded-[48px] overflow-hidden shadow-2xl border border-gray-100 relative group">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop" 
              alt="Estudo focado" 
              className="w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent"></div>
            
            {/* Minimal Metric Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-8 rounded-[32px] shadow-2xl border border-gray-50 space-y-4 max-w-xs animate-floating">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#F6E8FF] rounded-2xl flex items-center justify-center text-nubank">
                  <Target size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Seu Progresso</p>
                  <p className="text-xl font-bold text-gray-900">85% Concluído</p>
                </div>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-nubank h-full w-[85%] rounded-full shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 py-12 border-t border-gray-100 px-6 text-center text-gray-400 text-xs font-semibold uppercase tracking-widest">
        <p>© 2025 MENTORIA IA • CONSTRUINDO O FUTURO DA EDUCAÇÃO</p>
      </footer>
    </div>
  );
};

export default Landing;