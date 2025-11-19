import { Router } from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = Router();

// Rota de cadastro de usuário
router.post("/register", registerUser);

// Rota de Login
router.post("/login", loginUser);

export default router;
