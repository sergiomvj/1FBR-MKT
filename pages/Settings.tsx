import React, { useState } from 'react';

const Settings: React.FC<{ tenantId?: string | null }> = ({ tenantId }) => {
  const [language, setLanguage] = useState('Português (Brasil)');
  const [timezone, setTimezone] = useState('America/Sao_Paulo');
  const [autonomy, setAutonomy] = useState('70');

  return (
    <div className="p-4 lg:p-8 space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <section className="rounded-[28px] border border-border-dark bg-card-dark p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-primary">
              <span className="size-2 rounded-full bg-primary"></span>
              Configuracoes
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-white">Governanca do workspace e da camada estrategica</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Ajustes principais para o comportamento do `FBR-MKT`, linguagem e autonomia operacional dos fluxos assistidos.
            </p>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">Tenant</p>
            <p className="mt-2 text-sm font-bold text-white">{tenantId ? 'Conectado' : 'Sem tenant ativo'}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-border-dark bg-card-dark p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Idioma</p>
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className="mt-4 w-full rounded-2xl border border-white/10 bg-background-dark/60 px-4 py-3 text-sm text-white outline-none transition focus:border-primary/40"
          >
            <option>Português (Brasil)</option>
            <option>English</option>
            <option>Español</option>
          </select>
        </div>

        <div className="rounded-3xl border border-border-dark bg-card-dark p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Timezone</p>
          <select
            value={timezone}
            onChange={(event) => setTimezone(event.target.value)}
            className="mt-4 w-full rounded-2xl border border-white/10 bg-background-dark/60 px-4 py-3 text-sm text-white outline-none transition focus:border-primary/40"
          >
            <option>America/Sao_Paulo</option>
            <option>UTC</option>
          </select>
        </div>

        <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Autonomia default</p>
          <input
            type="number"
            min="0"
            max="100"
            value={autonomy}
            onChange={(event) => setAutonomy(event.target.value)}
            className="mt-4 w-full rounded-2xl border border-white/10 bg-background-dark/60 px-4 py-3 text-sm text-white outline-none transition focus:border-primary/40"
          />
          <p className="mt-3 text-sm text-slate-300">Define o patamar sugerido de autonomia para agentes e despachos assistidos.</p>
        </div>
      </section>
    </div>
  );
};

export default Settings;
