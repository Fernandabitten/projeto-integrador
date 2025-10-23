# Estimativa de Esforço (Planning Poker)

Este documento registra os Story Points (SP) definidos para todas as tarefas pendentes do Backlog do Produto e do Sprint Backlog, utilizando a sequência de Fibonacci (1, 2, 3, 5, 8, 13...).

**Soma Total de Story Points Pendentes:** 89 SP

| Categoria | Tarefa | Story Points (SP) | Justificativa da Equipe |
| :--- | :--- | :--- | :--- |
| **Designer** | Criar Protótipo no Figma | 5 | Requer mapeamento de fluxo de usuário e definição de design para todas as telas (alto esforço inicial). |
| **Frontend** | Implementar setup do Frontend | 5 | Configuração de ambiente (React/Next, ferramentas de build). Esforço padronizado. |
| **Frontend** | Criar tela de Cadastro de Usuário | 5 | Tela com formulário complexo, validações e integração com API de registro. |
| **Frontend** | Criar tela de Login | 3 | Formulário mais simples que o cadastro, mas inclui fluxo de autenticação. |
| **Frontend** | Implementar fluxo de logout | 1 | Operação simples de limpar token/sessão. |
| **Frontend** | Criar tela de Cadastro de Trilhas | 8 | Formulário complexo, podendo incluir upload de mídias ou dados geo-referenciados. |
| **Frontend** | Criar tela de Listagem de Trilhas (Home) | 8 | Tela principal. Requer consumo de API com filtros dinâmicos, paginação e design responsivo (alta complexidade). |
| **Frontend** | Criar tela de detalhes da trilha | 3 | Exibir dados de uma trilha específica. Esforço moderado. |
| **Frontend** | Aplicar estilização moderna (tema claro/escuro) | 8 | Requer refatoração de CSS/componentes e aplicação de tema em todo o projeto. Alto esforço. |
| **Backend** | Criar modelo User no Prisma | 2 | Definição do schema no ORM, esforço baixo. |
| **Backend** | Criar endpoint POST /register (Concluído) | 3 | Cadastro de usuário. |
| **Backend** | Criar endpoint POST /login | 3 | Lógica de busca, comparação de senha Complexidade média. |
| **Backend** | Implementar criptografia de senha (bcrypt) | 5 | Integração e configuração do bcrypt. |
| **Backend** | Gerar e validar tokens JWT | 5 | Configurar biblioteca JWT e criar funções. |
| **Backend** | Criar middleware de autenticação | 8 | Lógica de validação do token JWT em todas as rotas protegidas. |
| **Backend** | Tratar erros de login/cadastro com mensagens apropriadas | 2 | Implementar mensagens de erro customizadas. |
| **Backend** | Criar modelo Trail no Prisma | 2 | Definição do schema no ORM, esforço baixo. |
| **Backend** | Criar endpoint GET /trails?city=&difficulty= | 8 | Endpoint complexo. Requer lógica de filtros dinâmicos, paginação e ordenação no BD (Alto Risco Técnico). |
| **Backend** | Criar endpoint POST /trails (cadastrar trilha) | 5 | Validação de dados de entrada e persistência no BD. |
| **Backend** | Criar endpoint PUT /trails/:id (editar trilha) | 5 | Busca, validação e atualização. Esforço similar ao POST. |
| **Backend** | Criar endpoint DELETE /trails/:id (excluir trilha) | 2 | Operação simples. |
| **Backend** | Implementar validação de dados (express-validator) | 3 | Integração da biblioteca e aplicação de regras em todos os endpoints. |
| **Documentação** | Preencher docs no git | 5 | Criar README, documentação de API (Swagger/OpenAPI) e padrões. Alto esforço de escrita. |

---


## Atualização

**Data de Atualização:** 2025-10-19
**Status:** Estimativas de esforço concluídas para todo o Backlog pendente.
