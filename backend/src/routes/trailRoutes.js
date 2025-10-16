
const express = require('express'); // Importa o Express
const router = express.Router(); // Criar router
const trilhaController = require('../controllers/trailController'); // Importa o controller


// Rota GET /trilhas → chama a função listarTrilhas do controller
router.get('/', trilhaController.listarTrilhas);

module.exports = router; // Exporta o router