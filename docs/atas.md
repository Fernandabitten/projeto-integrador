## #Atas da Reunião

## Reunião 1 - 10/10/2025

**Participantes:** Fernanda, Grazi e Ricardo
**Duração:** 45 minutos
**Objetivo:** Definir tema e tarefas da equipe.

### Tópicos discutidos

- Escolha do tema: Trilha Conectada.
- Papéis atribuidos (PO, SM e Dev Team) - Todos os membros da equipe
- Criação do repositório e quadro no Trello.

## Reunião 2 - 14/10/2025

**Participantes:** Fernanda, Grazi e Ricardo
**Duração:** 30 minutos
**Objetivo:** Dividir tarefas da sprint 2.

### Tópicos discutidos

- Atualização dos docs no git hub (ata e sprint)
- Rotas a serem criadas inicialmente (cadastro de usuario e lista de trilhas)
- Setup do back.

## Reunião 3 - 19/10/2025

**Participantes:** Fernanda, Grazi e Ricardo

**Duração:** 50 minutos

## **Objetivo:** Realizar sessão de Planning Poker e revisar riscos do projeto.

### Tópicos Discutidos

1.  **Sessão de Estimativas (Planning Poker):**
    - Realizada a sessão de estimativas de esforço (Planning Poker) utilizando a sequência de Fibonacci (1, 2, 3, 5, 8, 13...).
    - Foram definidos _Story Points (SP)_ para todas as tarefas pendentes do _Backlog do Produto_ e do _Sprint Backlog_.
    - Total de **89 SP** distribuídos entre as categorias de Design, Frontend, Backend e Documentação.
2.  **Criação e Preenchimento dos Arquivos:**
    - `estimativas.md` → com todas as tarefas e seus respectivos _Story Points_ e justificativas.
    - `riscos.md` → com 6 riscos principais, estratégias de mitigação e responsáveis.
3.  **Atualizações no Trello:**
    - Adicionado _Story Points_ no título das tarefas (ex: `[5 SP]`, `[8 SP]`).
    - Adicionadas etiquetas de prioridade conforme o risco (**🔴 Alta**, **🟠 Média**, **🟢 Baixa**).
    - Criado um cartão fixo **"🔴 Riscos Ativos & Alertas"** com checklist de acompanhamento.
4.  **Próxima Etapa Definida:**
    - Subir os arquivos `estimativas.md` e `riscos.md` no repositório GitHub para vincular no Trello.

---

### Decisões

- Todas as estimativas foram **consensuais** entre os membros.
- Riscos revisados e atualizados conforme o andamento da Sprint.
- Validação de que o total de _Story Points_ (89 SP) está alinhado com a capacidade da equipe.

---

### Pendências

- [ ] Enviar os arquivos `estimativas.md` e `riscos.md` para o repositório GitHub.
- [ ] Revisar semanalmente o cartão “🔴 Riscos Ativos & Alertas”.

---

## Reunião 4 - 21/10/2025

**Participantes:** Fernanda, Grazi e Ricardo
**Duração:** 30 minutos
**Objetivo:** Definir tema e tarefas da equipe.

### Tópicos discutidos

- Criar arquivo estimativas e riscos
- Conexão front/back
- implementar frontend inicial.

### Decisões

- Caards implementados no trello.
- Tarefas divididas entre os membros da equipe.

## Reunião 5 - 28/10/2025

**Participantes:** Fernanda, Grazi e Ricardo
**Duração:** 30 minutos
**Objetivo**: Planejar as entregas da Sprint 4 e definir responsabilidades.

### Tópicos discutidos

- Estrutura inicial do frontend e definição do protótipo em React.
- Necessidade de criação do arquivo diagramas.md.
- Distribuição dos diagramas (sequência, classes e caso de uso).
- Organização das tarefas no Trello.
- Ajustes necessários na comunicação entre frontend e backend.

### Decisões

- O protótipo React será iniciado nesta sprint, com os primeiros componentes básicos.
- A pasta diagrams contendo os arquivos com os nomes dos diagramas serãoo criados contendo os diagramas principais do sistema.
- As tarefas foram divididas entre os membros da equipe conforme capacidade e especialidade.
- Todos os cartões da sprint foram registrados no Trello para acompanhamento.

## Reunião 6 - 28/10/2025

**Participantes:** Fernanda, Grazi e Ricardo
**Duração:** 30 minutos
**Objetivo:** Definir os objetivos da Sprint 5, revisar prioridades e distribuir tarefas entre os membros da equipe.

### Tópicos discutidos

- Padronização e organização do código seguindo boas práticas (Clean Code, nomenclaturas, revisão e formatação).
- Evolução do frontend para estrutura de SPA com roteamento, navegação e layout fixo.
- Criação das principais telas do sistema (Login, Cadastro, Trilhas, Detalhes).
- Desenvolvimento dos endpoints essenciais para autenticação e cadastro de trilhas.
- Necessidade de melhorar experiência de navegação (ScrollToTop).

### Decisões

- Fernanda ficará responsável pelas telas principais da aplicação e endpoints de autenticação e trilhas.
- Ricardo ficará responsável pela tela de detalhes da trilha.
- Grazi ficará responsável pelo componente ScrollToTop e pela página Sobre.
  -,Será mantido o fluxo de revisão cruzada antes de qualquer merge.
- Todo o frontend deve seguir o padrão SPA definido (rotas e organização de pastas).

## Reunião 7 - 11/11/2025

**Participantes:** Fernanda, Grazi e Ricardo
**Duração:** 30 minutos
**Objetivo:** Planejar as atividades da Sprint 6, definir responsabilidades e alinhar a integração do front-end com o back-end, além de finalizar o planejamento e documentação da API do projeto.

### Tópicos discutidos

- Integração do front-end React com a API real do back-end.
- Criação e finalização do arquivo api_design.md.
- Padronização dos recursos e endpoints da API.
- Definição dos status codes de cada rota.
- Necessidade de refatoração em páginas React para consumo da API.
- Estruturação dos exemplos de JSON (request e response).
- Organização das tarefas da sprint no Trello com responsáveis e checklist.
- Alinhamento sobre a centralização das requisições no arquivo api.js.
- Garantir que o front utilize useEffect e useState corretamente para carregar e enviar dados.
- Padronização do fluxo de erro, carregamento e atualização automática da interface.
- Revisão cruzada dos PRs antes do merge na branch principal.

### Decisões

- O documento api_design.md será concluído e revisado ainda nesta sprint.
- As rotas da API terão status codes padronizados seguindo boas práticas REST.
- Fernanda ficará responsável pela parte de integração no front-end e pela refatoração necessária.
- Ricardo cuidará da definição dos recursos e endpoints da API.
- Grazi ficará responsável pela produção dos exemplos de JSON para todos os recursos.
- Todas as requisições serão centralizadas no arquivo api.js, proibindo fetch direto nos componentes.
- Cada membro trabalhará em sua própria branch e abrirá um Pull Request para revisão de outro colega.
- A sprint será concluída quando a integração estiver funcional, com listagem dinâmica e cadastro real via POST.
