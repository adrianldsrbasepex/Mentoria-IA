
import React, { useState, useEffect } from 'react';
import { AppStep, UserProfile, MentorshipPlan } from './types';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Analysis from './pages/Analysis';
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import Advantages from './pages/Advantages';
import HowItWorks from './pages/HowItWorks';
import Pricing from './pages/Pricing';
import FinishRegistration from './pages/FinishRegistration';

const STORAGE_KEY = 'mentoria_ia_user_data';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.LANDING);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [activePlan, setActivePlan] = useState<MentorshipPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');

    if (sessionId) {
      setCurrentStep(AppStep.FINISH_REGISTRATION);
      setLoading(false);
      return;
    }

    if (savedData) {
      try {
        const { profile, plan, loggedIn } = JSON.parse(savedData);
        setUserProfile(profile || null);
        setActivePlan(plan || null);
        setIsLoggedIn(loggedIn || false);

        if (loggedIn) {
          if (plan) setCurrentStep(AppStep.DASHBOARD);
          else if (profile) setCurrentStep(AppStep.ANALYSIS);
          else setCurrentStep(AppStep.ONBOARDING);
        }
      } catch (e) {
        console.error("Erro ao carregar dados locais", e);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      const dataToSave = {
        profile: userProfile,
        plan: activePlan,
        loggedIn: isLoggedIn
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    }
  }, [userProfile, activePlan, isLoggedIn, loading]);

  const handleNavigate = (step: AppStep) => {
    setCurrentStep(step);
    window.scrollTo(0, 0);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    if (activePlan) setCurrentStep(AppStep.DASHBOARD);
    else if (userProfile) setCurrentStep(AppStep.ANALYSIS);
    else setCurrentStep(AppStep.ONBOARDING);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentStep(AppStep.LANDING);
  };

  const handleFinishOnboarding = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentStep(AppStep.ANALYSIS);
  };

  const handleFinishAnalysis = (plan: MentorshipPlan) => {
    setActivePlan(plan);
    setCurrentStep(AppStep.DASHBOARD);
  };

  const handleCompleteRegistration = (userData: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...userData } as UserProfile));
    setIsLoggedIn(true);
    setCurrentStep(AppStep.ONBOARDING);
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-nubank border-t-transparent rounded-full animate-spin"></div>
          <p className="text-nubank font-bold animate-pulse">Iniciando Mentoria IA...</p>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentStep) {
      case AppStep.LANDING: return <Landing onStart={() => handleNavigate(AppStep.LOGIN)} onNavigate={handleNavigate} />;
      case AppStep.ADVANTAGES: return <Advantages onStart={() => handleNavigate(AppStep.LOGIN)} onNavigate={handleNavigate} />;
      case AppStep.HOW_IT_WORKS: return <HowItWorks onStart={() => handleNavigate(AppStep.LOGIN)} onNavigate={handleNavigate} />;
      case AppStep.PRICING: return <Pricing onStart={() => handleNavigate(AppStep.LOGIN)} onNavigate={handleNavigate} />;
      case AppStep.LOGIN: return <Login onLogin={handleLogin} onNavigate={handleNavigate} />;
      case AppStep.FINISH_REGISTRATION: return <FinishRegistration onComplete={handleCompleteRegistration} />;
      case AppStep.ONBOARDING: return <Onboarding onComplete={handleFinishOnboarding} />;
      case AppStep.ANALYSIS: return <Analysis profile={userProfile!} onComplete={handleFinishAnalysis} />;
      case AppStep.DASHBOARD: return <Dashboard plan={activePlan!} profile={userProfile!} />;
      case AppStep.SCHEDULE: return <Schedule plan={activePlan!} />;
      default: return <Landing onStart={() => handleNavigate(AppStep.LOGIN)} onNavigate={handleNavigate} />;
    }
  };

  return (
    <Layout 
      currentStep={currentStep} 
      onNavigate={handleNavigate} 
      onLogout={handleLogout}
      userName={userProfile?.name}
    >
      {renderPage()}
    </Layout>
  );
};

export default App;
