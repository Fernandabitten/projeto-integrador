import { Router } from "express";
import { registerUser, loginUser, updateUser } from "../controllers/userController.js";

const router = Router();

// Rota de cadastro de usuário
router.post("/register", registerUser);

// Rota de login
router.post("/login", loginUser);

//Rota de Update
router.put("/update", updateUser); 

export default router;
