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

type ProjectBriefingRow = {
  id: string;
  target_audience: string | null;
  core_offer: string | null;
  goals: string | null;
};

const valuePillars = [
  'Clareza estrategica',
  'Execucao integrada',
  'Leitura de mercado',
  'IA com governanca',
  'Ecossistema coordenado',
];

const proofAngles = [
  'Capacidade de orquestrar Sales, Design, Video, Redacao, Finance e Dev.',
  'Transformacao de sinais e tendencias em recomendacoes praticas.',
  'Velocidade para sair de hipotese para plano acionavel.',
  'Governanca e leitura executiva em cima dos projetos filhos.',
];

const StrategySetup: React.FC<{ tenantId?: string | null }> = ({ tenantId }) => {
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [strategies, setStrategies] = useState<StrategyRow[]>([]);
  const [briefingId, setBriefingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedPillars, setSelectedPillars] = useState<string[]>(['Clareza estrategica', 'Execucao integrada']);
  const [tone, setTone] = useState('Executivo, seguro e orientado a decisao');
  const [coreProblem, setCoreProblem] = useState(
    'O mercado percebe muitas capacidades isoladas, mas ainda nao enxerga com clareza a FBR como ecossistema coordenado.'
  );
  const [promise, setPromise] = useState(
    'Transformar leitura de mercado e inteligencia estrategica em direcionamento pratico para acelerar posicionamento, campanhas e crescimento.'
  );

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
      setBriefingId(null);
      return;
    }

    void loadStrategies(selectedProjectId);
    void loadBriefing(selectedProjectId);
  }, [tenantId, selectedProjectId]);

  const loadProjects = async () => {
    if (!tenantId) return;

    const { data, error } = await supabase.from('projects').select('id, name').eq('tenant_id', tenantId).order('name');

    if (error) {
      setLoadError(error.message);
      return;
    }

    const list = (data || []) as ProjectRow[];
    setProjects(list);
    setSelectedProjectId((current) => current || list[0]?.id || null);
    setLoadError(null);
  };

  const loadStrategies = async (projectId: string) => {
    const { data, error } = await supabase
      .from('strategies')
      .select('id, name, strategy_type, created_at')
      .eq('tenant_id', tenantId)
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) {
      setLoadError(error.message);
      return;
    }

    setStrategies((data || []) as StrategyRow[]);
    setLoadError(null);
  };

  const loadBriefing = async (projectId: string) => {
    const { data, error } = await supabase
      .from('project_briefings')
      .select('id, target_audience, core_offer, goals')
      .eq('tenant_id', tenantId)
      .eq('project_id', projectId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      setLoadError(error.message);
      return;
    }

    const briefing = data as ProjectBriefingRow | null;
    setBriefingId(briefing?.id || null);

    if (briefing) {
      setSelectedPillars(
        briefing.target_audience
          ? briefing.target_audience.split(',').map((item) => item.trim()).filter(Boolean)
          : ['Clareza estrategica', 'Execucao integrada']
      );
      setPromise(briefing.core_offer || '');
      setCoreProblem(briefing.goals || '');
    } else {
      setSelectedPillars(['Clareza estrategica', 'Execucao integrada']);
      setPromise(
        'Transformar leitura de mercado e inteligencia estrategica em direcionamento pratico para acelerar posicionamento, campanhas e crescimento.'
      );
      setCoreProblem(
        'O mercado percebe muitas capacidades isoladas, mas ainda nao enxerga com clareza a FBR como ecossistema coordenado.'
      );
    }

    setLoadError(null);
  };

  const togglePillar = (pillar: string) => {
    setSelectedPillars((current) =>
      current.includes(pillar) ? current.filter((item) => item !== pillar) : [...current, pillar]
    );
  };

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId)?.name || 'Projeto sem nome',
    [projects, selectedProjectId]
  );

  const handleSaveStrategy = async () => {
    if (!tenantId || !selectedProjectId) return;

    setSaving(true);

    const strategyName = `Positioning Studio - ${selectedProject}`;
    const strategyType = 'positioning';

    const { error } = await supabase.from('strategies').insert({
      tenant_id: tenantId,
      project_id: selectedProjectId,
      name: strategyName,
      strategy_type: strategyType,
    });

    if (error) {
      setLoadError(error.message);
      setSaving(false);
      return;
    }

    const briefingPayload = {
      tenant_id: tenantId,
      project_id: selectedProjectId,
      target_audience: selectedPillars.join(', '),
      core_offer: promise,
      goals: coreProblem,
      budget_monthly: 0,
    };

    const briefingQuery = briefingId
      ? supabase.from('project_briefings').update(briefingPayload).eq('id', briefingId)
      : supabase.from('project_briefings').insert(briefingPayload);

    const { data: briefingData, error: briefingError } = briefingId
      ? await briefingQuery.select('id').maybeSingle()
      : await briefingQuery.select('id').single();

    if (briefingError) {
      setLoadError(briefingError.message);
      setSaving(false);
      return;
    }

    if (!briefingId && briefingData?.id) {
      setBriefingId(briefingData.id);
    }

    await loadStrategies(selectedProjectId);
    setSaving(false);
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <section className="rounded-[28px] border border-border-dark bg-card-dark p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.26em] text-primary">
              <span className="size-2 rounded-full bg-primary"></span>
              Positioning Studio
            </div>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-white">Refinamento de posicionamento, proposta de valor e narrativa-mestre</h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              O `FBR-MKT` organiza a leitura estrategica de cada projeto e consolida a linguagem que vai orientar vendas, criacao,
              campanhas e tomada de decisao.
            </p>
          </div>

          <div className="rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">Tenant</p>
            <p className="mt-2 text-sm font-bold text-white">{tenantId ? 'Conectado ao workspace ativo' : 'Sem workspace ativo'}</p>
          </div>
        </div>
      </section>

      {loadError && <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-300">{loadError}</div>}

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-border-dark bg-card-dark p-6">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Projeto em foco</p>
              <button
                onClick={handleSaveStrategy}
                disabled={!selectedProjectId || saving}
                className="rounded-xl bg-primary px-4 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-white shadow-lg shadow-primary/20 transition hover:bg-blue-500 disabled:opacity-50"
              >
                {saving ? 'Salvando...' : 'Salvar estrategia'}
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => setSelectedProjectId(project.id)}
                    className={`rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                      selectedProjectId === project.id
                        ? 'bg-primary/15 text-primary border border-primary/20'
                        : 'bg-background-dark/60 text-slate-400 border border-white/10 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {project.name}
                  </button>
                ))
              ) : (
                <p className="text-sm text-slate-500">Nenhum projeto cadastrado ainda.</p>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-border-dark bg-card-dark p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Tensao central do mercado</p>
            <textarea
              value={coreProblem}
              onChange={(event) => setCoreProblem(event.target.value)}
              className="mt-4 h-32 w-full rounded-2xl border border-white/10 bg-background-dark/60 px-4 py-4 text-sm leading-relaxed text-slate-200 outline-none transition focus:border-primary/40"
            />
          </div>

          <div className="rounded-3xl border border-border-dark bg-card-dark p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Promessa central</p>
            <textarea
              value={promise}
              onChange={(event) => setPromise(event.target.value)}
              className="mt-4 h-32 w-full rounded-2xl border border-white/10 bg-background-dark/60 px-4 py-4 text-sm leading-relaxed text-slate-200 outline-none transition focus:border-primary/40"
            />
          </div>

          <div className="rounded-3xl border border-border-dark bg-card-dark p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Pilares de valor</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {valuePillars.map((pillar) => {
                const selected = selectedPillars.includes(pillar);
                return (
                  <button
                    key={pillar}
                    onClick={() => togglePillar(pillar)}
                    className={`rounded-full px-4 py-3 text-sm font-bold transition-all ${
                      selected
                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                        : 'bg-background-dark/60 text-slate-400 border border-white/10 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {pillar}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Sintese de posicionamento</p>
            <h3 className="mt-3 text-2xl font-black tracking-tight text-white">{selectedProject}</h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">{promise}</p>
            <div className="mt-5 rounded-2xl border border-primary/10 bg-background-dark/40 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Tom sugerido</p>
              <p className="mt-2 text-sm font-bold text-white">{tone}</p>
            </div>
          </div>

          <div className="rounded-3xl border border-border-dark bg-card-dark p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Provas e angulos</p>
            <div className="mt-4 space-y-3">
              {proofAngles.map((angle) => (
                <div key={angle} className="rounded-2xl border border-white/8 bg-background-dark/50 p-4">
                  <p className="text-sm leading-relaxed text-slate-300">{angle}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border-dark bg-card-dark p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Estrategias salvas</p>
            <div className="mt-4 space-y-3">
              {strategies.length > 0 ? (
                strategies.map((strategy) => (
                  <div key={strategy.id} className="rounded-2xl border border-white/8 bg-background-dark/50 p-4">
                    <p className="text-sm font-bold leading-relaxed text-white">{strategy.name}</p>
                    <p className="mt-2 text-[10px] font-black uppercase tracking-[0.18em] text-primary">
                      {strategy.strategy_type || 'strategy'}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">Nenhuma estrategia salva para este projeto ainda.</p>
              )}
            </div>
          </div>
        </aside>
      </section>

      <section className="rounded-3xl border border-border-dark bg-card-dark p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Modo narrativo</p>
            <h3 className="mt-2 text-xl font-black text-white">Ajuste fino da linguagem-mestre</h3>
          </div>
          <input
            value={tone}
            onChange={(event) => setTone(event.target.value)}
            className="w-full max-w-xl rounded-2xl border border-white/10 bg-background-dark/60 px-4 py-3 text-sm font-bold text-slate-200 outline-none transition focus:border-primary/40"
          />
        </div>
      </section>
    </div>
  );
};

export default StrategySetup;
