import React, { useState } from 'react';

interface Props {
  tenantId: string | null;
}

const signalFeed = [
  {
    source: 'FBR-Leads',
    title: 'Aumento de interesse em servicos com entrega consultiva e IA aplicada',
    summary: 'Os sinais mais quentes apontam busca por clareza de proposta, autoridade e ganho operacional.',
    priority: 'Alta prioridade',
  },
  {
    source: 'Mercado',
    title: 'Concorrentes reforcando narrativa de ecossistema e pacotes integrados',
    summary: 'Movimento sugere necessidade de diferenciar a FBR pela capacidade de coordenar estrategia, criacao, operacao e dados.',
    priority: 'Monitoramento ativo',
  },
  {
    source: 'FBR-Click',
    title: 'Leads aquecidos chegam com expectativa de direcionamento mais estrategico',
    summary: 'O ciclo comercial esta pedindo mais clareza sobre posicionamento, cenario e prova de valor antes da oferta.',
    priority: 'Acao recomendada',
  },
];

const trendClusters = [
  {
    title: 'IA aplicada com governanca humana',
    angle: 'Oportunidade para posicionar a FBR como operadora de inteligencia com execucao real.',
    confidence: '92%',
  },
  {
    title: 'Bundles consultivos com esteira de conteudo',
    angle: 'Aumenta aderencia entre estrategia, Design, Video e Redacao como pacote coordenado.',
    confidence: '84%',
  },
  {
    title: 'Demanda por leitura de mercado antes da execucao',
    angle: 'Fortalece o papel do FBR-MKT como camada de pre-decisao do ecossistema.',
    confidence: '88%',
  },
];

const competitorMap = [
  {
    competitor: 'Estudios boutique de estrategia',
    move: 'Entram com narrativas premium, mas com baixa capacidade de integracao operacional.',
    response: 'Responder com tese de ecossistema integrado e capacidade de despacho intermodulos.',
  },
  {
    competitor: 'Agencias de performance',
    move: 'Aceleram midia e criativos sem camada robusta de posicionamento.',
    response: 'Usar FBR-MKT para provar superioridade em leitura de mercado e direcionamento antes do investimento.',
  },
  {
    competitor: 'Consultorias de transformacao',
    move: 'Vendam estrategia alta, mas com pouca capacidade de materializacao.',
    response: 'Explorar o diferencial FBR: estrategia com Design, Dev, Finance, Sales e operacao no mesmo ecossistema.',
  },
];

const StrategicPlanning: React.FC<Props> = ({ tenantId }) => {
  const [activeTab, setActiveTab] = useState<'signals' | 'trends' | 'competition' | 'hypotheses'>('signals');

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <section className="rounded-[28px] border border-border-dark bg-card-dark p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.26em] text-primary">
              <span className="size-2 rounded-full bg-primary"></span>
              Radar de Mercado
            </div>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-white">Leitura viva de sinais, tendencias e movimentos do mercado</h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Aqui o `FBR-MKT` transforma indicios do mercado em contexto estrategico acionavel para o ecossistema FBR.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:w-[360px]">
            {[
              { label: 'Tenant', value: tenantId ? 'Conectado' : 'Pendente' },
              { label: 'Sinais ativos', value: '18' },
              { label: 'Clusters', value: '06' },
              { label: 'Hipoteses abertas', value: '11' },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-background-dark/60 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                <p className="mt-2 text-2xl font-black text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2 border-t border-white/5 pt-6">
          {[
            { id: 'signals', label: 'Sinais Prioritarios', icon: 'radar' },
            { id: 'trends', label: 'Clusters de Tendencia', icon: 'timeline' },
            { id: 'competition', label: 'Mapa Competitivo', icon: 'travel_explore' },
            { id: 'hypotheses', label: 'Hipoteses de Crescimento', icon: 'lightbulb' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                activeTab === tab.id ? 'bg-primary/15 text-primary border border-primary/20' : 'text-slate-500 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {activeTab === 'signals' && (
        <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          {signalFeed.map((signal) => (
            <article key={signal.title} className="rounded-2xl border border-border-dark bg-card-dark p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-primary">
                  {signal.source}
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">{signal.priority}</span>
              </div>
              <h3 className="mt-4 text-lg font-black text-white">{signal.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{signal.summary}</p>
            </article>
          ))}
        </section>
      )}

      {activeTab === 'trends' && (
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {trendClusters.map((cluster) => (
            <article key={cluster.title} className="rounded-2xl border border-border-dark bg-card-dark p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Cluster de tendencia</p>
              <h3 className="mt-3 text-xl font-black text-white">{cluster.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{cluster.angle}</p>
              <div className="mt-5 inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-400">
                Confianca {cluster.confidence}
              </div>
            </article>
          ))}
        </section>
      )}

      {activeTab === 'competition' && (
        <section className="space-y-4">
          {competitorMap.map((item) => (
            <article key={item.competitor} className="rounded-2xl border border-border-dark bg-card-dark p-6">
              <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr_1fr]">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Player observado</p>
                  <h3 className="mt-2 text-lg font-black text-white">{item.competitor}</h3>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Movimento</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.move}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Resposta sugerida</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.response}</p>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      {activeTab === 'hypotheses' && (
        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-border-dark bg-card-dark p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Pipeline de hipoteses</p>
            <div className="mt-6 space-y-4">
              {[
                'Criar linha institucional de posicionamento para projetos do grupo com alta dependencia de narrativa.',
                'Empacotar design, redacao e video como esteira orientada por tese estrategica unica.',
                'Usar sinais de leads e click para orientar reposicionamento de bundles no FBR-Sales.',
                'Abrir monitoramento recorrente de concorrencia por cluster de servico e projeto filho.',
              ].map((hypothesis, index) => (
                <div key={hypothesis} className="rounded-2xl border border-white/8 bg-background-dark/50 p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">Hipotese {index + 1}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{hypothesis}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border border-primary/20 bg-primary/5 p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Leitura do sistema</p>
            <h3 className="mt-2 text-2xl font-black text-white">O mercado esta premiando clareza estrategica com capacidade real de execucao.</h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              Isso favorece diretamente a FBR quando o `FBR-MKT` age como camada anterior de leitura, estrutura e despacho para os demais modulos.
            </p>
            <div className="mt-6 rounded-2xl border border-primary/10 bg-background-dark/40 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Proximo passo sugerido</p>
              <p className="mt-2 text-sm font-bold leading-relaxed text-white">
                Consolidar uma tese de posicionamento por projeto filho e despachar diretrizes para Sales, Design, Redacao e Finance.
              </p>
            </div>
          </aside>
        </section>
      )}
    </div>
  );
};

export default StrategicPlanning;
