
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Target, Clock, GraduationCap, ChevronRight, ChevronLeft } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    target: '',
    dailyHours: 2,
    expertiseLevel: 'beginner',
    focusDays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex']
  });

  const next = () => setStep(s => s + 1);
  const back = () => setStep(s => s - 1);

  const steps = [
    { title: 'Como podemos te chamar?', icon: <GraduationCap size={40} className="text-nubank" /> },
    { title: 'Qual seu grande objetivo?', icon: <Target size={40} className="text-nubank" /> },
    { title: 'Sua rotina de estudos', icon: <Clock size={40} className="text-nubank" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="w-full max-w-2xl bg-white p-12 rounded-[40px] shadow-xl space-y-12">
        {/* Progress Dots */}
        <div className="flex justify-center gap-2">
          {[1, 2, 3].map(s => (
            <div key={s} className={`h-2 rounded-full transition-all ${step === s ? 'w-12 bg-nubank' : 'w-2 bg-gray-200'}`}></div>
          ))}
        </div>

        <div className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-nubank/10 rounded-3xl flex items-center justify-center mb-6">
            {steps[step-1].icon}
          </div>
          <h2 className="text-4xl font-bold text-gray-900">{steps[step-1].title}</h2>
        </div>

        <div className="min-h-[200px] flex flex-col justify-center">
          {step === 1 && (
            <div className="space-y-4 text-center">
               <input 
                type="text" 
                value={profile.name}
                onChange={e => setProfile({...profile, name: e.target.value})}
                placeholder="Ex: João da Silva"
                className="w-full text-center text-3xl font-medium border-b-2 border-gray-100 outline-none focus:border-nubank py-4"
               />
               <p className="text-gray-400">Sua jornada começa com um nome de aprovado.</p>
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 gap-4">
              {['Concurso Público', 'Exame da OAB', 'Residência Médica', 'Certificação Profissional'].map(opt => (
                <button 
                  key={opt}
                  onClick={() => setProfile({...profile, target: opt})}
                  className={`p-6 rounded-2xl border-2 transition-all text-left flex items-center justify-between ${profile.target === opt ? 'border-nubank bg-nubank/5 text-nubank' : 'border-gray-100 hover:border-gray-300'}`}
                >
                  <span className="text-xl font-semibold">{opt}</span>
                  {profile.target === opt && <div className="w-4 h-4 bg-nubank rounded-full"></div>}
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <div className="text-center">
                <span className="text-6xl font-bold text-nubank">{profile.dailyHours}h</span>
                <p className="text-gray-400 mt-2">Dedicadas por dia</p>
                <input 
                  type="range" min="1" max="12" step="0.5"
                  value={profile.dailyHours}
                  onChange={e => setProfile({...profile, dailyHours: Number(e.target.value)})}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer mt-8 accent-nubank"
                />
              </div>
              <div className="flex justify-between gap-2">
                {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'].map(d => (
                   <button 
                    key={d}
                    onClick={() => {
                      const days = profile.focusDays.includes(d) 
                        ? profile.focusDays.filter(f => f !== d) 
                        : [...profile.focusDays, d];
                      setProfile({...profile, focusDays: days});
                    }}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all ${profile.focusDays.includes(d) ? 'bg-nubank text-white shadow-lg' : 'bg-gray-100 text-gray-500'}`}
                   >
                    {d}
                   </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4 pt-8">
          {step > 1 && (
            <button onClick={back} className="flex-1 py-5 rounded-full border-2 border-gray-100 font-bold text-gray-500 hover:bg-gray-50 flex items-center justify-center gap-2">
              <ChevronLeft size={20} /> Voltar
            </button>
          )}
          <button 
            onClick={step === 3 ? () => onComplete(profile) : next}
            disabled={step === 1 && !profile.name || step === 2 && !profile.target}
            className="flex-[2] py-5 rounded-full bg-nubank text-white font-bold text-xl hover:bg-opacity-90 disabled:bg-gray-200 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {step === 3 ? 'Finalizar Perfil' : 'Continuar'} <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
