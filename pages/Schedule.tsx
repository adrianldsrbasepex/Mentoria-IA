
import React from 'react';
import { MentorshipPlan } from '../types';
import { Calendar as CalendarIcon, Clock, BookOpen, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';

const Schedule: React.FC<{ plan: MentorshipPlan }> = ({ plan }) => {
  const schedule = plan.weeklySchedule || [];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cronograma de Estudos</h1>
          <p className="text-gray-500">Sua jornada personalizada para as próximas semanas.</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-full shadow-sm border border-gray-100">
           <button className="p-2 hover:bg-gray-50 rounded-full transition-colors"><ChevronLeft size={20}/></button>
           <span className="font-bold text-gray-800 px-4">Semana 1</span>
           <button className="p-2 hover:bg-gray-50 rounded-full transition-colors"><ChevronRight size={20}/></button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {schedule.map((day, idx) => (
          <div key={idx} className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className={`p-6 ${idx === 0 ? 'bg-nubank text-white' : 'bg-gray-50 text-gray-800'} border-b border-gray-100 flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <CalendarIcon size={20} />
                <span className="font-bold text-lg">{String(day.day || '')}</span>
              </div>
              <button className="opacity-50 hover:opacity-100"><MoreVertical size={20}/></button>
            </div>
            
            <div className="p-6 space-y-4">
              {(day.topics || []).map((topic, tIdx) => (
                <div key={tIdx} className="group relative pl-4 border-l-2 border-nubank/20 hover:border-nubank transition-all">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{String(topic.subject || '')}</p>
                  <h4 className="text-sm font-bold text-gray-800 mb-1 group-hover:text-nubank transition-colors">{String(topic.title || '')}</h4>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Clock size={12}/> 50min</span>
                    <span className="flex items-center gap-1"><BookOpen size={12}/> {typeof topic.relevance === 'string' ? topic.relevance : 'Importante'}</span>
                  </div>
                </div>
              ))}
              
              {(day.topics || []).length === 0 && (
                <div className="py-8 text-center text-gray-400 italic text-sm">
                  Dia de descanso merecido!
                </div>
              )}
            </div>

            <div className="p-6 bg-gray-50/50 flex items-center justify-between mt-auto">
              <span className="text-xs font-bold text-gray-400">Sessão total: 120min</span>
              <div className="flex -space-x-2">
                 {[1,2].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-nubank/20"></div>)}
              </div>
            </div>
          </div>
        ))}
        
        {/* Placeholder para completar a grade visualmente */}
        {schedule.length < 7 && Array.from({length: 7 - schedule.length}).map((_, i) => (
           <div key={`empty-${i}`} className="bg-gray-50/50 rounded-[32px] border-2 border-dashed border-gray-200 flex items-center justify-center p-12 text-gray-300">
             <CalendarIcon size={40} />
           </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
