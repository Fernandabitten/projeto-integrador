# 🌍 Trilha Conectada

Trilha Conectada é uma aplicação web fullstack para **compartilhamento, visualização e gestão de trilhas de aventura**. Usuários podem fazer upload de arquivos GPX, visualizar as estatísticas da trilha em um mapa interativo e interagir com a comunidade.

O projeto foi construído utilizando a **MERN Stack** moderna (React + Node/Express + Prisma + Tailwind CSS), adotando o JavaScript em todo o seu ciclo de desenvolvimento.

## 🚀 Tecnologias

Este projeto é dividido em dois ambientes principais, construídos com a mesma linguagem:

### Frontend
| Tecnologia | Descrição |
| :--- | :--- |
| **React** | Biblioteca principal para construção da interface de usuário (SPA). |
| **Tailwind CSS** | Framework utility-first para estilização rápida e responsiva. |
| **Leaflet / leaflet-gpx** | Biblioteca para renderização do mapa interativo e visualização dos dados GPX. |
| **React Router DOM** | Gerenciamento de rotas e navegação da aplicação. |

### Backend
| Tecnologia | Descrição |
| :--- | :--- |
| **Node.js + Express** | Ambiente de execução e framework minimalista para construção da API REST. |
| **Prisma ORM** | ORM moderno para interação segura e tipada com o banco de dados. |
| **Bcrypt** | Criptografia segura para o armazenamento de senhas. |
| **JSON Web Tokens (JWT)** | Padrão *stateless* para autenticação de usuários. |
| **GPX Utilities** | Módulo interno para parsear e extrair estatísticas de arquivos GPX. |

## 📦 Estrutura do Repositório

O repositório está organizado em três pastas principais:

* **`frontend/`**: Contém todo o código da interface do usuário (React).
* **`backend/`**: Contém o servidor da API (Node.js/Express) e a lógica de negócio central.
* **`docs/`**: Contém a documentação, diagramas e designer do projeto.

## ⚙️ Configuração e Instalação

Para rodar o projeto localmente, siga estes passos:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Fernandabitten/projeto-integrador.git
    cd trilha-conectada
    ```

2.  **Configurar o Backend e Banco de Dados:**
    * Navegue até a pasta `backend/`.
    * Crie um arquivo `.env` com as credenciais do seu banco de dados e as chaves secretas.
    * Siga as instruções detalhadas no `backend/README.md`.
    * [→ Siga as instruções detalhadas no `backend/README.md`](./backend/README.md)

3.  **Configurar o Frontend:**
    * Navegue até a pasta `frontend/`.
    * [→ Siga as instruções detalhadas no `frontend/README.md`](./frontend/README.md)

---
