import React from 'react';

const testTracks = [
  {
    title: 'Teste de mensagem institucional',
    hypothesis: 'Narrativa com clareza estrategica melhora aderencia antes da oferta.',
    guardrail: 'Nao escalar sem sinal de entendimento de proposta de valor.',
  },
  {
    title: 'Teste de bundle consultivo',
    hypothesis: 'Pacote integrado reduz friccao comercial em contas mais complexas.',
    guardrail: 'Validar margem e escopo antes de abrir canal pago ou outreach.',
  },
  {
    title: 'Teste editorial de autoridade',
    hypothesis: 'Conteudo guiado por tese aumenta confianca e prepara demanda futura.',
    guardrail: 'Medir impacto em percepcao e resposta comercial, nao apenas clique.',
  },
];

const PaidTrafficPage: React.FC<{ tenantId: string | null }> = ({ tenantId }) => {
  return (
    <div className="p-4 lg:p-8 text-white space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <section className="rounded-[28px] border border-border-dark bg-card-dark p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-primary">
              <span className="size-2 rounded-full bg-primary"></span>
              Growth Tests
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tight">Testes de crescimento orientados por hipotese, nao por volume cego</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              No `FBR-MKT`, esta area nao opera midia. Ela define trilhas de experimento para validar tese, mensagem e viabilidade antes da escala.
            </p>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">Tenant</p>
            <p className="mt-2 text-sm font-bold text-white">{tenantId ? 'Conectado' : 'Sem tenant ativo'}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4">
        {testTracks.map((item) => (
          <article key={item.title} className="rounded-2xl border border-border-dark bg-card-dark p-6">
            <h3 className="text-lg font-black text-white">{item.title}</h3>
            <p className="mt-3 text-sm text-slate-300">
              <span className="font-bold text-primary">Hipotese:</span> {item.hypothesis}
            </p>
            <div className="mt-4 rounded-2xl border border-white/8 bg-background-dark/50 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Guardrail</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.guardrail}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default PaidTrafficPage;
