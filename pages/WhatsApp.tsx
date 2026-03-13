import React from 'react';

const handoffMoments = [
  {
    title: 'Envio de direcionamento para times internos',
    description: 'Quando Sales, Design ou Finance precisam receber uma sintese executiva do FBR-MKT.',
  },
  {
    title: 'Registro de alinhamentos criticos',
    description: 'Quando uma decisao estrategica precisa circular com rapidez entre liderancas.',
  },
  {
    title: 'Distribuicao de resumos de cenario',
    description: 'Quando o sistema precisa compartilhar leituras de risco, prioridade e oportunidade.',
  },
];

const WhatsApp: React.FC<{ tenantId: string | null }> = ({ tenantId }) => {
  return (
    <div className="p-4 lg:p-8 text-white min-h-screen bg-background-dark max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <section className="rounded-[28px] border border-border-dark bg-card-dark p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-primary">
              <span className="size-2 rounded-full bg-primary"></span>
              Handoffs e Mensageria
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-white">Uso estrategico de mensageria para circular contexto e decisao</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Esta area nao opera um SDR conversacional. Ela organiza pontos de handoff e distribuicao rapida de contexto do `FBR-MKT`.
            </p>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">Tenant</p>
            <p className="mt-2 text-sm font-bold text-white">{tenantId ? 'Conectado' : 'Sem tenant ativo'}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4">
        {handoffMoments.map((item) => (
          <article key={item.title} className="rounded-2xl border border-border-dark bg-card-dark p-6">
            <h3 className="text-lg font-black text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
};

export default WhatsApp;
