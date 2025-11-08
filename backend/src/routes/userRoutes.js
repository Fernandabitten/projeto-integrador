const express = require("express"); // Importa o Express
const router = express.Router(); // Criar router
const { registerUser, loginUser } = require("../controllers/userController.js"); // Importa o controller

// Rota de cadastro de usuário
router.post("/register", registerUser);

//Rota de Login
router.post("/login", loginUser);

module.exports = router;
