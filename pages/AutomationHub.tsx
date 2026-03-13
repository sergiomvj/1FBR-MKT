import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';

interface Props {
  tenantId: string | null;
}

type BlueprintRow = {
  id: string;
  copy_assets: {
    headline?: string;
    body?: string;
    cta?: string;
  } | null;
  decision_rules: Array<{
    title?: string;
    category?: string;
    priority?: string;
    rationale?: string;
    action?: string;
  }> | null;
};

const automationObservability = [
  {
    label: 'Agentes nativos monitorados',
    value: '07',
  },
  {
    label: 'Falhas criticas',
    value: '00',
  },
];

const blueprintsCatalog = [
  'Blueprint de leitura competitiva recorrente',
  'Blueprint de despacho para Sales apos revisao de posicionamento',
  'Blueprint de simulacao de cenario com Finance',
  'Blueprint de esteira criativa institucional',
];

const AutomationHub: React.FC<Props> = ({ tenantId }) => {
  const [activeSubTab, setActiveSubTab] = useState<'directives' | 'observability' | 'blueprints'>('directives');
  const [blueprints, setBlueprints] = useState<BlueprintRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tenantId) {
      setBlueprints([]);
      return;
    }

    void loadBlueprints();
  }, [tenantId]);

  const loadBlueprints = async () => {
    const { data, error: loadError } = await supabase
      .from('strategy_blueprints')
      .select('id, copy_assets, decision_rules')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })
      .limit(8);

    if (loadError) {
      setError(loadError.message);
      return;
    }

    setBlueprints((data || []) as BlueprintRow[]);
    setError(null);
  };

  const subTabs = [
    { id: 'directives', label: 'Directives Hub', icon: 'account_tree' },
    { id: 'observability', label: 'Observabilidade', icon: 'visibility' },
    { id: 'blueprints', label: 'Blueprints', icon: 'auto_awesome_motion' },
  ];

  const directivesCount = blueprints.reduce((acc, item) => acc + (item.decision_rules?.length || 0), 0);

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <section className="rounded-[28px] border border-border-dark bg-card-dark p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-primary">
              <span className="size-2 rounded-full bg-primary"></span>
              Directives Hub
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-white">Despacho, observabilidade e modelos operacionais do FBR-MKT</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Esta area coordena como a estrategia sai do sistema e alcanca os demais modulos FBR com contexto e governanca.
            </p>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">Tenant</p>
            <p className="mt-2 text-sm font-bold text-white">{tenantId ? 'Conectado' : 'Sem tenant ativo'}</p>
          </div>
        </div>
      </section>

      {error && <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-300">{error}</div>}

      <div className="flex flex-wrap gap-2 rounded-2xl border border-border-dark bg-card-dark p-2">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as typeof activeSubTab)}
            className={`flex items-center gap-2 rounded-xl px-5 py-3 text-[10px] font-black uppercase tracking-[0.18em] transition-all ${
              activeSubTab === tab.id ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'text-slate-500 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {activeSubTab === 'directives' && (
        <section className="grid gap-4">
          {blueprints.length > 0 ? (
            blueprints.map((blueprint) => {
              const firstRule = blueprint.decision_rules?.[0];
              return (
                <article key={blueprint.id} className="rounded-2xl border border-border-dark bg-card-dark p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-black text-white">{blueprint.copy_assets?.headline || 'Blueprint sem headline'}</h3>
                        <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-primary">
                          {firstRule?.category || 'decision'}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-slate-400">
                        {firstRule?.action || blueprint.copy_assets?.cta || 'Sem acao de despacho registrada.'}
                      </p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-300">
                      {firstRule?.priority || 'Sem prioridade'}
                    </span>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 bg-card-dark p-8 text-center text-sm text-slate-500">
              Nenhum blueprint persistido ainda. Use a `Decision Room` para salvar a primeira recomendacao.
            </div>
          )}
        </section>
      )}

      {activeSubTab === 'observability' && (
        <section className="grid gap-6 lg:grid-cols-3">
          {[
            ...automationObservability,
            { label: 'Diretrizes persistidas', value: String(directivesCount) },
          ].map((card) => (
            <article key={card.label} className="rounded-2xl border border-border-dark bg-card-dark p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{card.label}</p>
              <h3 className="mt-3 text-4xl font-black text-white">{card.value}</h3>
            </article>
          ))}
        </section>
      )}

      {activeSubTab === 'blueprints' && (
        <section className="rounded-3xl border border-border-dark bg-card-dark p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Biblioteca inicial</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {blueprintsCatalog.map((item) => (
              <div key={item} className="rounded-2xl border border-white/8 bg-background-dark/50 p-5">
                <p className="text-sm font-bold leading-relaxed text-white">{item}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default AutomationHub;
