
import React, { useState, useEffect } from 'react';
import { ShieldCheck, User, Lock, CheckCircle2, Loader2, Mail, MapPin } from 'lucide-react';

const maskCPF = (v: string) => v.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})/, '$1-$2').substring(0, 14);
const maskCEP = (v: string) => v.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').substring(0, 9);

interface FinishRegistrationProps {
  onComplete: (data: any) => void;
}

const FinishRegistration: React.FC<FinishRegistrationProps> = ({ onComplete }) => {
  const [loading, setLoading] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    cep: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    
    if (sessionId) {
      // Simulação de verificação segura sem backend
      setTimeout(() => setPaymentVerified(true), 1500);
    } else {
      // Se não houver session_id, redireciona ou mostra erro (aqui simulamos sucesso para teste local)
      setPaymentVerified(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    setLoading(true);
    
    // Simulando delay de processamento local
    setTimeout(() => {
      setLoading(false);
      alert("Cadastro realizado com sucesso localmente!");
      onComplete({
        name: formData.name,
        email: formData.email,
        cpf: formData.cpf,
        cep: formData.cep
      });
    }, 1000);
  };

  if (!paymentVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 border-4 border-nubank border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Validando seu pagamento...</h2>
          <p className="text-gray-400">Aguarde enquanto confirmamos sua transação.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 flex items-center justify-center">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Lado Esquerdo: Resumo do Sucesso */}
        <div className="bg-nubank p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full"></div>
          <div className="space-y-8 relative z-10">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-nubank shadow-xl">
              <CheckCircle2 size={40} />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-black leading-tight">Pagamento <br/>Confirmado!</h1>
              <p className="text-white/80 font-medium">Sua transação foi processada com sucesso. Agora, crie sua conta local para acessar a mentoria.</p>
            </div>
          </div>

          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/10">
               <ShieldCheck size={24} className="text-white" />
               <p className="text-xs font-bold uppercase tracking-widest">Ambiente Seguro</p>
            </div>
          </div>
        </div>

        {/* Lado Direito: Formulário */}
        <div className="p-10 lg:p-14 space-y-10">
          <header>
            <h3 className="text-2xl font-bold text-gray-900">Finalizar Cadastro</h3>
            <p className="text-gray-400 text-sm">Preencha seus dados para ativar o acesso.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Nome Completo</label>
                <div className="flex items-center border-b-2 border-gray-100 focus-within:border-nubank transition-all py-2">
                  <User size={18} className="text-gray-300 mr-3" />
                  <input 
                    type="text" 
                    required 
                    placeholder="Como no seu RG" 
                    className="w-full outline-none font-medium text-gray-700"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">CPF</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="000.000.000-00" 
                    className="w-full border-b-2 border-gray-100 focus-within:border-nubank outline-none py-2 font-medium text-gray-700"
                    value={formData.cpf}
                    onChange={e => setFormData({...formData, cpf: maskCPF(e.target.value)})}
                  />
                </div>
                <div className="relative group">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">CEP</label>
                  <div className="flex items-center border-b-2 border-gray-100 focus-within:border-nubank transition-all py-2">
                    <MapPin size={18} className="text-gray-300 mr-3" />
                    <input 
                      type="text" 
                      required 
                      placeholder="00000-000" 
                      className="w-full outline-none font-medium text-gray-700"
                      value={formData.cep}
                      onChange={e => setFormData({...formData, cep: maskCEP(e.target.value)})}
                    />
                  </div>
                </div>
              </div>

              <div className="relative group">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Melhor E-mail</label>
                <div className="flex items-center border-b-2 border-gray-100 focus-within:border-nubank transition-all py-2">
                  <Mail size={18} className="text-gray-300 mr-3" />
                  <input 
                    type="email" 
                    required 
                    placeholder="seu@email.com" 
                    className="w-full outline-none font-medium text-gray-700"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Criar Senha</label>
                  <div className="flex items-center border-b-2 border-gray-100 focus-within:border-nubank transition-all py-2">
                    <Lock size={18} className="text-gray-300 mr-3" />
                    <input 
                      type="password" 
                      required 
                      className="w-full outline-none font-medium text-gray-700"
                      value={formData.password}
                      onChange={e => setFormData({...formData, password: e.target.value})}
                    />
                  </div>
                </div>
                <div className="relative group">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Confirmar</label>
                  <input 
                    type="password" 
                    required 
                    className="w-full border-b-2 border-gray-100 focus-within:border-nubank outline-none py-2 font-medium text-gray-700"
                    value={formData.confirmPassword}
                    onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-nubank text-white py-5 rounded-full font-bold text-xl shadow-2xl shadow-nubank/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              {loading ? <Loader2 className="animate-spin" /> : <ShieldCheck />}
              Ativar Minha Mentoria
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FinishRegistration;
