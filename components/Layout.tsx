
import React from 'react';
import { LayoutDashboard, Calendar, FileText, Settings, LogOut, Search, Bell } from 'lucide-react';
import { AppStep } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentStep: AppStep;
  onNavigate: (step: AppStep) => void;
  onLogout?: () => void;
  userName?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, currentStep, onNavigate, onLogout, userName }) => {
  // Excluir as páginas públicas do layout interno (sidebar e header)
  if (
    currentStep === AppStep.LANDING || 
    currentStep === AppStep.LOGIN || 
    currentStep === AppStep.ADVANTAGES || 
    currentStep === AppStep.HOW_IT_WORKS || 
    currentStep === AppStep.PRICING ||
    currentStep === AppStep.FINISH_REGISTRATION
  ) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-[#F5F5F5] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col">
        <div className="p-8">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-nubank rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">IA</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-nubank">Mentoria IA</span>
          </div>

          <nav className="space-y-1">
            <button 
              onClick={() => onNavigate(AppStep.DASHBOARD)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${currentStep === AppStep.DASHBOARD ? 'bg-nubank text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <LayoutDashboard size={20} />
              <span className="font-medium">Resumo</span>
            </button>
            <button 
              onClick={() => onNavigate(AppStep.SCHEDULE)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${currentStep === AppStep.SCHEDULE ? 'bg-nubank text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <Calendar size={20} />
              <span className="font-medium">Cronograma</span>
            </button>
            <button 
              onClick={() => onNavigate(AppStep.ANALYSIS)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${currentStep === AppStep.ANALYSIS ? 'bg-nubank text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <FileText size={20} />
              <span className="font-medium">Novo Edital</span>
            </button>
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-gray-100 space-y-4">
          <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-500 hover:text-gray-800 transition-colors">
            <Settings size={20} />
            <span className="font-medium">Perfil</span>
          </button>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8">
          <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-full w-96 border border-gray-100">
            <Search size={18} className="text-gray-400" />
            <input type="text" placeholder="Pesquisar tópico ou matéria..." className="bg-transparent border-none outline-none text-sm w-full" />
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <Bell size={22} className="text-gray-400 cursor-pointer hover:text-nubank transition-colors" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">Olá, {userName || 'Usuário'}</p>
                <p className="text-xs text-gray-400">Plano Ativo</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-nubank/10 flex items-center justify-center text-nubank font-bold">
                {userName?.charAt(0) || 'U'}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
