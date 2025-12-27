
import React, { useState, useEffect } from 'react';
import { AppStep } from '../types';
import { 
  Check, ShieldCheck, X, Loader2, Mail, 
  Sparkles, AlertCircle, CheckCircle2, CreditCard, 
  Book, Zap, Award, GraduationCap, Lock, ExternalLink
} from 'lucide-react';

interface ContentProps {
  onStart: () => void;
  onNavigate: (step: AppStep) => void;
}

// Configuração dos links de checkout para incluir o session_id no retorno
const SUCCESS_URL = `${window.location.origin}/?session_id={CHECKOUT_SESSION_ID}`;

const PLAN_LINKS: Record<string, string> = {
  'price_basic_id': 'https://buy.stripe.com/00weVdfFAbiodUG0D0ak001',
  'price_pro_id': 'https://buy.stripe.com/bJefZh8d80DK6seetQak000',
  'price_premium_id': 'https://buy.stripe.com/00w7sL8d886ceYK1H4ak002'
};

const FloatingBooks = () => {
  const [items, setItems] = useState<{ id: number; x: number; y: number; vx: number; vy: number; rot: number; vrot: number }[]>([]);

  useEffect(() => {
    const numItems = 8;
    const initialItems = Array.from({ length: numItems }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
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
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-[0.04]">
      {items.map(item => (
        <div key={item.id} className="absolute text-nubank" style={{ transform: `translate(${item.x}px, ${item.y}px) rotate(${item.rot}deg)` }}>
          <Book size={64} />
        </div>
      ))}
    </div>
  );
};

const Pricing: React.FC<ContentProps> = ({ onStart, onNavigate }) => {
  const [selectedPlan, setSelectedPlan] = useState<{name: string, price: string, id: string} | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isProcessingStripe, setIsProcessingStripe] = useState(false);

  const plans = [
    {
      id: 'price_basic_id',
      name: 'Básico',
      price: 'R$ 55,00',
      description: 'Ideal para iniciantes em concursos.',
      icon: <GraduationCap className="text-gray-400" />,
      features: [
        { text: '1 edital ativo', detail: 'Foco total no seu objetivo principal' },
        { text: 'Cronograma fixo', detail: 'Rotina semanal estruturada' },
        { text: 'Suporte via e-mail', detail: 'Respostas em até 48h' }
      ]
    },
    {
      id: 'price_pro_id',
      name: 'Pro',
      price: 'R$ 89,00',
      description: 'Para estudantes competitivos.',
      popular: true,
      badge: 'Mais Vendido',
      icon: <Zap className="text-nubank" />,
      features: [
        { text: 'Editais ilimitados', detail: 'Crie vários cronogramas' },
        { text: 'IA Adaptativa', detail: 'Ajuste dinâmico por desempenho' },
        { text: 'Dashboard Pro', detail: 'Métricas avançadas de evolução' },
        { text: 'Prioridade pedagógica', detail: 'Temas quentes em destaque' }
      ]
    },
    {
      id: 'price_premium_id',
      name: 'Premium',
      price: 'R$ 159,00',
      description: 'Elite: feedback humano + IA.',
      icon: <Award className="text-amber-500" />,
      features: [
        { text: 'Tudo do Pro', detail: 'Funcionalidades completas' },
        { text: 'IA de Redação', detail: 'Correção instantânea de textos' },
        { text: 'Simulados IA', detail: 'Questões geradas por fraquezas' },
        { text: 'Mentoria Grupal', detail: 'Encontros mensais ao vivo' }
      ]
    }
  ];

  const handleSelectPlan = (plan: typeof plans[0]) => {
    // Redirecionamento imediato para o Stripe Checkout (Produção)
    const baseLink = PLAN_LINKS[plan.id];
    // Em links de Checkout do Stripe pré-configurados (como buy.stripe.com), não se passa o success_url dinamicamente via query param se já configurado no dashboard.
    // Assumindo que o arquiteto configurou o dashboard do Stripe para voltar para a home da App.
    window.location.href = baseLink;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      <FloatingBooks />

      <nav className="flex items-center justify-between px-6 lg:px-12 h-20 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate(AppStep.LANDING)}>
          <div className="w-9 h-9 bg-nubank rounded-xl flex items-center justify-center shadow-lg shadow-nubank/20">
            <span className="text-white font-bold text-sm">IA</span>
          </div>
          <span className="text-xl font-bold text-nubank tracking-tight">Mentoria IA</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-bold text-gray-500">
          <button onClick={() => onNavigate(AppStep.ADVANTAGES)} className="hover:text-nubank transition-colors">Vantagens</button>
          <button onClick={() => onNavigate(AppStep.HOW_IT_WORKS)} className="hover:text-nubank transition-colors">Como funciona</button>
          <button className="text-nubank border-b-2 border-nubank pb-1">Preços</button>
        </div>
        <button onClick={onStart} className="bg-nubank text-white px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-all">
          Entrar
        </button>
      </nav>

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 space-y-20">
          <header className="text-center space-y-6">
            <h1 className="text-5xl lg:text-8xl font-black text-gray-900 leading-none tracking-tight">
              Investimento em <span className="text-nubank">Você.</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-xl mx-auto font-medium">Checkout 100% seguro. Acesso liberado imediatamente após o pagamento.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan, i) => (
              <div key={i} className={`bg-white p-10 rounded-[48px] border-4 flex flex-col space-y-8 transition-all duration-500 relative group hover:shadow-2xl ${plan.popular ? 'border-nubank scale-105 z-10 shadow-xl shadow-nubank/10' : 'border-white hover:border-nubank/20'}`}>
                {plan.popular && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-nubank text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                    {plan.badge}
                  </div>
                )}
                
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-tight">{plan.description}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-2xl text-gray-400 group-hover:text-nubank transition-colors">{plan.icon}</div>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-gray-900">{plan.price}</span>
                  <span className="text-sm font-bold text-gray-400">/mês</span>
                </div>

                <div className="space-y-5 flex-1 pt-4">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex gap-4 items-start group/item">
                      <div className="mt-1 bg-nubank/10 p-1 rounded-full text-nubank group-hover/item:bg-nubank group-hover/item:text-white transition-colors">
                        <Check size={12} />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-gray-700 leading-tight">{f.text}</p>
                        <p className="text-[10px] text-gray-400 font-medium leading-tight">{f.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full py-5 rounded-full font-bold transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2 ${plan.popular ? 'bg-nubank text-white shadow-lg shadow-nubank/20' : 'bg-gray-100 text-gray-500 hover:bg-nubank hover:text-white'}`}
                >
                  <CreditCard size={18} />
                  Assinar {plan.name}
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-6 pt-12">
            <div className="flex items-center gap-8 opacity-40 grayscale">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Transação criptografada pela tecnologia Stripe</p>
          </div>
        </div>
      </div>

      <footer className="py-12 border-t border-gray-50 text-center text-[10px] font-black text-gray-300 uppercase tracking-widest bg-white z-10">
        <p>© 2024 Mentoria IA Soluções Educacionais.</p>
      </footer>
    </div>
  );
};

export default Pricing;
