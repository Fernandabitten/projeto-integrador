# Backend - Projeto Integrador

Este é o backend do Projeto Integrador, desenvolvido com **Node.js** e **Express**.

## Tecnologias

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Nodemon](https://nodemon.io/)
- [CORS](https://www.npmjs.com/package/cors)

---

## Requisitos

- **Node.js** versão 18 ou superior  
- **npm** (gerenciador de pacotes do Node)

---

## Instalação

1. **Clone o repositório**
   ```bash
   git clone git clone https://github.com/Fernandabitten/projeto-integrador.git
   cd projeto-integrador/backend
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

---

## Execução

### Ambiente de desenvolvimento
Usa **Nodemon** para reiniciar o servidor automaticamente a cada mudança.

```bash
npm run dev
```

### Ambiente de produção
Executa o servidor normalmente com Node.js.

```bash
npm start
```

---

## Estrutura básica do projeto

```
backend/
│
├── src/
│   ├── server.js                # Ponto de entrada do servidor Express
│   │
│   ├── routes/                  # Rotas da aplicação
│   │   ├── userRoutes.js
│   │   └── trailRoutes.js
│   │
│   ├── controllers/             # Controladores (lógica de negócio)
│   │   ├── userController.js
│   │   └── trailController.js
│   │
│   └── middlewares/             # Middlewares personalizados
│       └── ogger.js
│
└── package.jsonS

```

## Middleware de Logger

O servidor inclui um middleware simples que exibe o método e a URL de cada requisição:

```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
```

---

## CORS

O CORS está habilitado para permitir requisições externas:
```javascript
app.use(cors());
```

---

## Teste rápido

Após rodar `npm run dev`, acesse:
```
http://localhost:3000/
```
Você deve ver no terminal:

```
[LOG] GET /
```
