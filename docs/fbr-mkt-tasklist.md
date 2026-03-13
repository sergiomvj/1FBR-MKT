# FBR-MKT Tasklist

## Concluido

- [x] Reaproveitar o shell atual em vez de iniciar outra stack paralela
- [x] Reposicionar o branding principal do app para `FBR-MKT`
- [x] Atualizar a navegacao lateral para modulos coerentes com inteligencia estrategica
- [x] Substituir a dashboard antiga por uma `Command Center` alinhada ao papel do sistema no ecossistema FBR
- [x] Preservar auth e selecao de workspace via Supabase
- [x] Converter `StrategicPlanning.tsx` em `Radar de Mercado`
- [x] Converter `StrategySetup.tsx` em `Positioning Studio`
- [x] Validar build do frontend apos a conversao inicial dos modulos centrais
- [x] Implementar o primeiro fluxo persistido de `Projetos Estrategicos` usando `projects`
- [x] Permitir criacao e edicao basica de projetos por tenant no app real
- [x] Reposicionar `Campaigns.tsx` como `Diretrizes e Campanhas`
- [x] Reposicionar `DecisionEngine.tsx` como `Decision Room`
- [x] Reposicionar `Insights.tsx` como `Insights Executivos`
- [x] Reposicionar `LeadsCRM.tsx` como `Leitura de Mercado`
- [x] Reposicionar `SDRCommand.tsx` como `Opportunity Desk`
- [x] Reposicionar `AutomationHub.tsx` como `Directives Hub`
- [x] Reposicionar `Monetization.tsx` como `Cenarios e Viabilidade`
- [x] Reposicionar `ContentIdeation.tsx` como `Narrativas e Conteudo`
- [x] Reposicionar `DataMining.tsx` como `Inteligencia Competitiva`
- [x] Reposicionar `SocialMedia.tsx` como `Marca e Presenca`
- [x] Reposicionar `Settings.tsx` como configuracoes de governanca do FBR-MKT
- [x] Reposicionar `Playbooks.tsx` como `Framework Library`
- [x] Implementar code splitting inicial no `App.tsx` com `React.lazy` e `Suspense`
- [x] Reduzir o chunk principal do build para abaixo de 500 kB apos code splitting
- [x] Reposicionar `paid-traffic.tsx` como `Growth Tests`
- [x] Reposicionar `ExecutionMotor.tsx` como `Dispatch Operacional`
- [x] Reposicionar `Orchestration.tsx` como `Orquestracao Estrategica`
- [x] Reposicionar `WhatsApp.tsx` como `Handoffs e Mensageria`
- [x] Introduzir a primeira persistencia real de `strategies` no `Positioning Studio`
- [x] Persistir `project_briefings` a partir do `Positioning Studio`
- [x] Conectar `Diretrizes e Campanhas` aos dados reais de `strategies` e `project_briefings`

## Em andamento

- [ ] Revisar nomes de abas e paginas legadas que ainda carregam fluxos do produto anterior

## Proximo bloco

- [ ] Definir estado vazio e estado de carregamento padrao para os modulos FBR-MKT
- [ ] Introduzir camada de dados mockada/coerente para sinais, hipoteses e diretrizes
- [ ] Expandir persistencia real de `strategies` com leitura de tipo, status e relacionamento com projetos
- [ ] Introduzir persistencia minima para recommendations ou decision outputs
- [ ] Revisar e reposicionar modulos ainda legados como `ContentIdeation`, `DataMining`, `SocialMedia`, `Settings` e `Playbooks`
