const express = require('express');
const router = express.Router();
const historialController = require('../controllers/historialController');

router.get('/historial', historialController.list);

module.exports = router;