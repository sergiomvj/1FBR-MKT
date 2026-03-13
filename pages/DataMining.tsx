import React from 'react';

const competitorFeeds = [
  {
    source: 'Sites institucionais',
    finding: 'Aumento de claims sobre estrategia premium e transformacao de marca.',
    implication: 'A FBR precisa responder com prova de integracao e capacidade de despacho real.',
  },
  {
    source: 'LinkedIn e publicacoes',
    finding: 'Mais discursos sobre IA, mas pouca governanca e pouca operacionalizacao.',
    implication: 'Boa oportunidade para reforcar a tese de IA aplicada com responsabilidade.',
  },
  {
    source: 'Landing pages e propostas observadas',
    finding: 'Bundles pouco claros e muita fragmentacao de servicos.',
    implication: 'Chance de diferenciar a FBR pela organizacao do ecossistema e leitura estrategica anterior.',
  },
];

const DataMining: React.FC<{ tenantId: string | null }> = ({ tenantId }) => {
  return (
    <div className="p-4 lg:p-8 text-white space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <section className="rounded-[28px] border border-border-dark bg-card-dark p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-primary">
              <span className="size-2 rounded-full bg-primary"></span>
              Inteligencia Competitiva
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tight">Observacao estruturada de concorrencia, mercado e movimentos relevantes</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Aqui o `FBR-MKT` consolida achados de mercado para sustentar o Radar, o posicionamento e as decisoes do ecossistema.
            </p>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">Tenant</p>
            <p className="mt-2 text-sm font-bold text-white">{tenantId ? 'Conectado' : 'Sem tenant ativo'}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4">
        {competitorFeeds.map((item) => (
          <article key={item.source + item.finding} className="rounded-2xl border border-border-dark bg-card-dark p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">{item.source}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.finding}</p>
            <div className="mt-4 rounded-2xl border border-white/8 bg-background-dark/50 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Implicacao</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.implication}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default DataMining;
