import React from 'react';

const frameworks = [
  {
    title: 'Framework de posicionamento por projeto',
    useCase: 'Consolidar problema, promessa, pilares e prova de valor.',
  },
  {
    title: 'Framework de radar de mercado',
    useCase: 'Organizar sinais, tendencias, competidores e hipoteses de crescimento.',
  },
  {
    title: 'Framework de despacho intersistemas',
    useCase: 'Traduzir estrategia em diretriz para Sales, Design, Finance e conteudo.',
  },
  {
    title: 'Framework de cenario e viabilidade',
    useCase: 'Ler risco, upside e prioridade antes da alocacao de esforco.',
  },
];

const Playbooks: React.FC<{ tenantId: string | null }> = ({ tenantId }) => {
  return (
    <div className="p-4 lg:p-8 space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <section className="rounded-[28px] border border-border-dark bg-card-dark p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-primary">
              <span className="size-2 rounded-full bg-primary"></span>
              Framework Library
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-white">Biblioteca de frameworks e estruturas nativas do FBR-MKT</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Esta area substitui playbooks operacionais antigos por estruturas de raciocinio, despacho e planejamento estrategico.
            </p>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">Tenant</p>
            <p className="mt-2 text-sm font-bold text-white">{tenantId ? 'Conectado' : 'Sem tenant ativo'}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {frameworks.map((item) => (
          <article key={item.title} className="rounded-2xl border border-border-dark bg-card-dark p-6">
            <h3 className="text-lg font-black text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.useCase}</p>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Playbooks;
