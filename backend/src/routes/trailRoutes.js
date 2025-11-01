
const express = require('express'); // Importa o Express
const router = express.Router(); // Criar router
const trailController = require('../controllers/trailController'); // Importa o controller


// Rota GET /trilhas → chama a função listTrails do controller
router.get('/', trailController.listTrails);

module.exports = router; // Exporta o router