const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// const passport = require('passport');

// SIGNIN
router.get('/usuarios', usuariosController.list);
router.post('/addUsuario', usuariosController.addUsuario);
router.post('/eliminarUsuario', usuariosController.eliminarUsuario);

module.exports = router;

