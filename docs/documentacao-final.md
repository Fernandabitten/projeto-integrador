# Documentação Final do Projeto  
## **Trilha Conectada**

**Equipe:** Fernanda Bittencourt, Grazielle Carvalho e Ricardo Junior Pereira da Silva
**Disciplina:** Projeto Integrador 2  
**Instituição:** IFCE – Campus Maranguape  
**Semestre:** 2025.2  

---

# Sumário
1. [Introdução](#1-introdução)
2. [Visão Geral do Sistema](#2-visão-geral-do-sistema)  
3. [Requisitos do Sistema](#3-requisitos-do-sistema)  
4. [Arquitetura e Tecnologias Utilizadas](#4-arquitetura-e-tecnologias-utilizadas)  
5. [Diagramas do Sistema](#5-diagramas-do-sistema)  
6. [Descrição dos Módulos e Componentes](#6-descrição-dos-módulos-e-componentes)  
7. [Guia de Instalação e Execução](#7-guia-de-instalação-e-execução)  
8. [Manual do Usuário](#8-manual-do-usuário)  
9. [Decisões de Projeto e Limitações](#9-decisões-de-projeto-e-limitações)  
10. [Testes Unitários com Jest](#10-testes-unitários-com-jest)  
11. [Referências](#11-referências)

---
# 1. Introdução
## 1.1 Objetivo do Documento
Este documento reúne toda a documentação técnica e de usuário do sistema **Trilha Conectada**, desenvolvido como parte da disciplina Projeto Integrador 2. 
Seu objetivo é permitir que desenvolvedores, professores e avaliadores compreendam como o sistema funciona, sua arquitetura, requisitos, tecnologias usadas, estrutura interna e modo de utilização. Também fornece instruções de instalação e execução, além de registrar decisões de projeto e apresentar os testes unitários desenvolvidos no backend.

## 1.2 Público-alvo
- Professor avaliador da disciplina; 
- Desenvolvedores que pretendem estudar, manter ou expandir o sistema;
- Usuários finais (apenas para as seções do manual de uso)

---

# 2. Visão Geral do Sistema

## 2.1 Descrição Resumida
O **Trilha Conectada** é uma aplicação desenvolvida para praticantes de trilhas e aventureiros que desejam registrar, organizar e compartilhar rotas percorridas em diferentes regiões.  
O sistema permite o cadastro de trilhas contendo informações como nome, cidade, estado, dificuldade, distância, fotos e arquivo de rota (GPX).  

O projeto foi pensado para ser simples, acessível e útil tanto para trilheiros iniciantes quanto para experientes, oferecendo uma forma prática de documentar experiências e consultar trilhas cadastradas.

## 2.2 Funcionalidades Principais
- Cadastro de usuários;
- Login com autenticação;
- Cadastro de trilhas com fotos e arquivo GPX;
- Listagem de trilhas cadastradas; 
- Edição de trilhas;
- Exclusão de trilhas;
- Upload de fotos e arquivo GPX.

## 2.3 Escopo do Sistema
### O que o sistema faz:
- Realiza autenticação de usuários  
- Registra trilhas com dados completos  
- Armazena fotos e arquivos de rota  
- Permite editar e remover trilhas   

### O que NÃO faz (fora do escopo):
- Compartilhamento público de trilhas  
- Sistema de comentários  
- Integração com redes sociais  

---

# 3. Requisitos do Sistema
## [→ Ver arquivo requisitos.md](./requisitos.md)

---

# 4. Arquitetura e Tecnologias Utilizadas

## 4.1 Arquitetura Geral
O **Trilha Conectada** utiliza arquitetura **cliente-servidor**, onde:

- O **frontend** (React) é responsável pela interface gráfica e interação com o usuário.  
- O **backend** (Node.js + Express) fornece uma API REST que gerencia trilhas, usuários e arquivos.  
- A persistência é realizada com **Prisma ORM** e **SQLite**.

## 4.2 Tecnologias Utilizadas

### **Frontend**

A aplicação frontend é construída com React e Vite, utilizando TailwindCSS para estilização e bibliotecas adicionais para gráficos, mapas e navegação:

- **Frameworks e Ferramentas**
  - React `^19.1.1`
  - React DOM `^19.1.1`
  - Vite `^7.1.7`
  - TailwindCSS `^4.1.16`
  - Lucide React `^0.552.0`

- **Visualização e Mapas**
  - ApexCharts `^5.3.6`
  - React ApexCharts `^1.8.0`
  - Leaflet `^1.9.4`
  - Leaflet GPX `^2.2.0`

- **Navegação e Experiência**
  - React Router DOM `^7.9.5`
  - React Hot Toast `^2.4.1`

- **Estilo e Qualidade de Código**
  - Prettier `^3.6.2`
  - ESLint `^9.36.0`
  - eslint-plugin-react-hooks `^5.2.0`
  - eslint-plugin-react-refresh `^0.4.22`

- **Scripts disponíveis**
  - `dev`, `build`, `preview`, `lint`, `format`, `format:check`

---

### **Backend**

O backend é construído com Node.js e Express, utilizando Prisma ORM e integração com Supabase para armazenamento de arquivos e autenticação:

- **Frameworks e Ferramentas**
  - Node.js
  - Express `^5.1.0`
  - Prisma ORM `^6.19.0`
  - Supabase JS `^2.84.0`
  - Multer `^2.0.2`

- **Autenticação e Segurança**
  - JWT `^9.0.2`
  - BcryptJS `^3.0.3`
  - dotenv `^17.2.3`

- **Geolocalização e GPX**
  - @mapbox/togeojson `^0.16.2`
  - @turf/turf `^7.3.0`
  - xml2js `^0.6.2`
  - xmldom `^0.6.0`

- **Testes e Desenvolvimento**
  - Jest `^30.2.0`
  - Nodemon `^3.1.10`

- **Scripts disponíveis**
  - `dev`, `start`, `test`


## 4.3 Padrões e Boas Práticas Adotados
- Arquitetura em camadas no backend (routes, controllers, core, services, prisma, banco).  
- Componentização no frontend.  
- Nomes de variáveis semânticos.  
- Separação entre lógica de negócio (core) e lógica HTTP (controllers).  
- Uso de middlewares para autenticação e logs.  

---

# 5. Diagramas do Sistema

## 5.1 Diagrama de Casos de Uso
### [→ Ver Diagrama de Casos de Uso](./diagramas/casos-uso.md)

## 5.2 Diagrama de Classes (Modelo de Dados)
### [→ Ver Diagrama de Classes](./diagramas/classes.md)

## 5.2 Diagrama de sequência
### [→ Ver Diagrama de sequência](./diagramas/sequencia.md)

---

# 6. Descrição dos Módulos e Componentes

## 6.1 Organização das Pastas
### **Backend**
```
backend/
├── prisma/
│   ├── schema.prisma             # Modelo do banco de dados SQLite
│   └── migrations/               # Histórico das migrações Prisma
├── src/
│   ├── controllers/
│   │   ├── authController.js     # Lida com login e cadastro de usuários
│   │   └── trailController.js    # Lida com CRUD completo das trilhas
│   │
│   ├── middlewares/
│   │   └── authMiddleware.js      # Middleware JWT: valida token e protege rotas
│   │
│   ├── routes/
│   │   ├── authRoutes.js          # Rotas de autenticação (/auth)
│   │   └── trailRoutes.js         # Rotas de trilhas (/trails)
│   │
│   ├── services/
│   │   ├── uploadService.js       # Upload de fotos e arquivos GPX/KML para storage
│   │   └── userService.js         # Regras de negócio de usuários (se houver)
│   │
│   ├── utils/
│   │   ├── auth.js            # contém a lógica central para a gestão de usuários e segurança no projeto.
│   │   └── httpResponses.js   # módulo utilitário que tem a função de padronizar e centralizar a forma como a API do backend responde a qualquer requisição.
│   │   └── gpxUtils.js          # transforma o arquivo de trilha em dados utilizáveis pela aplicação
│   │
│   ├── lib/
│   │   └── prisma.js              # Inicialização do cliente Prisma
│   │
│   └── server.js                  # Inicializa o servidor Node e configuração principal do Express
│
├── test/                          # Testes automatizados (Jest)
│
├── uploads/                       # Arquivos temporários usados pelo multer
│
└── README.md                      # Documentação do backend


```
### **Docs**
```
docs/
├── diagramas/
│   ├── casos-uso.md
│   │     → Diagramas de casos de uso mostrando as interações entre usuários e o sistema.
│   ├── classes.md
│   │     → Diagrama de classes, representando a estrutura das entidades e seus relacionamentos.
│   ├── sequencia.md
│   │     → Diagramas de sequência que ilustram o fluxo de mensagens entre os componentes do sistema.
│
├── api_design.md
│    → Desenho e padronização da API: endpoints, métodos, requisições e respostas.
├──  atas.md
│     → Atas de reuniões, decisões importantes e registros de alinhamentos da equipe.
│
├── documentacao-final.md
│     → Documento final reunindo todos os artefatos e explicações do projeto.
├── estimativas.md
│     → Registro de estimativas de esforço, tempo e recursos utilizados no projeto.
├── quadro-scrum.md
│     → Estrutura do quadro Scrum: backlog, tarefas, status, responsáveis, etc.
├── relatorio-commits.md
│     → Relatório analítico dos commits realizados no repositório durante o desenvolvimento.
├── requisitos.md
│     → Lista de requisitos funcionais e não funcionais do sistema.
├── riscos.md
│     → Identificação e análise de riscos do projeto, com estratégias de mitigação.
└── sprints.md
      → Documentação das sprints: objetivos, entregas, retrospectivas e métricas.

```

### **Frontend**
```
frontend/
├── src/
│   ├── assets/                       # Imagens, ícones, fontes
│
│   ├── components/
│   │   ├── AuthForm.jsx              # Formulário de login/cadastro
│   │   ├── AvatarMenu.jsx            # Menu do usuário logado
│   │   ├── ConfirmDialog.jsx         # Modal de confirmação
│   │   ├── ElevationChart.jsx        # Gráfico de elevação da trilha
│   │   ├── FilterBar.jsx             # Barra de filtros da listagem
│   │   ├── ProtectedRoute.jsx        # Protege rotas baseadas em login
│   │   ├── ScrollToTop.jsx           # Auto-scroll ao navegar
│   │   ├── Sidebar.jsx               # Menu lateral
│   │   ├── TrailCard.jsx             # Card da trilha na listagem
│   │   ├── TrailDataModal.jsx        # Exibe resumo da trilha em modal
│   │   ├── TrailFormModal.jsx        # Formulário de criação/edição
│   │   └── TrailMap.jsx              # Mapa interativo (Leaflet)
│
│   ├── pages/
│   │   ├── About.jsx                 # Tela "Sobre"
│   │   ├── Home.jsx                  # Tela inicial / listagem de trilhas
│   │   ├── MyTrails.jsx              # Tela "Minhas trilhas"
│   │   ├── TrailMapPage.jsx          # Tela com o mapa completo da trilha
│   │   └── TrailPage.jsx             # Detalhes completos da trilha
│
│   ├── services/
│   │   ├── api.js                    # Wrapper de fetch:
│   │   │                             #  - URL base via VITE_API_URL
│   │   │                             #  - Token JWT automático (Authorization)
│   │   │                             #  - Content-Type dinâmico (FormData)
│   │   │                             #  - Tratamento global de erros
│   │   │                             #  - Helpers: postJSON, postForm, putForm...
│   │   ├── authService.js            # Comunicação com /auth
│   │   ├── ibgeService.js            # Comunicação com serviços do ibge
│   │   └── trailService.js           # Requisições relacionadas às trilhas
│
│   ├── utils/
│   │   └── gpxUtils.js               # Funções auxiliares (ex.: converter GPX)
│
│   ├── App.jsx                       # Rotas principais + layout
│   ├── index.css                     # Estilos globais
│   └── main.jsx                      # Ponto de entrada do React
│
├── .gitignore                        # Arquivos ignorados no Git
├── .prettierrc                       # Configuração Prettier
├── eslint.config.js                  # Configuração ESLint
├── index.html                        # Página raiz do Vite
├── package.json                      # Dependências e scripts do front
├── package-lock.json
├── vite.config.js                    # Configuração do Vite
└── README.md                         # Documentação do frontend

```

## 6.2 Módulos do Sistema
- **Autenticação** – responsável por login e cadastro de usuários.
- **Trilhas** – responsável pelo CRUD (cadastro, edição, listagem e exclusão) completo de trilhas.  
- **Upload** – responsável pelo envio de fotos e arquivos GPX ao Supabase.  

## 6.3 Fluxo de uma Operação Importante – Criar Trilha
O processo de cadastro de uma trilha no sistema envolve a interação entre o usuário, o frontend, o backend, o banco de dados e o storage de arquivos. Abaixo está o fluxo completo, passo a passo:
1. Usuário preenche o formulário no frontend
    - O usuário acessa a interface e informa:
      - Nome da trilha
      - Descrição
      - Localização
      - Dificuldade
      - Arquivo GPX/KML contendo o trajeto
      - Uma ou várias fotos (upload múltiplo)
      - Após completar tudo, o usuário clica em “Cadastrar”.
2. Frontend envia os dados da trilha para o backend  `POST /trails` usando multipart/form-data
3. O BackEnd recebe tudo no mesmo POST /trails
     -  O backend recebe o FormData contendo:
       - campos de texto (nome, descrição, etc.)
       - fotos
       - arquivo (.gpx| .kml)
     - E então executa:
       1. Salva os dados básicos da trilha no banco
       2. O multer salva temporariamente as fotos e o arquivo em uploads/
       3. Faz os calculos de distancia da trilha
       4. Faz upload das fotos no storage
       5. Faz upload do arquivo GPX no storage
       6. Associa tudo ao ID da trilha criada
       7. Exclui os arquivos da pasta uploads/
       8. Salva url do arquivo no banco (na tabela da trilha)
       9. Salva url de cada foto no banco associada a trilha
       10. Retorna sucesso
4.  FrontEnd exibe o resultado ao usuário
---

# 7. Guia de Instalação e Execução

## 7.1 Pré-requisitos
- Node.js 18+  
- Git  
- Conta no Supabase  

## 7.2 Como Clonar o Repositório
```
git clone https://github.com/Fernandabitten/projeto-integrador.git
cd projeto-integrador
```

## 7.3 Instalação e Execução – Backend
```
cd backend
  Entra na pasta do backend para executar os comandos dentro dela.

npm install
  Baixa e instala todas as dependências necessárias do projeto.

npx prisma migrate dev
  Executa as migrações do Prisma e atualiza o banco de dados conforme o schema.

npm run dev
  Inicia o servidor backend em modo de desenvolvimento (com recarregamento automático).
```
A API rodará em: **http://localhost:3000**

## 7.4 Instalação e Execução – Frontend
```
cd frontend
  Entra na pasta do frontend.

npm install
  Instala todas as dependências do projeto React.

npm run dev
  Inicia o servidor de desenvolvimento do frontend, abrindo o sistema no navegador.
```
Disponível em: **http://localhost:5173**

## 7.5 Variáveis de Ambiente
Criar arquivo `.env` no backend:

```
DATABASE_URL="file:./dev.db"
JWT_SECRET=SUA_CHAVE_SECRETA_AQUI"
SUPABASE_URL="SUA_URL_NO_SUPABASE"
SUPABASE_KEY="SUA_KEY_dO_SUPABASE"
SUPABASE_BUCKET="uploads"
```

---

# 8. Manual do Usuário

## 8.1 Tela Inicial
- Apreesenta um menu lateral à esquerda
  - Menu de navegação para páginas da aplicação:
    - Trilhas (tela inicial)
    - Minhas trilhas (página onde o usuario poder cadastrar trilhas, ver, editar e excluir as trilhas que ele criou)
    - Sobre (págian que fala sobre a aplicação)
- Parte principal da página
  - Header:
      - Título grande “Trilhas”.  
      - No canto direito, ícone de usuário (ao clicar é possível deslogar da aplicação)
  - Filtros de busca:
    - Três caixas de seleção (dropdowns):
      - Estado: Todos os estados      
      - Cidade: Todas as cidades      
      - Dificuldade: Todas
- Lista de cards de trilhas disponíveis (trilhas cadastradas por todos os usuários da trilha conectada) ou se não houver trilhas cadastradas ainda apresenta a mensagem: **Nenhuma trilha cadastrada.**
   - Cada card exibe:      
     - Nome da trilha
     - Imagem da trilha.
     - Localização: cidade, UF.
     - Dificuldade: Fácil, moderado ou difícil.
     - Distância: km.
     - Botão "Ver Detalhes": exibe detalhes da trilha (fotos, descrição,etc e botão "ver mapa da trilha)
<p align="center">
  <img src="https://github.com/user-attachments/assets/ea32aa73-cee9-4542-b334-7bcae378fea8" width="49%" />
  <img src="https://github.com/user-attachments/assets/206c958e-1193-4df6-92d0-521e953efbd6" width="49%" />
</p>

## 8.2 Login e Cadastro
- Cadastro:
  - Clique em cadastre-se (na tela de login) 
  - Informe nome, email e senha.
  - Clique em cadastrar
- Login:
  - Na tela de login, informe email e senha corretos
  - Clique em entrar.
<p align="center">
  <img src="https://github.com/user-attachments/assets/0e7c7bde-b380-440d-a429-4758e0c16f9b" width="49%" />
  <img src="https://github.com/user-attachments/assets/ecbf965a-b87d-4462-8fb0-19d76475b005" width="49%" />
</p>

## 8.3 Cadastro de Trilhas
1. Clique em Minhas Trilhas no menu lateral direito (Menu de navegação).  
3. Clique em “Cadastrar Trilha”.  
4. Preencha os campos obrigatórios.  
5. Adicione fotos e arquivo .GPX ou .kml.  
6. Clique em “Cadastrar trilha”.
<p align="center">
  <img src="https://github.com/user-attachments/assets/2619ad76-5802-48ee-b5a8-f0deba702d4f" width="49%" />
  <img src="https://github.com/user-attachments/assets/a94001ec-0632-4928-b670-04925e027d5d" width="49%" />
</p>

## 8.4 Edição e Exclusão
Edição:
1. Clique em Minhas Trilhas no menu lateral direito (Menu de navegação).
2. Na lista de trilhas, clique no icone de lápis no card da trilha que quer “Editar”.
3. Altere os campos que você quer editar.
4. Clique em salvar edição. 
<p align="center">
  <img src="https://github.com/user-attachments/assets/3f1fbc53-bffa-454f-aca8-61fa45568514" width="49%" />
  <img src="https://github.com/user-attachments/assets/14ade737-e55b-47db-982a-183bb31f27a7" width="49%" />
</p>

Exclusão:
1. Clique em Minhas Trilhas no menu lateral direito (Menu de navegação).
2. Na lista de trilhas, clique no icone de lixeira no card da trilha que quer “Excluir”.
3. Clique em excluir no modal de excluir trilha.
<p align="center">
  <img src="https://github.com/user-attachments/assets/fc8bffb3-b48b-4f2b-b1a1-7a3024b8b6b5" width="49%" />
  <img src="https://github.com/user-attachments/assets/27092610-debf-418b-9af1-48b575dfdfe2" width="49%" />
</p>

## 8.5 Erros Comuns
- **Campos faltando** → preencha todos os campos.  
- **Erro de autenticação** → refaça login.  
- **Erro ao enviar arquivo** → verifique formato.
---

# 9. Decisões de Projeto e Limitações

## 9.1 Decisões Importantes

| Categoria | Tecnologia/Decisão | Módulos/Arquivos Relacionados | Justificativa Principal |
| :--- | :--- | :--- | :--- |
| **Frontend Principal** | **React** | `package.json`, `src/main.jsx` | Padrão de mercado para Single Page Applications (SPAs). Oferece arquitetura baseada em **componentes reutilizáveis** e otimização de performance via Virtual DOM. |
| **Backend Principal** | **Node.js + Express** | `server.js`, `routes/`, `controllers/` | Permite o desenvolvimento **Fullstack JavaScript** (única linguagem), aproveitando a natureza **não-bloqueante** do Node.js para alta eficiência em requisições de API (I/O Bound). |
| **Acesso a Dados** | **Prisma ORM** | `schema.prisma`, `PrismaClient` | Escolhido por ser um ORM moderno que oferece **Type Safety** (segurança de tipos) e um modelo declarativo de schema. Simplifica a interação com o banco de dados e o gerenciamento de **migrações** de schema de forma eficiente e confiável. |
| **Autenticação** | **JSON Web Token (JWT)** | `auth.js`, `authMiddleware.js` | Padrão moderno e **stateless** (sem estado) para APIs RESTful, simplificando a arquitetura do servidor e facilitando o *scaling* horizontal. |
| **Processamento de Dados Geoespaciais** | **Arquivos GPX** | `gpxUtils.js` | Escolha do formato padrão da indústria para dados de GPS. O `gpxUtils.js` é crucial para **parsear (traduzir) o XML** do GPX em dados JSON utilizáveis para cálculo de estatísticas e visualização. |
| **Visualização de Mapas** | **Leaflet** | `package.json`, Componentes de Mapa | Biblioteca de mapas leve e de código aberto. Associada ao `leaflet-gpx` para renderizar as trilhas processadas diretamente no frontend, oferecendo uma experiência interativa rápida. |
| **Padrão de API** | **Respostas HTTP Padronizadas** | `httpResponses.js` | Centraliza a lógica de envio de sucesso (`200 OK`) e erro (`4xx`/`5xx`), garantindo que a API retorne um **formato JSON consistente** e fácil de consumir pelo frontend. |
| **Estilização (Frontend)** | **Tailwind CSS** | `package.json` | Adoção de um *framework utility-first* que acelera o desenvolvimento de interface, permitindo que os estilos sejam aplicados rapidamente no *markup* HTML sem a necessidade de gerenciar grandes arquivos CSS. |
| **Gerenciamento de Código** | **Arquitetura MVC no Backend** | `server.js`, `trailRoutes.js`, `trailController.js` | Separação clara de responsabilidades: Roteamento (rotas), Lógica de Negócio (controllers) e Acesso a Dados (services/models), facilitando a manutenção e a expansão do código. |

## 9.2 Limitações
1. Funcionalidades Planejadas que Ficaram de Fora (Foco no Core)
A versão atual focou no ciclo essencial (autenticação, upload de GPX e visualização da trilha), deixando de lado funcionalidades que aumentariam o engajamento social:
  - **Recuperação de Senha (Esqueci Minha Senha)**: A funcionalidade de reset de senha por e-mail (que exige serviços externos de envio de e-mail e geração de tokens de uso único) não foi implementada no fluxo atual do userRoutes.js. A autenticação se restringe ao registro e login padrão.  
  - **Interação Social/Comunitária:**
    - **Avaliações e Comentários:** Não existe um sistema para que os usuários avaliem as trilhas (estrelas) ou deixem comentários.  
    - **Seguidores/Conexões:** Não há um recurso social para seguir outros usuários ou visualizar seu feed de atividades.  
  - **Trilhas Favoritas/Salvas:** O usuário pode visualizar as trilhas, mas a funcionalidade de "Salvar para depois" ou marcar uma trilha como "Completada" ainda precisa ser integrada ao perfil de usuário (userController).  
  - **Login Social:** Não há suporte para autenticação via provedores externos (Google, Facebook, etc.).

---

# 10. Testes Unitários com Jest
Esta seção apresenta os testes unitários implementados com o framework **Jest**, conforme estudado na Semana 6 da disciplina. Esses testes permitem validar partes importantes da lógica do sistema e garantir que funções essenciais continuem funcionando corretamente mesmo após alterações no código.

## 10.1 Objetivo
Os testes unitários foram criados para:

- Validar funções isoladas do sistema;
- Verificar cenários de erro e entradas inválidas;
- Garantir que regras principais se comportem corretamente;
- Detectar regressões quando o código é modificado;
- Aumentar a confiabilidade geral do sistema

## 10.2 Tecnologias
- Jest — framework de testes unitários para JavaScript;
- Node.js — ambiente para execução dos testes. 

## 10.3 Como Executar
Antes de rodar os testes no backend, instale as dependências:

    npm install

Para executar os testes:

    npm run test

O Jest reconhece automaticamente arquivos com os seguintes padrões:

    *.test.js
    *.spec.js

## 10.4 Organização
Os arquivo de teste foram organizados na pasta: 
```
/backend/tests
```

## 10.5 Testes Implementados no Projeto

A estratégia de testes do projeto Trilha Conectada foca em **testes de unidade e integração** na camada de **Lógica de Negócio Central (*Core Business Logic*)**. Isso garante que as operações mais críticas, como autenticação e gerenciamento de trilhas, funcionem corretamente e sejam seguras.

A arquitetura de testes utiliza **Mocks** (simulações de dependências) para isolar o código, garantindo que o **Prisma ORM** e os **serviços de upload** (Supabase) sejam testados de forma controlada.

| Categoria de Teste | Objetivo Principal | Exemplos nos Arquivos |
| :--- | :--- | :--- |
| **Validação de Campos Obrigatórios** | Checar se o *payload* contém todos os dados essenciais e que não estão vazios. | `loginUserCore.test.js`, `registerUserCore.test.js` |
| **Regras de Negócio (Autenticação)** | Verificar a **unicidade de e-mail** no cadastro, e a **comparação de senha** no login. | `registerUserCore.test.js`, `loginUserCore.test.js` |
| **Regras de Negócio (Autorização)** | Garantir que um usuário só possa **atualizar sua própria trilha** (`userId` deve ser o dono). | `updateTrailCore.test.js` |
| **Testes de Fluxo Completo (Integração)** | Simular a operação que envolve múltiplas etapas: **criação no BD, upload de arquivos (GPX e Fotos)** e retorno da estrutura final da trilha. | `createTrailFullCore.test.js`, `updateTrailFullCore.test.js` |
| **Verificação de Comportamento Inesperado** | Testar cenários de falha, como tentativa de login de um usuário inexistente ou tentativa de atualização de uma trilha que não existe. | `loginUserCore.test.js`, `updateTrailCore.test.js` |

---


## 10.6 Exemplo de Teste Criado
1. Exemplo 1: Validação de Unicidade
Este teste, extraído de **`registerUserCore.test.js`**, verifica uma regra de negócio essencial: a unicidade do e-mail. Ele **moca** o Prisma para simular o retorno de um usuário existente e espera que a função de registro lance um erro.
```
// Arquivo: registerUserCore.test.js

describe("registerUserCore", () => {
  // ...

  test("deve lançar erro se o e-mail já estiver em uso", async () => {
    // Mock: Simula que o Prisma encontrou um usuário com este e-mail
    prisma.user.findUnique.mockResolvedValue({
      id: 1,
      email: "teste@email.com",
      password: "xxx",
    });

    await expect(
      registerUserCore({
        name: "Fernanda",
        email: "teste@email.com", // E-mail duplicado
        password: "123",
      })
    // O teste passa se a exceção com a mensagem correta for lançada.
    ).rejects.toThrow("E-mail já está em uso.");
  });
});
```
2. Exemplo 2: Verificação de Autorização
Este teste, extraído de updateTrailCore.test.js, verifica a Regra de Autorização (ACL - Access Control List), que impede que um usuário edite uma trilha criada por outra pessoa.
```
// Arquivo: updateTrailCore.test.js

describe("updateTrailCore", () => {
  let trails; // A lista de trilhas é definida no beforeEach

  // ...

  test("deve falhar se userId não for dono da trilha", () => {
    // A trilha 't1' pertence a 'user-123' (definido no beforeEach)
    expect(() =>
      updateTrailCore(trails, "t1", {
        name: "Nova",
        userId: "outro-usuario", // Tentativa de update por um usuário diferente
      })
    ).toThrow("Usuário não autorizado a editar esta trilha.");
  });

  test("deve falhar se trilha não existir", () => {
    expect(() =>
      updateTrailCore(trails, "t999", { // ID que não existe
        name: "X",
        userId: "user-123",
      })
    ).toThrow("Trilha não encontrada.");
  });
});
``` 

## 10.7 Benefícios dos Testes Unitários
Os principais benefícios percebidos foram:

- Mais segurança ao refatorar o código;
- Menor chance de erros passarem despercebidos;
- Verificação automática dos comportamentos esperados;
- Melhor entendimento das regras internas do sistema;
- Maior qualidade geral do software entregue.


---

# 11. Referências

- Documentação oficial do React  
- Documentação do Node.js  
- Prisma ORM Docs  
- Supabase Docs  
- Material da disciplina Projeto Integrador 2  

---

_Fim do documento._
