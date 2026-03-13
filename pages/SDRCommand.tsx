import React, { useMemo, useState } from 'react';

const opportunityPool = [
  {
    name: 'Facebrasil Institutional Pack',
    fit: 'Alta',
    why: 'O mercado pede clareza institucional, narrativa forte e esteira coordenada.',
    nextStep: 'Despachar para Sales e Design com proposta de valor revisada.',
  },
  {
    name: 'Editorial Authority Sprint',
    fit: 'Media',
    why: 'Boa aderencia para projetos que precisam ganhar presenca e prova editorial antes da venda.',
    nextStep: 'Validar com Redacao e Video a esteira de 30 dias.',
  },
  {
    name: 'Bundle de campanha consultiva',
    fit: 'Alta',
    why: 'Leads aquecidos demonstram necessidade de pacote mais integrado e menos fragmentado.',
    nextStep: 'Abrir cenario de margem com Finance e revisar escopo com Sales.',
  },
];

const fitTone: Record<string, string> = {
  Alta: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Media: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Baixa: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
};

const SDRCommand: React.FC<{ tenantId?: string | null }> = ({ tenantId }) => {
  const [filter, setFilter] = useState('Todas');
  const [context, setContext] = useState(
    'Contexto atual: mercado pedindo clareza de posicionamento, bundles consultivos e articulacao entre estrategia e execucao.'
  );

  const visibleOpportunities = useMemo(() => {
    if (filter === 'Todas') return opportunityPool;
    return opportunityPool.filter((item) => item.fit === filter);
  }, [filter]);

  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <section className="rounded-[28px] border border-border-dark bg-card-dark p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-primary">
              <span className="size-2 rounded-full bg-primary"></span>
              Opportunity Desk
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-white">Triagem de oportunidades que podem virar direcionamento comercial</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Este modulo do `FBR-MKT` nao simula um SDR. Ele organiza oportunidades a partir do contexto estrategico e prepara o terreno para Sales.
            </p>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">Tenant</p>
            <p className="mt-2 text-sm font-bold text-white">{tenantId ? 'Conectado' : 'Sem tenant ativo'}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-border-dark bg-card-dark p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Contexto consolidado</p>
            <textarea
              value={context}
              onChange={(event) => setContext(event.target.value)}
              className="mt-4 h-44 w-full rounded-2xl border border-white/10 bg-background-dark/60 px-4 py-4 text-sm leading-relaxed text-slate-200 outline-none transition focus:border-primary/40"
            />
          </div>

          <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Regra de despacho</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              So encaminhe oportunidade para `FBR-Sales` quando a tese, o ganho percebido e o escopo minimo estiverem claros.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-border-dark bg-card-dark p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Fila de oportunidades</p>
              <h3 className="mt-2 text-2xl font-black text-white">Leituras prontas para triagem comercial</h3>
            </div>
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="rounded-2xl border border-white/10 bg-background-dark/60 px-4 py-3 text-sm text-white outline-none transition focus:border-primary/40"
            >
              <option>Todas</option>
              <option>Alta</option>
              <option>Media</option>
              <option>Baixa</option>
            </select>
          </div>

          <div className="mt-6 space-y-4">
            {visibleOpportunities.map((item) => (
              <article key={item.name} className="rounded-2xl border border-white/8 bg-background-dark/50 p-5">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h4 className="text-lg font-black text-white">{item.name}</h4>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.why}</p>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${fitTone[item.fit]}`}>
                    Fit {item.fit}
                  </span>
                </div>
                <div className="mt-4 rounded-2xl border border-primary/10 bg-primary/5 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">Proximo passo</p>
                  <p className="mt-2 text-sm font-bold leading-relaxed text-white">{item.nextStep}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SDRCommand;
