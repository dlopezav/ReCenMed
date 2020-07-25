const express = require('express');
const router = express.Router();
const signinController = require('../controllers/signinController');

// const passport = require('passport');

// SIGNIN
router.get('/', signinController.list);
router.post('/logearse', signinController.signin);
router.post('/logout', signinController.logout);
router.get('/logout', signinController.logout);

module.exports = router;

