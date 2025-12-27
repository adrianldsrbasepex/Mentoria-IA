import React, { useState } from 'react';
import { UserProfile, MentorshipPlan } from '../types';
import { analyzeEdital } from '../services/geminiService';
import { FileUp, Sparkles, Loader2, AlertCircle, Clock } from 'lucide-react';

interface AnalysisProps {
  profile: UserProfile;
  onComplete: (plan: MentorshipPlan) => void;
}

const Analysis: React.FC<AnalysisProps> = ({ profile, onComplete }) => {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    setError(null);
    try {
      const plan = await analyzeEdital(inputText, profile);
      onComplete(plan);
    } catch (err) {
      setError("Não conseguimos analisar seu edital agora. Tente colar um texto mais curto ou verifique sua conexão.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Analise seu Edital com <span className="text-nubank">IA</span></h1>
        <p className="text-gray-500 text-lg">Cole o conteúdo programático do seu edital ou programa de estudos abaixo.</p>
      </div>

      <div className="bg-white rounded-[40px] shadow-xl p-10 border border-gray-100 space-y-8">
        <div className="space-y-4">
          <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Conteúdo do Edital</label>
          <textarea 
            className="w-full h-80 bg-gray-50 border-2 border-gray-100 rounded-3xl p-6 outline-none focus:border-nubank transition-all text-gray-700 leading-relaxed resize-none"
            placeholder="Cole aqui as matérias, tópicos e regras do seu edital..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          ></textarea>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
          <div className="flex items-center gap-3 text-gray-400">
            <FileUp size={24} />
            <span className="text-sm">Formatos suportados: Texto simples, Matrizes curriculares</span>
          </div>

          <button 
            onClick={handleAnalyze}
            disabled={!inputText.trim() || isAnalyzing}
            className="w-full sm:w-auto bg-nubank text-white px-12 py-5 rounded-full text-xl font-bold hover:bg-opacity-90 disabled:bg-gray-200 transition-all flex items-center justify-center gap-3 shadow-lg shadow-nubank/20"
          >
            {isAnalyzing ? (
              <>
                <Loader2 size={24} className="animate-spin" />
                Analisando...
              </>
            ) : (
              <>
                <Sparkles size={24} />
                Gerar Mentoria IA
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 p-6 rounded-2xl flex items-center gap-4 text-red-600">
            <AlertCircle />
            <p className="font-medium">{error}</p>
          </div>
        )}
      </div>

      {isAnalyzing && (
        <div className="text-center space-y-6 animate-pulse">
           <div className="flex justify-center gap-2">
             <div className="w-3 h-3 bg-nubank rounded-full"></div>
             <div className="w-3 h-3 bg-nubank rounded-full animation-delay-200"></div>
             <div className="w-3 h-3 bg-nubank rounded-full animation-delay-400"></div>
           </div>
           <div className="space-y-2">
             <p className="text-nubank font-bold">A IA está mapeando os tópicos mais importantes...</p>
             <p className="text-gray-400 text-sm italic">"Organizando 1.240 possíveis cruzamentos de conteúdo"</p>
           </div>
        </div>
      )}

      {/* Methodology Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 flex gap-6">
          <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-nubank shrink-0">
            <Sparkles size={24} />
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-gray-900">Engenharia Pedagógica</h4>
            <p className="text-sm text-gray-500">Nossa IA utiliza taxonomia de Bloom para classificar o nível de dificuldade de cada tópico extraído.</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-gray-100 flex gap-6">
          <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-nubank shrink-0">
            {/* Added Clock to imports above */}
            <Clock size={24} />
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-gray-900">Distribuição Realista</h4>
            <p className="text-sm text-gray-500">O cronograma considera sua carga horária de {profile.dailyHours}h e nunca sobrecarrega seu cérebro.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;