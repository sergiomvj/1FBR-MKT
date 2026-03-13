import React from 'react';

const prioritySignals = [
  {
    title: 'Concorrencia avancando em bundles consultivos',
    detail: 'Tratar como sinal de reposicionamento comercial para Facebrasil e operacoes de conteudo.',
    tone: 'risk',
    eta: 'Atualizado ha 18 min',
  },
  {
    title: 'Demanda crescente por estruturas de marca com IA aplicada',
    detail: 'Abrir trilha de proposta de valor transversal para Design, Redacao, Video e Dev.',
    tone: 'opportunity',
    eta: 'Atualizado ha 31 min',
  },
  {
    title: 'Leads quentes pedindo clareza de pacote e narrativa',
    detail: 'Despachar orientacao para Sales revisar bundles, pitch e criterio de qualificacao.',
    tone: 'action',
    eta: 'Atualizado ha 44 min',
  },
];

const strategicFronts = [
  {
    name: 'Facebrasil',
    hypothesis: 'Reposicionar como plataforma-matriz de reputacao, audiencia e distribuicao.',
    nextMove: 'Validar tese com pacote institucional, narrativas e plano de campanha.',
    status: 'Em modelagem',
  },
  {
    name: 'FBRShop',
    hypothesis: 'Abrir novas linhas de monetizacao por ativos e bundles tematicos.',
    nextMove: 'Cruzar dados comerciais com Finance para teste de margem e priorizacao.',
    status: 'Pronto para cenario',
  },
  {
    name: 'Pulse&Perspective',
    hypothesis: 'Ganhar tracao como ativo editorial premium guiado por tendencias.',
    nextMove: 'Direcionar Redacao e Video para prova editorial de 30 dias.',
    status: 'Em despacho',
  },
];

const dispatchQueue = [
  {
    target: 'FBR-Sales',
    title: 'Atualizar proposta de valor e bundles de entrada',
    owner: 'Commercial Strategy',
  },
  {
    target: 'FBR-Design',
    title: 'Criar assets para nova linha institucional e comparativos',
    owner: 'Creative Ops',
  },
  {
    target: 'FBR-Finance',
    title: 'Simular viabilidade de 3 cenarios com custo e retorno',
    owner: 'Finance Intelligence',
  },
  {
    target: 'FBR-Dev',
    title: 'Abrir trilha de captacao automatica de sinais competitivos',
    owner: 'Platform Ops',
  },
];

const toneClasses: Record<string, string> = {
  risk: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  opportunity: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  action: 'bg-primary/10 text-primary border-primary/20',
};

const Dashboard: React.FC<{ tenantId?: string | null; setActiveTab?: (tab: string) => void }> = ({
  tenantId,
  setActiveTab,
}) => {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <section className="relative overflow-hidden rounded-[28px] border border-primary/20 bg-[radial-gradient(circle_at_top_left,_rgba(57,124,255,0.24),_transparent_40%),linear-gradient(135deg,_rgba(15,23,42,0.96),_rgba(2,6,23,0.96))] p-8 shadow-2xl shadow-primary/10">
        <div className="absolute inset-y-0 right-0 w-1/3 bg-[linear-gradient(135deg,_rgba(56,189,248,0.10),_transparent)] pointer-events-none" />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.28em] text-primary">
              <span className="size-2 rounded-full bg-primary"></span>
              FBR-MKT Strategic Layer
            </div>
            <h2 className="text-4xl font-black tracking-tight text-white">Command Center</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">
              Sistema de inteligencia estrategica da FBR para transformar sinais, tendencias e hipoteses em direcionamento pratico
              para o ecossistema.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                Workspace: {tenantId ? 'Conectado ao tenant ativo' : 'Sem tenant ativo'}
              </span>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-emerald-300">
                4 integracoes prioritarias mapeadas
              </span>
              <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-amber-300">
                3 hipoteses em validacao
              </span>
            </div>
          </div>

          <div className="grid w-full max-w-2xl grid-cols-2 gap-4">
            {[
              { label: 'Sinais priorizados', value: '12', helper: '6 com impacto alto' },
              { label: 'Diretrizes prontas', value: '07', helper: '4 aguardando dispatch' },
              { label: 'Cenarios ativos', value: '03', helper: '1 pronto para Finance' },
              { label: 'Projetos sob leitura', value: '09', helper: 'ecossistema FBR' },
            ].map((card) => (
              <div key={card.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">{card.label}</p>
                <h3 className="mt-3 text-3xl font-black text-white">{card.value}</h3>
                <p className="mt-2 text-xs text-slate-400">{card.helper}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {prioritySignals.map((signal) => (
          <article key={signal.title} className="rounded-2xl border border-border-dark bg-card-dark p-6">
            <div className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] ${toneClasses[signal.tone]}`}>
              {signal.tone === 'risk' ? 'Risco' : signal.tone === 'opportunity' ? 'Oportunidade' : 'Acao recomendada'}
            </div>
            <h3 className="mt-4 text-lg font-black tracking-tight text-white">{signal.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{signal.detail}</p>
            <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">{signal.eta}</p>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-12 rounded-3xl border border-border-dark bg-card-dark p-6 xl:col-span-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Frentes estrategicas</p>
              <h3 className="mt-2 text-2xl font-black tracking-tight text-white">Iniciativas que o ecossistema precisa destravar agora</h3>
            </div>
            <button
              onClick={() => setActiveTab?.('planning')}
              className="rounded-xl border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-primary transition hover:bg-primary/20"
            >
              Abrir radar
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {strategicFronts.map((front) => (
              <div key={front.name} className="rounded-2xl border border-white/8 bg-background-dark/50 p-5">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h4 className="text-lg font-black text-white">{front.name}</h4>
                    <p className="mt-2 text-sm text-slate-300">
                      <span className="font-bold text-primary">Hipotese:</span> {front.hypothesis}
                    </p>
                    <p className="mt-2 text-sm text-slate-400">
                      <span className="font-bold text-slate-200">Proximo movimento:</span> {front.nextMove}
                    </p>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                    {front.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="col-span-12 rounded-3xl border border-primary/20 bg-primary/5 p-6 xl:col-span-4">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-primary">Despacho do sistema</p>
          <h3 className="mt-2 text-2xl font-black tracking-tight text-white">Recomendacoes prontas para os modulos FBR</h3>
          <div className="mt-6 space-y-3">
            {dispatchQueue.map((item) => (
              <div key={item.target + item.title} className="rounded-2xl border border-primary/10 bg-background-dark/50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{item.target}</span>
                  <span className="material-symbols-outlined text-slate-500">north_east</span>
                </div>
                <p className="mt-3 text-sm font-bold leading-relaxed text-white">{item.title}</p>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">{item.owner}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-3">
            <button
              onClick={() => setActiveTab?.('decisions')}
              className="rounded-xl bg-primary px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-white shadow-lg shadow-primary/20 transition hover:bg-blue-500"
            >
              Abrir decision room
            </button>
            <button
              onClick={() => setActiveTab?.('strategy')}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-slate-200 transition hover:bg-white/10"
            >
              Refinar posicionamento
            </button>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default Dashboard;
