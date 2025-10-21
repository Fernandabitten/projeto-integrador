const express = require('express'); // Importa o Express
const router = express.Router(); // Criar router
const registerUser = require('../controllers/userController.js'); // Importa o controller


// Rota de cadastro de usuário
router.post("/register", registerUser.registerUser);

module.exports = router;