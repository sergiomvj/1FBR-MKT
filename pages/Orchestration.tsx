import React from 'react';

const orchestrationBlocks = [
  {
    title: 'Ritmo de decisao',
    text: 'Definir quando o sistema deve reavaliar sinais, hipoteses e prioridades.',
  },
  {
    title: 'Ritmo de despacho',
    text: 'Definir quando direcionamentos saem para Sales, Design, Finance e conteudo.',
  },
  {
    title: 'Ritmo de revisao executiva',
    text: 'Definir checkpoints para consolidar narrativas, cenarios e proximos movimentos.',
  },
];

const Orchestration: React.FC<{ tenantId: string | null }> = ({ tenantId }) => {
  return (
    <div className="p-4 lg:p-8 text-white h-full overflow-y-auto max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <section className="rounded-[28px] border border-border-dark bg-card-dark p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-primary">
              <span className="size-2 rounded-full bg-primary"></span>
              Orquestracao Estrategica
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tight">Cadencia e governanca dos movimentos do sistema</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Este modulo organiza ritmo, checkpoints e logica de handoff do `FBR-MKT`, em vez de sequencias de email do produto anterior.
            </p>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">Tenant</p>
            <p className="mt-2 text-sm font-bold text-white">{tenantId ? 'Conectado' : 'Sem tenant ativo'}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {orchestrationBlocks.map((item) => (
          <article key={item.title} className="rounded-2xl border border-border-dark bg-card-dark p-6">
            <h3 className="text-lg font-black text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.text}</p>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Orchestration;
