import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '../services/supabaseClient';

type DecisionCategory = 'Posicionamento' | 'Campanha' | 'Novo negocio' | 'Viabilidade';
type DecisionPriority = 'Alta' | 'Media' | 'Baixa';

type Recommendation = {
  id: string;
  title: string;
  description: string;
  rationale: string;
  action: string;
  priority: DecisionPriority;
  category: DecisionCategory;
};

type ProjectRow = {
  id: string;
  name: string;
};

type StrategyRow = {
  id: string;
  name: string;
  strategy_type: string | null;
};

const cannedRecommendations: Recommendation[] = [
  {
    id: '1',
    title: 'Reposicionar a proposta de valor antes de acelerar campanha',
    description: 'Os sinais apontam ruido de mensagem e expectativa pouco alinhada com a entrega percebida.',
    rationale: 'Sem clareza de posicionamento, o investimento em campanha tende a amplificar confusao em vez de tracao.',
    action: 'Despachar para Positioning Studio',
    priority: 'Alta',
    category: 'Posicionamento',
  },
  {
    id: '2',
    title: 'Abrir cenario financeiro para bundle consultivo',
    description: 'A oportunidade parece promissora, mas precisa de simulacao de margem e retorno antes de virar pacote principal.',
    rationale: 'O FBR-MKT deve orientar Finance e Sales antes que a nova oferta entre em execucao comercial.',
    action: 'Enviar para Finance',
    priority: 'Media',
    category: 'Viabilidade',
  },
  {
    id: '3',
    title: 'Criar diretriz macro para campanha editorial',
    description: 'O tema tem aderencia de mercado e pode fortalecer autoridade institucional com baixo risco inicial.',
    rationale: 'Narrativas consistentes aumentam a capacidade do ecossistema de sustentar vendas e posicionamento.',
    action: 'Abrir Diretriz de Campanha',
    priority: 'Media',
    category: 'Campanha',
  },
];

const priorityTone: Record<DecisionPriority, string> = {
  Alta: 'bg-rose-500 text-white',
  Media: 'bg-primary text-white',
  Baixa: 'bg-slate-700 text-white',
};

const DecisionEngine: React.FC<{ tenantId?: string | null }> = ({ tenantId }) => {
  const [context, setContext] = useState(
    'Projeto: Facebrasil. Sinais recentes: concorrencia reforcando narrativa integrada, leads pedindo clareza de pacote, Finance solicitando cenario de margem.'
  );
  const [selectedFilter, setSelectedFilter] = useState<'Todas' | DecisionCategory>('Todas');
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [strategies, setStrategies] = useState<StrategyRow[]>([]);
  const [selectedStrategyId, setSelectedStrategyId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tenantId) {
      setProjects([]);
      setSelectedProjectId(null);
      return;
    }

    void loadProjects();
  }, [tenantId]);

  useEffect(() => {
    if (!tenantId || !selectedProjectId) {
      setStrategies([]);
      setSelectedStrategyId(null);
      return;
    }

    void loadStrategies(selectedProjectId);
  }, [tenantId, selectedProjectId]);

  const loadProjects = async () => {
    const { data, error: loadError } = await supabase.from('projects').select('id, name').eq('tenant_id', tenantId).order('name');

    if (loadError) {
      setError(loadError.message);
      return;
    }

    const list = (data || []) as ProjectRow[];
    setProjects(list);
    setSelectedProjectId((current) => current || list[0]?.id || null);
    setError(null);
  };

  const loadStrategies = async (projectId: string) => {
    const { data, error: loadError } = await supabase
      .from('strategies')
      .select('id, name, strategy_type')
      .eq('tenant_id', tenantId)
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (loadError) {
      setError(loadError.message);
      return;
    }

    const list = (data || []) as StrategyRow[];
    setStrategies(list);
    setSelectedStrategyId((current) => current || list[0]?.id || null);
    setError(null);
  };

  const visibleRecommendations = useMemo(() => {
    if (selectedFilter === 'Todas') return cannedRecommendations;
    return cannedRecommendations.filter((item) => item.category === selectedFilter);
  }, [selectedFilter]);

  const handlePersistRecommendation = async (recommendation: Recommendation) => {
    if (!tenantId || !selectedStrategyId) return;

    setSavingId(recommendation.id);
    setError(null);

    const payload = {
      tenant_id: tenantId,
      strategy_id: selectedStrategyId,
      copy_assets: {
        headline: recommendation.title,
        body: recommendation.description,
        cta: recommendation.action,
      },
      kickoff_plan: [context],
      decision_rules: [
        {
          title: recommendation.title,
          category: recommendation.category,
          priority: recommendation.priority,
          rationale: recommendation.rationale,
          action: recommendation.action,
        },
      ],
    };

    const { error: saveError } = await supabase.from('strategy_blueprints').insert(payload);

    if (saveError) {
      setError(saveError.message);
    }

    setSavingId(null);
  };

  return (
    <div className="p-4 lg:p-8 space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <section className="rounded-[28px] border border-border-dark bg-card-dark p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-primary">
              <span className="size-2 rounded-full bg-primary"></span>
              Decision Room
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-white">Recomendacoes acionaveis para o que a FBR deve fazer agora</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Esta area consolida contexto estrategico e devolve decisoes com justificativa, prioridade e destino dentro do ecossistema.
            </p>
          </div>

          <div className="rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">Tenant</p>
            <p className="mt-2 text-sm font-bold text-white">{tenantId ? 'Conectado' : 'Sem tenant ativo'}</p>
          </div>
        </div>
      </section>

      {error && <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-300">{error}</div>}

      <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-border-dark bg-card-dark p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Projeto</p>
                <select
                  value={selectedProjectId || ''}
                  onChange={(event) => setSelectedProjectId(event.target.value)}
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-background-dark/60 px-4 py-3 text-sm text-white outline-none transition focus:border-primary/40"
                >
                  {projects.length === 0 ? <option value="">Sem projetos</option> : null}
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Strategy base</p>
                <select
                  value={selectedStrategyId || ''}
                  onChange={(event) => setSelectedStrategyId(event.target.value)}
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-background-dark/60 px-4 py-3 text-sm text-white outline-none transition focus:border-primary/40"
                >
                  {strategies.length === 0 ? <option value="">Sem strategies</option> : null}
                  {strategies.map((strategy) => (
                    <option key={strategy.id} value={strategy.id}>
                      {strategy.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Contexto de decisao</p>
                  <h3 className="mt-2 text-xl font-black text-white">Resumo consolidado</h3>
                </div>
                <span className="material-symbols-outlined text-primary">psychology</span>
              </div>
              <textarea
                value={context}
                onChange={(event) => setContext(event.target.value)}
                className="mt-4 h-48 w-full rounded-2xl border border-white/10 bg-background-dark/60 px-4 py-4 text-sm leading-relaxed text-slate-200 outline-none transition focus:border-primary/40"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Regra de ouro</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              A decisao so deve sair daqui quando houver clareza sobre impacto no ecossistema, modulo destinatario e criterio minimo de viabilidade.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-border-dark bg-card-dark p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Recomendacoes do sistema</p>
                <h3 className="mt-2 text-2xl font-black text-white">Fila priorizada</h3>
              </div>
              <select
                value={selectedFilter}
                onChange={(event) => setSelectedFilter(event.target.value as 'Todas' | DecisionCategory)}
                className="rounded-2xl border border-white/10 bg-background-dark/60 px-4 py-3 text-sm text-white outline-none transition focus:border-primary/40"
              >
                <option>Todas</option>
                <option>Posicionamento</option>
                <option>Campanha</option>
                <option>Novo negocio</option>
                <option>Viabilidade</option>
              </select>
            </div>

            <div className="mt-6 grid gap-4">
              {visibleRecommendations.map((rec) => (
                <article key={rec.id} className="rounded-2xl border border-white/8 bg-background-dark/50 p-5">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">{rec.category}</p>
                      <h4 className="mt-2 text-lg font-black text-white">{rec.title}</h4>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${priorityTone[rec.priority]}`}>
                      {rec.priority}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{rec.description}</p>

                  <div className="mt-4 rounded-2xl border border-white/8 bg-black/20 p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">Justificativa</p>
                    <p className="mt-2 text-sm italic leading-relaxed text-slate-400">{rec.rationale}</p>
                  </div>

                  <button
                    onClick={() => handlePersistRecommendation(rec)}
                    disabled={!selectedStrategyId || savingId === rec.id}
                    className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-white/10 disabled:opacity-50"
                  >
                    {savingId === rec.id ? 'Persistindo...' : rec.action}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DecisionEngine;
