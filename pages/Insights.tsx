import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';

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

const executiveNarratives = [
  {
    title: 'Leitura consolidada',
    body: 'O ecossistema esta respondendo melhor quando o FBR-MKT entrega clareza antes da execucao. O principal ganho atual e reduzir dispersao de narrativa.',
  },
  {
    title: 'Pressao competitiva',
    body: 'Os concorrentes reforcam discurso de estrategia premium, mas ainda com baixa capacidade de materializacao. A FBR pode explorar isso como diferenca central.',
  },
];

const Insights: React.FC<{ tenantId?: string | null }> = ({ tenantId }) => {
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
      .limit(6);

    if (loadError) {
      setError(loadError.message);
      return;
    }

    setBlueprints((data || []) as BlueprintRow[]);
    setError(null);
  };

  const decisionCount = blueprints.reduce((acc, item) => acc + (item.decision_rules?.length || 0), 0);

  return (
    <div className="p-4 lg:p-8 space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <section className="rounded-[28px] border border-border-dark bg-card-dark p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-primary">
              <span className="size-2 rounded-full bg-primary"></span>
              Insights Executivos
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-white">Cockpit executivo da camada estrategica do ecossistema FBR</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Leitura resumida para acompanhar o que o `FBR-MKT` esta enxergando, priorizando e despachando para os outros sistemas.
            </p>
          </div>

          <div className="rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">Workspace</p>
            <p className="mt-2 text-sm font-bold text-white">{tenantId ? 'Tenant conectado' : 'Sem tenant ativo'}</p>
          </div>
        </div>
      </section>

      {error && <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-300">{error}</div>}

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Blueprints salvos', value: String(blueprints.length), helper: 'outputs persistidos do sistema' },
          { label: 'Decision rules', value: String(decisionCount), helper: 'regras de decisao disponiveis' },
          { label: 'Narrativas em leitura', value: '02', helper: 'sumario executivo atual' },
          { label: 'Despachos prontos', value: String(Math.min(decisionCount, 4)), helper: 'prontos para orquestracao' },
        ].map((card) => (
          <article key={card.label} className="rounded-2xl border border-border-dark bg-card-dark p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{card.label}</p>
            <h3 className="mt-3 text-4xl font-black text-white">{card.value}</h3>
            <p className="mt-2 text-sm text-slate-400">{card.helper}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-border-dark bg-card-dark p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Narrativa executiva</p>
          <div className="mt-6 space-y-4">
            {executiveNarratives.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/8 bg-background-dark/50 p-5">
                <h3 className="text-lg font-black text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Ultimas decisoes persistidas</p>
          <div className="mt-6 space-y-3">
            {blueprints.length > 0 ? (
              blueprints.map((item) => {
                const firstRule = item.decision_rules?.[0];
                return (
                  <div key={item.id} className="rounded-2xl border border-primary/10 bg-background-dark/40 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-sm font-black text-white">{item.copy_assets?.headline || 'Blueprint sem headline'}</h3>
                      <span className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">
                        {firstRule?.priority || 'Sem prioridade'}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-300">{firstRule?.action || item.copy_assets?.cta || 'Sem acao registrada.'}</p>
                  </div>
                );
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-primary/20 bg-background-dark/30 p-6 text-sm text-slate-400">
                Nenhum output persistido ainda. Use a `Decision Room` para salvar a primeira recomendacao.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Insights;
