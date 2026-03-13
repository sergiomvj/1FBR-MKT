import React, { useMemo, useState } from 'react';

const marketSignals = [
  {
    company: 'Grupo educacional regional',
    source: 'FBR-Leads',
    signal: 'Busca por reposicionamento com narrativa premium e ganho operacional.',
    heat: 'Alta',
    implication: 'Boa aderencia para proposta consultiva com Design, Redacao e Sales.',
  },
  {
    company: 'Operacao de ecommerce nichado',
    source: 'FBR-Click',
    signal: 'Interesse em bundles com criacao e inteligencia de campanha.',
    heat: 'Media',
    implication: 'Pede leitura de margem e estrutura de bundle antes de avancar.',
  },
  {
    company: 'Projeto de midia emergente',
    source: 'Leitura manual',
    signal: 'Mercado responde melhor a marcas que articulam comunidade e autoridade.',
    heat: 'Alta',
    implication: 'Pode virar tese para Pulse&Perspective e Facebrasil TV.',
  },
];

const heatTone: Record<string, string> = {
  Alta: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  Media: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Baixa: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
};

const LeadsCRM: React.FC<{ tenantId: string | null }> = ({ tenantId }) => {
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState('Todas');

  const filteredSignals = useMemo(() => {
    return marketSignals.filter((item) => {
      const matchesSource = sourceFilter === 'Todas' || item.source === sourceFilter;
      const haystack = `${item.company} ${item.signal} ${item.implication}`.toLowerCase();
      const matchesSearch = haystack.includes(search.toLowerCase());
      return matchesSource && matchesSearch;
    });
  }, [search, sourceFilter]);

  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <section className="rounded-[28px] border border-border-dark bg-card-dark p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-primary">
              <span className="size-2 rounded-full bg-primary"></span>
              Leitura de Mercado
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-white">Sinais vindos de leads, click e observacao direta do mercado</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Em vez de CRM operacional, esta area do `FBR-MKT` consolida sinais para orientar posicionamento, oportunidades e prioridades.
            </p>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">Tenant</p>
            <p className="mt-2 text-sm font-bold text-white">{tenantId ? 'Conectado' : 'Sem tenant ativo'}</p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-border-dark bg-card-dark p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-3">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por empresa ou sinal..."
              className="w-72 rounded-2xl border border-white/10 bg-background-dark/60 px-4 py-3 text-sm text-white outline-none transition focus:border-primary/40"
            />
            <select
              value={sourceFilter}
              onChange={(event) => setSourceFilter(event.target.value)}
              className="rounded-2xl border border-white/10 bg-background-dark/60 px-4 py-3 text-sm text-white outline-none transition focus:border-primary/40"
            >
              <option>Todas</option>
              <option>FBR-Leads</option>
              <option>FBR-Click</option>
              <option>Leitura manual</option>
            </select>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">{filteredSignals.length} sinais visiveis</p>
        </div>
      </section>

      <section className="grid gap-4">
        {filteredSignals.map((item) => (
          <article key={item.company + item.signal} className="rounded-2xl border border-border-dark bg-card-dark p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-black text-white">{item.company}</h3>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                    {item.source}
                  </span>
                  <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${heatTone[item.heat]}`}>
                    {item.heat}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">{item.signal}</p>
                <div className="mt-4 rounded-2xl border border-primary/10 bg-primary/5 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">Implicacao estrategica</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.implication}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default LeadsCRM;
