const express = require('express');
const authController = require('../Controllers/AuthController');

const router = express.Router();

/*  ---------------------------------------------------- 
                Authentication Routes
    ---------------------------------------------------- 
*/

router
  .get('/login', authController.getLogin)
  .get('/register', authController.getRegister)
  .post('/register', authController.register)
  .get('/logout', authController.logout);

module.exports = router;
