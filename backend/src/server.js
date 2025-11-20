import express from "express";
import cors from "cors";
import logger from "./middlewares/logger.js";
import trilhaRoutes from "./routes/trailRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = 3000;

// Middleware para permitir JSON no corpo das requisições
app.use(express.json());
//permitir requisições de origens diferentes
app.use(cors());
app.use(logger);

//Rota teste
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Usa as rotas de trilhas
app.use("/trails", trilhaRoutes);

app.use("/auth", userRoutes);

// Middleware de erro
app.use((err, req, res, next) => {
  console.error("[ERRO]", err);
  res.status(500).json({ erro: "Ocorreu um erro no servidor" });
});

//Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
