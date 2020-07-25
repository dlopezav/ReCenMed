const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');

router.get('/ventas', ventaController.list);
router.post('/editCliente', ventaController.editCliente);
router.post('/deleteCliente', ventaController.deleteCliente);
router.post('/crearCliente', ventaController.crearCliente);
router.post('/searchInVenta', ventaController.searchInVenta);
router.post('/vender', ventaController.vender);

module.exports = router;