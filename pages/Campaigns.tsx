import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '../services/supabaseClient';

type ProjectRow = {
  id: string;
  name: string;
};

type StrategyRow = {
  id: string;
  name: string;
  strategy_type: string | null;
  created_at: string;
};

type BriefingRow = {
  id: string;
  target_audience: string | null;
  core_offer: string | null;
  goals: string | null;
};

const channelRecommendations = [
  { channel: 'Institucional', useCase: 'Reposicionamento e narrativa-mestre', cadence: 'Quinzenal' },
  { channel: 'Comercial', useCase: 'Bundles, provas de valor e pitch', cadence: 'Semanal' },
  { channel: 'Editorial', useCase: 'Construcao de autoridade e leitura de mercado', cadence: 'Continua' },
  { channel: 'Relacional', useCase: 'Follow-up executivo e materiais de decisao', cadence: 'Sob demanda' },
];

const Campaigns: React.FC<{ tenantId?: string | null }> = ({ tenantId }) => {
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [strategies, setStrategies] = useState<StrategyRow[]>([]);
  const [briefing, setBriefing] = useState<BriefingRow | null>(null);
  const [loading, setLoading] = useState(false);
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
      setBriefing(null);
      return;
    }

    void loadProjectContext(selectedProjectId);
  }, [tenantId, selectedProjectId]);

  const loadProjects = async () => {
    if (!tenantId) return;

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

  const loadProjectContext = async (projectId: string) => {
    setLoading(true);

    const [{ data: strategiesData, error: strategiesError }, { data: briefingData, error: briefingError }] = await Promise.all([
      supabase
        .from('strategies')
        .select('id, name, strategy_type, created_at')
        .eq('tenant_id', tenantId)
        .eq('project_id', projectId)
        .order('created_at', { ascending: false }),
      supabase
        .from('project_briefings')
        .select('id, target_audience, core_offer, goals')
        .eq('tenant_id', tenantId)
        .eq('project_id', projectId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle(),
    ]);

    if (strategiesError || briefingError) {
      setError(strategiesError?.message || briefingError?.message || 'Erro ao carregar contexto do projeto.');
      setLoading(false);
      return;
    }

    setStrategies((strategiesData || []) as StrategyRow[]);
    setBriefing((briefingData as BriefingRow | null) || null);
    setError(null);
    setLoading(false);
  };

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId)?.name || 'Projeto',
    [projects, selectedProjectId]
  );

  const targetAudienceList = briefing?.target_audience
    ? briefing.target_audience.split(',').map((item) => item.trim()).filter(Boolean)
    : [];

  return (
    <div className="p-4 lg:p-8 space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <section className="rounded-[28px] border border-border-dark bg-card-dark p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-primary">
              <span className="size-2 rounded-full bg-primary"></span>
              Diretrizes e Campanhas
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-white">Transformar estrategia em campanhas macro e despachos intersistemas</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Esta area agora consome o que foi consolidado no `Positioning Studio` e prepara o movimento operacional do ecossistema.
            </p>
          </div>

          <div className="rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">Workspace</p>
            <p className="mt-2 text-sm font-bold text-white">{tenantId ? 'Tenant conectado' : 'Sem tenant ativo'}</p>
          </div>
        </div>
      </section>

      {error && <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-300">{error}</div>}

      <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-border-dark bg-card-dark p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Brief macro persistido</p>
            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Projeto</label>
                <select
                  value={selectedProjectId || ''}
                  onChange={(event) => setSelectedProjectId(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-background-dark/60 px-4 py-3 text-sm text-white outline-none transition focus:border-primary/40"
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
                <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Promessa consolidada</label>
                <div className="rounded-2xl border border-white/8 bg-background-dark/50 p-4 text-sm leading-relaxed text-slate-300">
                  {briefing?.core_offer || 'Nenhuma promessa persistida ainda para este projeto.'}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Problema ou tensao central</label>
                <div className="rounded-2xl border border-white/8 bg-background-dark/50 p-4 text-sm leading-relaxed text-slate-300">
                  {briefing?.goals || 'Nenhum briefing persistido ainda.'}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Pilares transportados</label>
                <div className="flex flex-wrap gap-2">
                  {targetAudienceList.length > 0 ? (
                    targetAudienceList.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-primary/20 bg-primary/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-primary"
                      >
                        {item}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">Nenhum pilar persistido ainda.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Recomendacao do sistema</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Priorize campanhas que nascem de uma tese de posicionamento consolidada e que ja tenham destino claro em Sales, Design, Redacao ou Finance.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-border-dark bg-card-dark p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Strategies persistidas</p>
                <h3 className="mt-2 text-2xl font-black text-white">O que ja foi salvo para orientar as campanhas</h3>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                {selectedProject}
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {loading ? (
                <div className="rounded-2xl border border-white/8 bg-background-dark/50 p-5 text-sm text-slate-500">Carregando contexto...</div>
              ) : strategies.length > 0 ? (
                strategies.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-white/8 bg-background-dark/50 p-5">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">{item.strategy_type || 'strategy'}</p>
                        <p className="mt-3 text-sm font-bold leading-relaxed text-white">{item.name}</p>
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                        {new Date(item.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-white/10 bg-background-dark/40 p-8 text-center">
                  <p className="text-sm font-bold text-white">Nenhuma strategy salva ainda</p>
                  <p className="mt-2 text-sm text-slate-500">Salve uma estrategia no `Positioning Studio` para que esta area herde o contexto real.</p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-border-dark bg-card-dark p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Canais e formatos sugeridos</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {channelRecommendations.map((item) => (
                <div key={item.channel} className="rounded-2xl border border-white/8 bg-background-dark/50 p-4">
                  <h4 className="text-sm font-black text-white">{item.channel}</h4>
                  <p className="mt-2 text-sm text-slate-400">{item.useCase}</p>
                  <p className="mt-3 text-[10px] font-black uppercase tracking-[0.18em] text-primary">{item.cadence}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Campaigns;
