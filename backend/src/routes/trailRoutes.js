const express = require("express"); // Importa o Express
const router = express.Router(); // Criar router
const trailController = require("../controllers/trailController"); // Importa o controller

// Rota GET /trails → chama a função listTrails do controller
router.get("/", trailController.listTrails);

router.post("/", trailController.createTrail);

module.exports = router; // Exporta o router
