const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const logger = require('./middlewares/logger');

// Middleware para permitir JSON no corpo das requisições
app.use(express.json());
//permitir requisições de origens diferentes
app.use(cors()); 
app.use(logger);

//Rota teste
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Middleware de erro
app.use((err, req, res, next) => {
  console.error('[ERRO]', err);
  res.status(500).json({ erro: 'Ocorreu um erro no servidor' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});