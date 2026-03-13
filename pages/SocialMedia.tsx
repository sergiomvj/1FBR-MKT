import React from 'react';

const presenceAxes = [
  {
    platform: 'LinkedIn institucional',
    role: 'Autoridade, clareza de tese e leitura de mercado',
    nextMove: 'Distribuir narrativas executivas e provas de integracao do ecossistema.',
  },
  {
    platform: 'Instagram institucional',
    role: 'Marca, percepcao e densidade visual',
    nextMove: 'Traduzir posicionamento em linguagem mais acessivel e imagetica.',
  },
  {
    platform: 'YouTube e video',
    role: 'Explicar frameworks, bastidores e visao estrategica',
    nextMove: 'Transformar diretrizes em roteiros de autoridade e contexto.',
  },
];

const SocialMedia: React.FC<{ tenantId: string | null }> = ({ tenantId }) => {
  return (
    <div className="p-4 lg:p-8 text-white space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <section className="rounded-[28px] border border-border-dark bg-card-dark p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-primary">
              <span className="size-2 rounded-full bg-primary"></span>
              Marca e Presenca
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tight">Como o posicionamento se manifesta nos canais de presenca da FBR</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Esta area do `FBR-MKT` orienta a funcao estrategica dos canais, em vez de operar calendario social como ferramenta isolada.
            </p>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">Tenant</p>
            <p className="mt-2 text-sm font-bold text-white">{tenantId ? 'Conectado' : 'Sem tenant ativo'}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4">
        {presenceAxes.map((item) => (
          <article key={item.platform} className="rounded-2xl border border-border-dark bg-card-dark p-6">
            <h3 className="text-lg font-black text-white">{item.platform}</h3>
            <p className="mt-3 text-sm text-slate-300">
              <span className="font-bold text-primary">Papel:</span> {item.role}
            </p>
            <div className="mt-4 rounded-2xl border border-white/8 bg-background-dark/50 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Proximo movimento</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.nextMove}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default SocialMedia;
