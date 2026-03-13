import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '../services/supabaseClient';

type ProjectStatus = 'active' | 'paused' | 'archived';

interface StrategicProject {
  id: string;
  name: string;
  niche: string | null;
  mission: string | null;
  status: ProjectStatus;
  monthly_budget: number | null;
  global_objectives: string[];
  philosophical_goals: string[];
  constraints: string | { text?: string } | null;
  automation_policy: { autonomy?: number } | string | null;
  created_at: string;
}

const initialForm = {
  name: '',
  niche: '',
  mission: '',
  status: 'active' as ProjectStatus,
  monthlyBudget: '0',
  objectives: '',
  principles: '',
  constraints: '',
  autonomy: '70',
};

const statusLabel: Record<ProjectStatus, string> = {
  active: 'Ativo',
  paused: 'Pausado',
  archived: 'Arquivado',
};

const statusTone: Record<ProjectStatus, string> = {
  active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  paused: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  archived: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
};

const parseStringList = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item)).filter(Boolean);
  }

  if (typeof value === 'string' && value.trim()) {
    return value
      .split(/[,\n]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const normalizeText = (value: unknown): string => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && value && 'text' in value) {
    return String((value as { text?: unknown }).text ?? '');
  }
  return '';
};

const normalizeAutonomy = (value: unknown): number => {
  if (typeof value === 'object' && value && 'autonomy' in value) {
    return Number((value as { autonomy?: unknown }).autonomy ?? 70);
  }
  return 70;
};

const Products: React.FC<{ tenantId?: string | null }> = ({ tenantId }) => {
  const [projects, setProjects] = useState<StrategicProject[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<StrategicProject | null>(null);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (!tenantId) {
      setProjects([]);
      setSelectedProjectId(null);
      return;
    }

    void loadProjects();
  }, [tenantId]);

  const loadProjects = async () => {
    if (!tenantId) return;

    setLoading(true);
    setError(null);

    const { data, error: loadError } = await supabase
      .from('projects')
      .select('id, name, niche, mission, status, monthly_budget, global_objectives, philosophical_goals, constraints, automation_policy, created_at')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false });

    if (loadError) {
      setError(loadError.message);
      setProjects([]);
      setLoading(false);
      return;
    }

    const normalized = ((data || []) as StrategicProject[]).map((project) => ({
      ...project,
      global_objectives: parseStringList(project.global_objectives),
      philosophical_goals: parseStringList(project.philosophical_goals),
    }));

    setProjects(normalized);
    setSelectedProjectId((current) => current || normalized[0]?.id || null);
    setLoading(false);
  };

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) || null,
    [projects, selectedProjectId]
  );

  const openCreateModal = () => {
    setEditingProject(null);
    setForm(initialForm);
    setIsModalOpen(true);
  };

  const openEditModal = () => {
    if (!selectedProject) return;

    setEditingProject(selectedProject);
    setForm({
      name: selectedProject.name,
      niche: selectedProject.niche || '',
      mission: selectedProject.mission || '',
      status: selectedProject.status,
      monthlyBudget: String(selectedProject.monthly_budget || 0),
      objectives: selectedProject.global_objectives.join('\n'),
      principles: selectedProject.philosophical_goals.join('\n'),
      constraints: normalizeText(selectedProject.constraints),
      autonomy: String(normalizeAutonomy(selectedProject.automation_policy)),
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setForm(initialForm);
  };

  const handleSave = async () => {
    if (!tenantId || !form.name.trim()) return;

    setSaving(true);
    setError(null);

    const payload = {
      tenant_id: tenantId,
      name: form.name.trim(),
      niche: form.niche.trim() || null,
      mission: form.mission.trim() || null,
      status: form.status,
      monthly_budget: Number(form.monthlyBudget || 0),
      global_objectives: parseStringList(form.objectives),
      philosophical_goals: parseStringList(form.principles),
      constraints: { text: form.constraints.trim() },
      automation_policy: { autonomy: Number(form.autonomy || 70) },
    };

    const query = editingProject
      ? supabase.from('projects').update(payload).eq('id', editingProject.id)
      : supabase.from('projects').insert(payload);

    const { error: saveError } = await query;

    if (saveError) {
      setError(saveError.message);
      setSaving(false);
      return;
    }

    await loadProjects();
    closeModal();
    setSaving(false);
  };

  return (
    <div className="p-4 lg:p-8 space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <section className="rounded-[28px] border border-border-dark bg-card-dark p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-primary">
              <span className="size-2 rounded-full bg-primary"></span>
              Projetos Estrategicos
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-white">Portfolio vivo das iniciativas que o FBR-MKT precisa conduzir</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Aqui ficam os projetos sob leitura estrategica, com objetivo, tese, restricoes e autonomia operacional por tenant.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={openCreateModal}
              className="rounded-xl bg-primary px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white shadow-lg shadow-primary/20 transition hover:bg-blue-500"
            >
              Novo projeto
            </button>
            <button
              onClick={openEditModal}
              disabled={!selectedProject}
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-slate-200 transition hover:bg-white/10 disabled:opacity-40"
            >
              Editar selecionado
            </button>
          </div>
        </div>
      </section>

      {error && <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-300">{error}</div>}

      <section className="grid grid-cols-1 gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Portfolio por tenant</p>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">{projects.length} registros</span>
          </div>

          {loading ? (
            <div className="rounded-3xl border border-border-dark bg-card-dark p-8 text-sm text-slate-500">Carregando projetos...</div>
          ) : projects.length === 0 ? (
            <div className="rounded-3xl border-2 border-dashed border-white/8 bg-card-dark p-10 text-center">
              <p className="text-lg font-black text-white">Nenhum projeto estrategico ainda</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Crie o primeiro projeto para começar a organizar objetivos, tese e restricoes do `FBR-MKT`.
              </p>
              <button
                onClick={openCreateModal}
                className="mt-6 rounded-xl bg-primary px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white shadow-lg shadow-primary/20 transition hover:bg-blue-500"
              >
                Criar primeiro projeto
              </button>
            </div>
          ) : (
            projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProjectId(project.id)}
                className={`w-full rounded-3xl border p-6 text-left transition-all ${
                  selectedProjectId === project.id
                    ? 'border-primary bg-primary/10 shadow-lg shadow-primary/10'
                    : 'border-border-dark bg-card-dark hover:border-white/15'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-black text-white">{project.name}</h3>
                    <p className="mt-2 text-sm text-slate-400">{project.mission || 'Sem missao registrada ainda.'}</p>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${statusTone[project.status]}`}>
                    {statusLabel[project.status]}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                    {project.niche || 'Sem nicho'}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                    Budget R$ {(project.monthly_budget || 0).toLocaleString('pt-BR')}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>

        <div className="space-y-6">
          {selectedProject ? (
            <>
              <div className="rounded-3xl border border-border-dark bg-card-dark p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Projeto selecionado</p>
                    <h3 className="mt-2 text-3xl font-black text-white">{selectedProject.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{selectedProject.mission || 'Sem missao definida.'}</p>
                  </div>
                  <div className={`rounded-full border px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] ${statusTone[selectedProject.status]}`}>
                    {statusLabel[selectedProject.status]}
                  </div>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl border border-border-dark bg-card-dark p-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Objetivos globais</p>
                  <div className="mt-4 space-y-3">
                    {selectedProject.global_objectives.length > 0 ? (
                      selectedProject.global_objectives.map((objective) => (
                        <div key={objective} className="rounded-2xl border border-white/8 bg-background-dark/50 p-4 text-sm font-bold text-white">
                          {objective}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500">Sem objetivos registrados.</p>
                    )}
                  </div>
                </div>

                <div className="rounded-3xl border border-border-dark bg-card-dark p-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Princpios e tese</p>
                  <div className="mt-4 space-y-3">
                    {selectedProject.philosophical_goals.length > 0 ? (
                      selectedProject.philosophical_goals.map((principle) => (
                        <div key={principle} className="rounded-2xl border border-white/8 bg-background-dark/50 p-4 text-sm font-bold text-white">
                          {principle}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500">Sem principios registrados.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
                <div className="rounded-3xl border border-border-dark bg-card-dark p-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Restricoes operacionais</p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-300">
                    {normalizeText(selectedProject.constraints) || 'Nenhuma restricao registrada ate o momento.'}
                  </p>
                </div>

                <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Politica de autonomia</p>
                  <p className="mt-3 text-4xl font-black text-white">{normalizeAutonomy(selectedProject.automation_policy)}%</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    Nivel sugerido de autonomia operacional e de decisao para agentes e fluxos assistidos.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-3xl border-2 border-dashed border-white/8 bg-card-dark p-12 text-center">
              <p className="text-lg font-black text-white">Selecione um projeto</p>
              <p className="mt-2 text-sm text-slate-500">Escolha um item do portfolio para ver a leitura estrategica consolidada.</p>
            </div>
          )}
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-3xl rounded-[32px] border border-border-dark bg-card-dark p-8 shadow-2xl space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  {editingProject ? 'Editar projeto estrategico' : 'Novo projeto estrategico'}
                </p>
                <h3 className="mt-2 text-2xl font-black text-white">
                  {editingProject ? editingProject.name : 'Formalizar iniciativa no FBR-MKT'}
                </h3>
              </div>
              <button onClick={closeModal} className="text-slate-500 transition hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Nome</label>
                <input
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  className="w-full rounded-2xl border border-white/10 bg-background-dark/60 px-4 py-3 text-sm text-white outline-none transition focus:border-primary/40"
                />
              </div>
              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Nicho ou contexto</label>
                <input
                  value={form.niche}
                  onChange={(event) => setForm((current) => ({ ...current, niche: event.target.value }))}
                  className="w-full rounded-2xl border border-white/10 bg-background-dark/60 px-4 py-3 text-sm text-white outline-none transition focus:border-primary/40"
                />
              </div>
              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Status</label>
                <select
                  value={form.status}
                  onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as ProjectStatus }))}
                  className="w-full rounded-2xl border border-white/10 bg-background-dark/60 px-4 py-3 text-sm text-white outline-none transition focus:border-primary/40"
                >
                  <option value="active">Ativo</option>
                  <option value="paused">Pausado</option>
                  <option value="archived">Arquivado</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Budget mensal</label>
                <input
                  type="number"
                  value={form.monthlyBudget}
                  onChange={(event) => setForm((current) => ({ ...current, monthlyBudget: event.target.value }))}
                  className="w-full rounded-2xl border border-white/10 bg-background-dark/60 px-4 py-3 text-sm text-white outline-none transition focus:border-primary/40"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Missao</label>
              <textarea
                value={form.mission}
                onChange={(event) => setForm((current) => ({ ...current, mission: event.target.value }))}
                className="h-28 w-full rounded-2xl border border-white/10 bg-background-dark/60 px-4 py-4 text-sm text-white outline-none transition focus:border-primary/40"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Objetivos globais</label>
                <textarea
                  value={form.objectives}
                  onChange={(event) => setForm((current) => ({ ...current, objectives: event.target.value }))}
                  placeholder="Um por linha"
                  className="h-32 w-full rounded-2xl border border-white/10 bg-background-dark/60 px-4 py-4 text-sm text-white outline-none transition focus:border-primary/40"
                />
              </div>
              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Princpios ou tese</label>
                <textarea
                  value={form.principles}
                  onChange={(event) => setForm((current) => ({ ...current, principles: event.target.value }))}
                  placeholder="Um por linha"
                  className="h-32 w-full rounded-2xl border border-white/10 bg-background-dark/60 px-4 py-4 text-sm text-white outline-none transition focus:border-primary/40"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[1fr_0.35fr]">
              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Restricoes operacionais</label>
                <textarea
                  value={form.constraints}
                  onChange={(event) => setForm((current) => ({ ...current, constraints: event.target.value }))}
                  className="h-24 w-full rounded-2xl border border-white/10 bg-background-dark/60 px-4 py-4 text-sm text-white outline-none transition focus:border-primary/40"
                />
              </div>
              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Autonomia %</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={form.autonomy}
                  onChange={(event) => setForm((current) => ({ ...current, autonomy: event.target.value }))}
                  className="w-full rounded-2xl border border-white/10 bg-background-dark/60 px-4 py-3 text-sm text-white outline-none transition focus:border-primary/40"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 transition hover:bg-white/10"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-[1.4] rounded-2xl bg-primary px-4 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-primary/20 transition hover:bg-blue-500 disabled:opacity-50"
              >
                {saving ? 'Salvando...' : editingProject ? 'Salvar alteracoes' : 'Criar projeto'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
