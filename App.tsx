
import React, { Suspense, lazy, useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Auth from './pages/Auth';
import Workspace from './pages/Workspace';
import MetaCallback from './pages/MetaCallback';
import { supabase } from './services/supabaseClient';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const StrategySetup = lazy(() => import('./pages/StrategySetup'));
const DecisionEngine = lazy(() => import('./pages/DecisionEngine'));
const SDRCommand = lazy(() => import('./pages/SDRCommand'));
const Insights = lazy(() => import('./pages/Insights'));
const Campaigns = lazy(() => import('./pages/Campaigns'));
const ContentIdeation = lazy(() => import('./pages/ContentIdeation'));
const PaidTraffic = lazy(() => import('./pages/paid-traffic'));
const LeadsCRM = lazy(() => import('./pages/LeadsCRM'));
const DataMining = lazy(() => import('./pages/DataMining'));
const Orchestration = lazy(() => import('./pages/Orchestration'));
const WhatsApp = lazy(() => import('./pages/WhatsApp'));
const SocialMedia = lazy(() => import('./pages/SocialMedia'));
const Monetization = lazy(() => import('./pages/Monetization.tsx'));
const Products = lazy(() => import('./pages/Products.tsx'));
const Settings = lazy(() => import('./pages/Settings.tsx'));
const Playbooks = lazy(() => import('./pages/Playbooks'));
const StrategicPlanning = lazy(() => import('./pages/StrategicPlanning'));
const ExecutionMotor = lazy(() => import('./pages/ExecutionMotor'));
const AutomationHub = lazy(() => import('./pages/AutomationHub'));

const TAB_META: Record<string, { label: string; pulse: string }> = {
  dashboard: { label: 'Command Center', pulse: 'Radar estrategico ativo' },
  planning: { label: 'Radar de Mercado', pulse: 'Sinais e tendencias em leitura' },
  strategy: { label: 'Positioning Studio', pulse: 'Posicionamento em refinamento' },
  campaigns: { label: 'Diretrizes e Campanhas', pulse: 'Campanhas macro em orquestracao' },
  'content-ideation': { label: 'Narrativas e Conteudo', pulse: 'Linhas editoriais em construcao' },
  'paid-traffic': { label: 'Growth Tests', pulse: 'Canais sob observacao' },
  orchestration: { label: 'Directives Hub', pulse: 'Dispatch intersistemas ativo' },
  datamining: { label: 'Inteligencia Competitiva', pulse: 'Mercado e concorrencia em mineracao' },
  whatsapp: { label: 'Dispatch Operacional', pulse: 'Encaminhamentos em execucao' },
  'social-media': { label: 'Marca e Presenca', pulse: 'Presenca institucional em leitura' },
  leads: { label: 'Leitura de Mercado', pulse: 'Origem e qualidade sob analise' },
  decisions: { label: 'Decision Room', pulse: 'Recomendacoes acionaveis prontas' },
  sdr: { label: 'Opportunity Desk', pulse: 'Hipoteses comerciais em triagem' },
  insights: { label: 'Insights Executivos', pulse: 'Cockpit estrategico atualizado' },
  monetization: { label: 'Cenarios e Viabilidade', pulse: 'Viabilidade economica em simulacao' },
  products: { label: 'Projetos Estrategicos', pulse: 'Iniciativas em desenho' },
  settings: { label: 'Configuracoes', pulse: 'Governanca do sistema' },
  playbooks: { label: 'Framework Library', pulse: 'Frameworks prontos para reuso' },
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [authLoading, setAuthLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [activeTenantId, setActiveTenantId] = useState<string | null>(() => {
    try {
      return localStorage.getItem("planner.tenant_id");
    } catch {
      return null;
    }
  });
  const [activeTenantName, setActiveTenantName] = useState<string | null>(() => {
    try {
      return localStorage.getItem("planner.tenant_name");
    } catch {
      return null;
    }
  });

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setUserId(data.session?.user?.id ?? null);
      setAuthLoading(false);
    };

    void init();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id ?? null);
      setAuthLoading(false);
      if (!session) {
        setActiveTenantId(null);
        setActiveTenantName(null);
        try {
          localStorage.removeItem("planner.tenant_id");
          localStorage.removeItem("planner.tenant_name");
        } catch { }
      }
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    try {
      if (activeTenantId) localStorage.setItem("planner.tenant_id", activeTenantId);
      if (activeTenantName) localStorage.setItem("planner.tenant_name", activeTenantName);
    } catch { }
  }, [activeTenantId, activeTenantName]);

  useEffect(() => {
    // Handle basic routing
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, []);

  if (currentPath === '/auth/callback/meta') {
    return <MetaCallback />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard tenantId={activeTenantId} setActiveTab={setActiveTab} />;
      case 'planning': return <StrategicPlanning tenantId={activeTenantId} />;
      case 'strategy': return <StrategySetup tenantId={activeTenantId} />;
      case 'campaigns': return <Campaigns />;
      case 'content-ideation': return <ContentIdeation tenantId={activeTenantId} />;
      case 'paid-traffic': return <PaidTraffic tenantId={activeTenantId} />;
      case 'orchestration': return <AutomationHub tenantId={activeTenantId} />;
      case 'datamining': return <DataMining tenantId={activeTenantId} />;
      case 'whatsapp': return <ExecutionMotor tenantId={activeTenantId} />;
      case 'social-media': return <SocialMedia tenantId={activeTenantId} />;
      case 'leads': return <LeadsCRM tenantId={activeTenantId} />;
      case 'decisions': return <DecisionEngine tenantId={activeTenantId} />;
      case 'sdr': return <SDRCommand tenantId={activeTenantId} />;
      case 'insights': return <Insights tenantId={activeTenantId} />;
      case 'monetization': return <Monetization tenantId={activeTenantId} />;
      case 'products': return <Products tenantId={activeTenantId} />;
      case 'settings': return <Settings tenantId={activeTenantId} />;
      case 'playbooks':
        return <Playbooks tenantId={activeTenantId} />;
      default: return <Dashboard tenantId={activeTenantId} setActiveTab={setActiveTab} />;
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background-dark text-slate-100 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400 font-bold">
          <span className="material-symbols-outlined animate-spin">sync</span>
          Carregando…
        </div>
      </div>
    );
  }

  if (!userId) {
    return <Auth />;
  }

  if (!activeTenantId) {
    return (
      <Workspace
        userId={userId}
        activeTenantId={activeTenantId}
        onSelectTenant={(t) => {
          setActiveTenantId(t.id);
          setActiveTenantName(t.name);
        }}
      />
    );
  }

  const currentTabMeta = TAB_META[activeTab] || TAB_META.dashboard;

  return (
    <div className="flex h-screen bg-background-dark font-display overflow-hidden">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-border-dark flex items-center justify-between px-4 lg:px-8 bg-background-dark/80 backdrop-blur-md sticky top-0 z-30">
          {/* Logo on Left for Mobile, Context for Desktop */}
          <div className="flex items-center gap-4">
            <div className="flex lg:hidden items-center gap-2">
              <div className="bg-primary size-7 rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-lg">hub</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-tight leading-none">FBR-MKT</span>
                <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest">Strategic Intelligence System</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-slate-400">
              <span className="text-[10px] font-black uppercase tracking-widest">{currentTabMeta.label}</span>
              <span className="text-slate-700">|</span>
              <span className="text-[10px] font-bold text-primary animate-pulse uppercase tracking-widest">{currentTabMeta.pulse}</span>
            </div>
          </div>

          {/* Controls and Menu on Right */}
          <div className="flex items-center gap-3 lg:gap-6">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
              <span className="size-2 bg-emerald-500 rounded-full"></span>
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Stack operacional estavel</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black text-white uppercase leading-none mb-0.5">FBR Strategy Operator</p>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">{activeTenantName || "Workspace"}</p>
              </div>
              <div className="size-9 lg:size-10 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-primary overflow-hidden shadow-sm">
                <img src="https://picsum.photos/100/100?seed=stitch" alt="Avatar" className="w-full h-full object-cover grayscale opacity-80" />
              </div>
            </div>

            {/* Mobile Sandwich Menu on the Right */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 -mr-2 text-slate-300 hover:bg-white/5 rounded-lg transition-colors"
              aria-label="Open Menu"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-surface-dark/20">
          <Suspense
            fallback={
              <div className="flex h-full min-h-[320px] items-center justify-center text-slate-400">
                <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em]">
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  Carregando modulo
                </div>
              </div>
            }
          >
            {renderContent()}
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default App;
