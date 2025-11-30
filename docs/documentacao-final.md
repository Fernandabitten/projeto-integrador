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
- Professor avaliador; 
- Desenvolvedores que pretendem estudar, manter ou expandir o sistema;
- Usuários finais.

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
- **Autenticação** – cadastro e login.  
- **Trilhas** – CRUD completo de trilhas.  
- **Upload** – envio de fotos e arquivos GPX ao Supabase.  

## 6.3 Fluxo de uma Operação Importante – Criar Trilha
1. Usuário preenche formulário.  
2. Front envia `POST /trails`.  
3. Multer processa arquivos.  
4. Core valida dados.  
5. Fotos e GPX são enviados ao Supabase.  
6. Prisma salva trilha e fotos.  
7. Backend retorna sucesso.  
8. Frontend atualiza lista.

---

# 7. Guia de Instalação e Execução

## 7.1 Pré-requisitos
- Node.js 18+  
- Git  
- Conta no Supabase  

## 7.2 Como Clonar o Repositório
```
git clone https://github.com/usuario/trilha-conectada.git
cd trilha-conectada
```

## 7.3 Instalação e Execução – Backend
```
cd backend
npm install
npx prisma migrate dev
npm run dev
```
A API rodará em: **http://localhost:3000**

## 7.4 Instalação e Execução – Frontend
```
cd frontend
npm install
npm run dev
```
Disponível em: **http://localhost:5173**

## 7.5 Variáveis de Ambiente
Criar arquivo `.env` no backend:

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua_chave"
SUPABASE_URL="..."
SUPABASE_KEY="..."
SUPABASE_BUCKET="uploads"
```

---

# 8. Manual do Usuário

## 8.1 Tela Inicial
Apresenta lista de trilhas cadastradas pelo usuário.

## 8.2 Login e Cadastro
- Informe nome, email e senha para cadastrar.  
- No login, informe email e senha corretos.  

## 8.3 Cadastro de Trilhas
1. Clique em “Cadastrar Trilha”.  
2. Preencha os campos obrigatórios.  
3. Adicione fotos e arquivo GPX.  
4. Clique em “Salvar”.

## 8.4 Edição e Exclusão
- Na lista, clique em “Editar” para modificar campos.  
- Clique em “Excluir” para remover uma trilha.  

## 8.5 Erros Comuns
- **Campos faltando** → preencha todos os campos.  
- **Erro de autenticação** → refaça login.  
- **Erro ao enviar arquivo** → verifique formato.

---

# 9. Decisões de Projeto e Limitações

## 9.1 Decisões Importantes
- Node + Express pela simplicidade.  
- React por ser moderno e rápido.  
- Prisma pela produtividade.  
- Supabase por oferecer storage integrado.

## 9.2 Limitações
- Não possui mapa interativo.  
- Não suporta comentários ou compartilhamento.  
- Simples sistema de permissões.

---

# 10. Testes Unitários com Jest

## 10.1 Objetivo
Validar regras de negócio do backend.

## 10.2 Tecnologias
- Jest  
- Node.js  

## 10.3 Como Executar
```
npm test
```

## 10.4 Organização
```
/backend/tests
```

## 10.5 Testes Implementados
- Validação de exclusão  
- Teste do deleteTrailCore  
- Validação de campos obrigatórios  

## 10.6 Exemplo
```js
test("deve retornar erro ao deletar trilha inexistente", () => {
  expect(() => deleteTrailCore(999)).toThrow();
});
```

## 10.7 Benefícios
- Segurança  
- Menos regressões  
- Maior confiabilidade  

---

# 11. Referências

- Documentação oficial do React  
- Documentação do Node.js  
- Prisma ORM Docs  
- Supabase Docs  
- Material da disciplina Projeto Integrador 2  

---

_Fim do documento._
