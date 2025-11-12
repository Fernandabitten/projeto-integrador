#  API Design — Projeto Trilhas

Documentação do design inicial da API com base nos **diagramas de sequência** do projeto.  
A aplicação tem como foco o **cadastro de trilhas**, **autenticação de usuários** e **upload de mídias (fotos e rotas)**.

---

## 1. Recursos da API (Resources)

A API contará com os seguintes recursos principais:

| Recurso | Descrição |
|----------|------------|
| **/auth** | Autenticação e cadastro de usuários |
| **/usuarios** | Gerenciamento de usuários (opcional, para fins administrativos) |
| **/trails** | Cadastro e listagem de trilhas |
| **/photos** | Upload e gerenciamento de fotos de trilhas |
| **/files** | Upload de arquivos GPX/GeoJSON relacionados às trilhas |

---

## 2. Tabela de Endpoints (Rotas REST Planejadas)

| Recurso | Verbo | Endpoint | Descrição |
|----------|--------|-----------|-----------|
| **Auth** | POST | `/auth/register` | Cadastro de novo usuário |
| **Auth** | POST | `/auth/login` | Login do usuário (gera token JWT) |
| **Usuário** | GET | `/usuarios/{id}` | Buscar dados de um usuário específico |
| **Trilhas** | POST | `/trails` | Criar nova trilha (dados básicos) |
| **Trilhas** | GET | `/trails` | Listar trilhas com paginação e filtros (`?page=1&limit=50`) |
| **Trilhas** | GET | `/trails/{id}` | Buscar detalhes de uma trilha (dados, fotos, arquivo de rota) |
| **Trilhas** | GET | `/trails?userId={id}` | Listar trilhas criadas por um usuário |
| **Trilhas** | PUT | `/trails/{id}` | Editar trilha existente (dados, fotos e rota) |
| **Trilhas** | DELETE | `/trails/{id}` | Deletar trilha e mídias associadas |
| **Fotos** | POST | `/photos` | Upload múltiplo de fotos associadas a uma trilha |
| **Arquivos** | POST | `/files` | Upload de arquivo GPX ou GeoJSON de uma trilha |

---


