
import React, { useState, useEffect, useRef } from 'react';
import { Book, CheckCircle2, AlertCircle, ShoppingCart, Eye, EyeOff, ArrowLeft, Loader2, ChevronRight, Lock } from 'lucide-react';
import { AppStep } from '../types';

const FloatingBooks = () => {
  const [items, setItems] = useState<{ id: number; x: number; y: number; vx: number; vy: number; rot: number; vrot: number }[]>([]);

  useEffect(() => {
    const numItems = 8;
    const initialItems = Array.from({ length: numItems }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
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
        if (newX <= 0 || newX >= window.innerWidth - 40) newVx *= -1;
        if (newY <= 0 || newY >= window.innerHeight - 40) newVy *= -1;
        return { ...item, x: newX, y: newY, vx: newVx, vy: newVy, rot: item.rot + item.vrot };
      }));
      animationFrameId = requestAnimationFrame(update);
    };
    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-[0.08]">
      {items.map(item => (
        <div 
          key={item.id} 
          className="absolute text-nubank"
          style={{ transform: `translate(${item.x}px, ${item.y}px) rotate(${item.rot}deg)` }}
        >
          <Book size={64} />
        </div>
      ))}
    </div>
  );
};

const maskCPF = (v: string) => v.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})/, '$1-$2').substring(0, 14);

const validateCPF = (cpf: string) => {
  const clean = cpf.replace(/\D/g, '');
  if (clean.length !== 11 || /^(\d)\1{10}$/.test(clean)) return false;
  let sum = 0;
  for (let i = 1; i <= 9; i++) sum += parseInt(clean.substring(i - 1, i)) * (11 - i);
  let rev = (sum * 10) % 11;
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(clean.substring(9, 10))) return false;
  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(clean.substring(i - 1, i)) * (12 - i);
  rev = (sum * 10) % 11;
  if (rev === 10 || rev === 11) rev = 0;
  return rev === parseInt(clean.substring(10, 11));
};

const Login: React.FC<{ onLogin: () => void, onNavigate: (step: AppStep) => void }> = ({ onNavigate, onLogin }) => {
  const [step, setStep] = useState<'cpf' | 'password'>('cpf');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isValidCpf, setIsValidCpf] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = maskCPF(e.target.value);
    setCpf(val);
    setError(false);
    if (val.length === 14) setIsValidCpf(validateCPF(val));
    else setIsValidCpf(null);
  };

  const nextStep = () => {
    if (isValidCpf) {
      setLoading(true);
      setTimeout(() => {
        setStep('password');
        setLoading(false);
        setTimeout(() => passwordInputRef.current?.focus(), 400);
      }, 500);
    }
  };

  const handleLoginAttempt = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 4) {
      setError(true);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6 relative overflow-hidden">
      <FloatingBooks />
      
      <div className="w-full max-w-[440px] z-10 space-y-10">
        {/* Header - Simple Brand */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-16 h-16 bg-nubank rounded-2xl flex items-center justify-center shadow-lg shadow-nubank/10 animate-in fade-in zoom-in duration-500">
            <span className="text-white font-bold text-2xl tracking-tighter">IA</span>
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Mentoria IA</h1>
            <p className="text-sm font-medium text-gray-400">Entre na sua conta para continuar</p>
          </div>
        </div>

        {/* Login Card - Nubank Style */}
        <div className="bg-[#FAFAFA] rounded-[32px] p-8 md:p-10 border border-[#E5E5E5] shadow-sm relative transition-all duration-500 overflow-hidden">
          
          <form onSubmit={handleLoginAttempt} className="space-y-6">
            
            {/* Step 1: CPF */}
            <div className={`transition-all duration-500 ease-out ${step === 'password' ? 'opacity-40 -translate-y-4 scale-95 pointer-events-none' : 'opacity-100'}`}>
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-900 block ml-1">CPF</label>
                  <div className={`relative flex items-center border-b-2 transition-all duration-300 ${isValidCpf === true ? 'border-nubank' : isValidCpf === false ? 'border-red-500' : 'border-[#D1D1D6] focus-within:border-nubank'}`}>
                    <input 
                      type="text" 
                      autoFocus
                      disabled={step === 'password'}
                      value={cpf}
                      onChange={handleCpfChange}
                      placeholder="000.000.000-00"
                      className="w-full py-3 bg-transparent outline-none text-xl font-medium text-gray-900 placeholder:text-[#D1D1D6]"
                    />
                    <div className="absolute right-0">
                      {isValidCpf === true && <CheckCircle2 className="text-nubank animate-in zoom-in" size={20} />}
                      {isValidCpf === false && <AlertCircle className="text-red-500" size={20} />}
                    </div>
                  </div>
                </div>

                {step === 'cpf' && (
                  <button 
                    type="button"
                    onClick={nextStep}
                    disabled={!isValidCpf || loading}
                    className={`w-full py-4 rounded-full font-bold text-base transition-all flex items-center justify-center gap-2 ${isValidCpf ? 'bg-nubank text-white' : 'bg-[#E5E5E5] text-gray-400 cursor-not-allowed'}`}
                  >
                    {loading ? <Loader2 className="animate-spin" /> : <>Continuar <ChevronRight size={18} /></>}
                  </button>
                )}
              </div>
            </div>

            {/* Step 2: Password (Fade + Slide In) */}
            {step === 'password' && (
              <div className="animate-in slide-in-from-bottom-8 fade-in duration-500 space-y-6 absolute inset-x-8 md:inset-x-10 top-10">
                <div className="flex items-center justify-between mb-2">
                  <button 
                    type="button"
                    onClick={() => { setStep('cpf'); setPassword(''); }}
                    className="text-nubank font-semibold text-sm flex items-center gap-1 hover:underline"
                  >
                    <ArrowLeft size={16} /> Corrigir CPF
                  </button>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-900 block ml-1">Sua senha</label>
                  <div className={`relative flex items-center border-b-2 transition-all duration-300 ${error ? 'border-red-500 animate-shake' : 'border-[#D1D1D6] focus-within:border-nubank'}`}>
                    <input 
                      ref={passwordInputRef}
                      type={showPassword ? "text" : "password"} 
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setError(false); }}
                      placeholder="No mínimo 4 dígitos"
                      className="w-full py-3 bg-transparent outline-none text-xl font-medium text-gray-900 placeholder:text-[#D1D1D6]"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <button 
                    type="submit"
                    disabled={loading || password.length < 4}
                    className="w-full bg-nubank text-white py-4 rounded-full font-bold text-base shadow-lg shadow-nubank/20 transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : 'Entrar'}
                  </button>
                  <button type="button" className="w-full text-center text-sm font-semibold text-nubank hover:underline">
                    Esqueci minha senha
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Footer Support */}
        <div className="text-center space-y-6">
          <p className="text-gray-500 text-sm font-medium">
            Não tem uma conta?{' '}
            <button 
              onClick={() => onNavigate(AppStep.PRICING)}
              className="text-nubank font-bold hover:underline"
            >
              Criar agora
            </button>
          </p>
          
          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-gray-400">
            <span className="flex items-center gap-1.5"><Lock size={12}/> Acesso seguro</span>
            <span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span>
            <span>Criptografia SSL</span>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}} />
    </div>
  );
};

export default Login;