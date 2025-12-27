
import React from 'react';
import { UserProfile, MentorshipPlan } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CheckCircle2, TrendingUp, Award, Brain, Target, ArrowRight } from 'lucide-react';

const Dashboard: React.FC<{ plan: MentorshipPlan, profile: UserProfile }> = ({ plan, profile }) => {
  const data = (plan.extractedSubjects || []).map((s, idx) => ({
    name: typeof s === 'string' ? (s.length > 10 ? s.substring(0, 10) + '...' : s) : 'Matéria',
    value: 60 + (idx * 5) % 40,
  }));

  const COLORS = ['#8A05BE', '#7A04A8', '#9B30D0', '#5F0485'];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 space-y-4">
          <span className="bg-nubank/10 text-nubank px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">Dashboard do Aluno</span>
          <h2 className="text-4xl font-bold text-gray-900 leading-tight">Prepare-se, {String(profile?.name || 'Estudante')}. <br/>Sua aprovação no <span className="text-nubank">{String(plan?.title || 'Edital')}</span> começa aqui.</h2>
          <p className="text-gray-500 text-lg">Você completou 12% da meta semanal. Mantenha a constância.</p>
          <button className="bg-nubank text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-lg shadow-nubank/20">
            Continuar de onde parou <ArrowRight size={20} />
          </button>
        </div>
        <div className="w-64 h-64 relative">
          <div className="absolute inset-0 bg-nubank/5 rounded-full animate-pulse"></div>
          <div className="absolute inset-4 bg-white rounded-full shadow-inner flex flex-col items-center justify-center border border-gray-50">
            <span className="text-5xl font-black text-nubank">12%</span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">Progresso Total</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Missions / Tasks */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">Missões de Hoje</h3>
            <span className="text-nubank font-bold hover:underline cursor-pointer">Ver calendário</span>
          </div>
          
          <div className="space-y-4">
            {(plan.weeklySchedule?.[0]?.topics || []).slice(0, 3).map((topic, i) => (
              <div key={i} className="group bg-white p-6 rounded-3xl border border-gray-100 hover:border-nubank/30 hover:shadow-xl hover:shadow-nubank/5 transition-all flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${i === 0 ? 'bg-nubank text-white' : 'bg-gray-50 text-gray-300'}`}>
                    {i === 0 ? <Brain size={28} /> : <CheckCircle2 size={28} />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{String(topic.subject || '')}</p>
                    <h4 className="text-lg font-bold text-gray-800">{String(topic.title || '')}</h4>
                    <div className="flex items-center gap-4 mt-2">
                       <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">Peso: {Number(topic.weight || 0)}</span>
                       <span className="text-xs text-nubank font-bold italic">{typeof topic.relevance === 'string' ? topic.relevance : 'Alta Importância'}</span>
                    </div>
                  </div>
                </div>
                <button className={`px-6 py-3 rounded-full font-bold transition-all ${i === 0 ? 'bg-nubank text-white' : 'border border-gray-200 text-gray-400'}`}>
                  {i === 0 ? 'Iniciar' : 'Revisar'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Stats and Recommendations */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 space-y-8">
            <h3 className="text-xl font-bold text-gray-900">Desempenho por Matéria</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis dataKey="name" hide />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}} />
                  <Bar dataKey="value" radius={[10, 10, 10, 10]}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
              <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Evolução Semanal</p>
                <p className="text-lg font-bold text-gray-800">+15% vs última semana</p>
              </div>
            </div>
          </div>

          <div className="bg-nubank p-8 rounded-[40px] text-white space-y-6 shadow-xl shadow-nubank/20">
            <div className="flex items-center gap-3">
              <Award size={28} />
              <h3 className="text-xl font-bold">Dicas do NuMentor</h3>
            </div>
            <ul className="space-y-4">
              {(plan.recommendations || []).slice(0, 2).map((rec, i) => (
                <li key={i} className="bg-white/10 p-4 rounded-2xl text-sm leading-relaxed border border-white/10">
                  {typeof rec === 'string' ? rec : 'Continue focado nos seus objetivos diários.'}
                </li>
              ))}
            </ul>
            <button className="w-full bg-white text-nubank py-4 rounded-full font-bold hover:bg-gray-50 transition-all">
              Ver relatório detalhado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
