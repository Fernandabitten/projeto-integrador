# ⚙️ Backend | Trilha Conectada API

O backend é uma **API REST** construída com **Node.js e Express** que gerencia os dados de usuários e trilhas. Ele é responsável pela autenticação, validação de dados, e pelo processamento de arquivos GPX e uploads de fotos.

## 🧱 Arquitetura e Módulos

O servidor segue o padrão arquitetural **MVC** (Model-View-Controller) modificado:

* **`server.js`**: Ponto de entrada da aplicação, onde os middlewares (`cors`, `express.json`) e as rotas são definidos.
* **`routes/`**: Define as rotas (`/trails`, `/auth`) e mapeia as requisições para os controladores.
* **`controllers/`**: Contém a lógica de negócio de alto nível (chamando os *cores*).
* **`core/`**: Funções de **Lógica de Negócio Central** onde a validação e a manipulação de dados realmente ocorrem.
* **`utils/`**: Módulos utilitários, como `httpResponses.js` (padronização de respostas) e `auth.js` (criptografia/JWT).
* **`middlewares/`**: Funções executadas antes dos controladores (ex: `authMiddleware.js` para verificação de JWT).

## 🛠️ Instalação e Execução

1.  **Instalar dependências:**
    ```bash
    npm install
    ```

2.  **Configurar Variáveis de Ambiente (`.env`):**
    Crie um arquivo `.env` na raiz do backend e adicione as seguintes variáveis:

    ```env
 
    # Porta de Execução da API
    PORT=3000

    # Configuração do Banco de Dados (SQLite com Prisma)
    DATABASE_URL="file:./dev.db

    # Chave Secreta para Geração de JWT
    JWT_SECRET="sua_chave_secreta_aqui" 

    # Configuração do serviço de armazenamento (Supabase)
    SUPABASE_URL="https://[seu_id].supabase.co"
    SUPABASE_KEY="chave_de_servico_aqui"
    SUPABASE_BUCKET="uploads"
    ```

3.  **Configurar o Banco de Dados (Prisma):**
    Execute as migrações para criar as tabelas no seu banco de dados:
    ```bash
    npx prisma migrate dev --name init
    ```

4.  **Iniciar a API:**
    ```bash
    npm run dev 
    # ou 'npm start' se for para produção
    ```
    A API estará disponível em `http://localhost:3000`.

## 🧪 Testes

Os testes são cruciais e focam nas operações de **Core Logic** (`*Core.js`). Para executá-los:

```bash
npm run test
