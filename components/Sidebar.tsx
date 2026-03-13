import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const menuGroups = [
  {
    label: 'Core',
    items: [
      { id: 'dashboard', label: 'Command Center', icon: 'space_dashboard' },
      { id: 'planning', label: 'Radar de Mercado', icon: 'radar' },
      { id: 'strategy', label: 'Positioning Studio', icon: 'explore' },
    ],
  },
  {
    label: 'Strategy Ops',
    items: [
      { id: 'products', label: 'Projetos Estrategicos', icon: 'inventory_2' },
      { id: 'campaigns', label: 'Diretrizes e Campanhas', icon: 'campaign' },
      { id: 'datamining', label: 'Inteligencia Competitiva', icon: 'travel_explore' },
      { id: 'content-ideation', label: 'Narrativas e Conteudo', icon: 'edit_note' },
      { id: 'paid-traffic', label: 'Growth Tests', icon: 'query_stats' },
      { id: 'orchestration', label: 'Directives Hub', icon: 'account_tree' },
      { id: 'whatsapp', label: 'Dispatch Operacional', icon: 'chat' },
      { id: 'social-media', label: 'Marca e Presenca', icon: 'share' },
    ],
  },
  {
    label: 'Decisioning',
    items: [
      { id: 'leads', label: 'Leitura de Mercado', icon: 'insights' },
      { id: 'sdr', label: 'Opportunity Desk', icon: 'forum' },
      { id: 'decisions', label: 'Decision Room', icon: 'psychology' },
    ],
  },
  {
    label: 'Executive',
    items: [
      { id: 'insights', label: 'Insights Executivos', icon: 'bar_chart' },
      { id: 'playbooks', label: 'Framework Library', icon: 'library_books' },
    ],
  },
  {
    label: 'Finance',
    items: [
      { id: 'monetization', label: 'Cenarios e Viabilidade', icon: 'payments' },
    ],
  },
  {
    label: 'System',
    items: [
      { id: 'settings', label: 'Configuracoes', icon: 'settings' },
    ],
  },
];

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  return (
    <aside
      className={`
      fixed lg:relative inset-y-0 left-0 z-50 w-64 border-r border-border-dark flex flex-col h-full bg-background-dark transition-transform duration-300 ease-in-out shrink-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}
    >
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary size-8 rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-xl">hub</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-black tracking-tight leading-none">FBR-MKT</h1>
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
              Strategic Intelligence
            </span>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="lg:hidden p-1 text-slate-500 hover:text-white">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <nav className="flex-1 px-4 py-2 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
        {menuGroups.map((group) => (
          <div key={group.label} className="space-y-1">
            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">{group.label}</p>
            {group.items.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                  activeTab === item.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] ${
                    activeTab === item.id ? 'text-white' : 'text-slate-500 group-hover:text-primary'
                  }`}
                >
                  {item.icon}
                </span>
                <span className="text-sm font-bold tracking-tight">{item.label}</span>
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-border-dark bg-surface-dark/30 space-y-3">
        <button
          onClick={() => window.open('/docs/operation-manual.html', '_blank')}
          className="w-full flex items-center justify-between bg-primary/10 hover:bg-primary/20 border border-primary/20 p-3 rounded-xl group transition-all"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">menu_book</span>
            <span className="text-xs font-bold text-white tracking-tight">Manual de Operacao</span>
          </div>
          <span className="material-symbols-outlined text-slate-500 text-sm group-hover:text-primary transition-all">
            open_in_new
          </span>
        </button>

        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Strategic Core</p>
          <div className="flex items-center gap-2">
            <span className="size-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold text-slate-300 text-left">Active and dispatching</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
