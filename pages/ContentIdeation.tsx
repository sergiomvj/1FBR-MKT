import React, { useState } from 'react';

const narrativeLines = [
  {
    title: 'Ecossistema integrado como vantagem competitiva',
    angle: 'Mostrar que a FBR nao entrega so servico isolado, mas coordenacao entre estrategia, criacao, vendas e operacao.',
    format: 'Manifesto institucional',
  },
  {
    title: 'Clareza estrategica antes da execucao',
    angle: 'Educar o mercado sobre por que planejamento e leitura de contexto melhoram ROI e evitam desperdicio.',
    format: 'Artigo e carrossel executivo',
  },
  {
    title: 'IA com governanca humana',
    angle: 'Posicionar a FBR como operadora responsavel de inteligencia aplicada, sem hype vazio.',
    format: 'Video curto e one-pager',
  },
];

const ContentIdeation: React.FC<{ tenantId?: string | null }> = ({ tenantId }) => {
  const [selectedLine, setSelectedLine] = useState(narrativeLines[0].title);
  const [editorialGoal, setEditorialGoal] = useState(
    'Construir autoridade e clareza sobre o papel da FBR como ecossistema coordenado.'
  );

  const activeLine = narrativeLines.find((item) => item.title === selectedLine) || narrativeLines[0];

  return (
    <div className="p-4 lg:p-8 text-white space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <section className="rounded-[28px] border border-border-dark bg-card-dark p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-primary">
              <span className="size-2 rounded-full bg-primary"></span>
              Narrativas e Conteudo
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tight">Linhas editoriais e narrativas que sustentam a estrategia</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Este modulo do `FBR-MKT` nao produz volume por produzir. Ele organiza narrativas para posicionamento, campanha e autoridade.
            </p>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">Tenant</p>
            <p className="mt-2 text-sm font-bold text-white">{tenantId ? 'Conectado' : 'Sem tenant ativo'}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-4">
          {narrativeLines.map((item) => (
            <button
              key={item.title}
              onClick={() => setSelectedLine(item.title)}
              className={`w-full rounded-2xl border p-5 text-left transition-all ${
                selectedLine === item.title
                  ? 'border-primary bg-primary/10 shadow-lg shadow-primary/10'
                  : 'border-border-dark bg-card-dark hover:border-white/15'
              }`}
            >
              <h3 className="text-sm font-black text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{item.format}</p>
            </button>
          ))}
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-border-dark bg-card-dark p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Linha ativa</p>
            <h3 className="mt-2 text-2xl font-black text-white">{activeLine.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">{activeLine.angle}</p>
            <div className="mt-5 rounded-2xl border border-primary/10 bg-primary/5 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">Formato sugerido</p>
              <p className="mt-2 text-sm font-bold text-white">{activeLine.format}</p>
            </div>
          </div>

          <div className="rounded-3xl border border-border-dark bg-card-dark p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Objetivo editorial</p>
            <textarea
              value={editorialGoal}
              onChange={(event) => setEditorialGoal(event.target.value)}
              className="mt-4 h-32 w-full rounded-2xl border border-white/10 bg-background-dark/60 px-4 py-4 text-sm leading-relaxed text-slate-200 outline-none transition focus:border-primary/40"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContentIdeation;
