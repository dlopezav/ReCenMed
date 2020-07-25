const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');

router.get('/compras', compraController.list);
router.post('/editProv', compraController.editProv);
router.post('/deleteProv', compraController.deleteProv);
router.post('/crearProv', compraController.crearProv);
router.post('/searchInCompra', compraController.searchInCompra);
router.post('/comprar', compraController.comprar);

module.exports = router;