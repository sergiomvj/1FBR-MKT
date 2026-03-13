import React from 'react';

const dispatchFlows = [
  {
    name: 'Despacho para Sales',
    role: 'Entregar proposta de valor, oportunidades e criterio de priorizacao.',
  },
  {
    name: 'Despacho para Design e conteudo',
    role: 'Traduzir tese estrategica em assets, narrativas e materiais institucionais.',
  },
  {
    name: 'Despacho para Finance',
    role: 'Solicitar leitura de viabilidade, risco e retorno por cenario.',
  },
];

const ExecutionMotor: React.FC<{ tenantId: string | null }> = ({ tenantId }) => {
  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <section className="rounded-[28px] border border-border-dark bg-card-dark p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-primary">
              <span className="size-2 rounded-full bg-primary"></span>
              Dispatch Operacional
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-white">Como a estrategia sai do FBR-MKT e entra em execucao no ecossistema</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Esta area substitui motores operacionais antigos por fluxos de despacho, handoff e acompanhamento entre modulos FBR.
            </p>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">Tenant</p>
            <p className="mt-2 text-sm font-bold text-white">{tenantId ? 'Conectado' : 'Sem tenant ativo'}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4">
        {dispatchFlows.map((flow) => (
          <article key={flow.name} className="rounded-2xl border border-border-dark bg-card-dark p-6">
            <h3 className="text-lg font-black text-white">{flow.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{flow.role}</p>
          </article>
        ))}
      </section>
    </div>
  );
};

export default ExecutionMotor;
