const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

router.get('/productos', productoController.list);
router.post('/add', productoController.save);
router.post('/search', productoController.search);
router.post('/update', productoController.update);
router.post('/delete', productoController.delete);

module.exports = router;