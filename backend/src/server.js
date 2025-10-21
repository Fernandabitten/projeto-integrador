const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const logger = require('./middlewares/logger');
const trilhaRoutes = require('./routes/trailRoutes');
const  userRoutes = require("./routes/userRoutes"); 

// Middleware para permitir JSON no corpo das requisições
app.use(express.json());
//permitir requisições de origens diferentes
app.use(cors()); 
app.use(logger);

//Rota teste
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Usa as rotas de trilhas
app.use('/trilhas', trilhaRoutes);

app.use("/auth", userRoutes);

// Middleware de erro
app.use((err, req, res, next) => {
  console.error('[ERRO]', err);
  res.status(500).json({ erro: 'Ocorreu um erro no servidor' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});