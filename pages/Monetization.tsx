import React, { useState } from 'react';

const scenarios = [
  {
    name: 'Bundle consultivo de entrada',
    risk: 'Medio',
    upside: 'Alto potencial de ticket e clareza comercial',
    note: 'Depende de proposta de valor bem resolvida e escopo controlado.',
  },
  {
    name: 'Sprint editorial premium',
    risk: 'Baixo',
    upside: 'Fortalece autoridade e gera base para monetizacao futura',
    note: 'Boa opcao para projetos que ainda precisam ganhar densidade de marca.',
  },
  {
    name: 'Campanha institucional com esteira integrada',
    risk: 'Medio',
    upside: 'Alinha posicionamento, criacao e comercial em um mesmo movimento',
    note: 'Exige coordenacao entre MKT, Design, Redacao, Video e Sales.',
  },
];

const riskTone: Record<string, string> = {
  Baixo: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Medio: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Alto: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

const Monetization: React.FC<{ tenantId?: string | null }> = ({ tenantId }) => {
  const [selectedScenario, setSelectedScenario] = useState(scenarios[0].name);

  const currentScenario = scenarios.find((item) => item.name === selectedScenario) || scenarios[0];

  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <section className="rounded-[28px] border border-border-dark bg-card-dark p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-primary">
              <span className="size-2 rounded-full bg-primary"></span>
              Cenarios e Viabilidade
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-white">Leitura de risco, retorno e prioridade para novas frentes de receita</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              No `FBR-MKT`, esta area serve para preparar cenarios que serao validados com `FBR-Finance` e usados para orientar prioridades.
            </p>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">Tenant</p>
            <p className="mt-2 text-sm font-bold text-white">{tenantId ? 'Conectado' : 'Sem tenant ativo'}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-border-dark bg-card-dark p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Cenarios priorizados</p>
          <div className="mt-6 space-y-4">
            {scenarios.map((item) => (
              <button
                key={item.name}
                onClick={() => setSelectedScenario(item.name)}
                className={`w-full rounded-2xl border p-5 text-left transition-all ${
                  selectedScenario === item.name
                    ? 'border-primary bg-primary/10 shadow-lg shadow-primary/10'
                    : 'border-white/8 bg-background-dark/50 hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-black text-white">{item.name}</h3>
                  <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${riskTone[item.risk]}`}>
                    {item.risk}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-400">{item.upside}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Leitura atual</p>
            <h3 className="mt-2 text-2xl font-black text-white">{currentScenario.name}</h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">{currentScenario.note}</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-border-dark bg-card-dark p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Upside esperado</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">{currentScenario.upside}</p>
            </div>

            <div className="rounded-3xl border border-border-dark bg-card-dark p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Destino do despacho</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                Encaminhar para `FBR-Finance` validar cenario, custo, retorno e prioridade relativa dentro do portfolio.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Monetization;
