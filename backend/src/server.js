import express from "express";
import "dotenv/config";
import cors from "cors";
import logger from "./middlewares/logger.js";
import trilhaRoutes from "./routes/trailRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = 3000;

// Middleware para permitir JSON no corpo das requisições
app.use(express.json());

//permitir requisições de origens diferentes
// === CORS CONFIG CORRETA PARA USAR COOKIES/SESSÕES ===
app.use(cors({
  origin: "http://localhost:5173", // endereço do seu frontend
  credentials: true               // permite enviar cookies/sessão
}));

// Headers adicionais para evitar erro no preflight OPTIONS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});


// Logger
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
