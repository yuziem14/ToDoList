const express = require('express');
const authController = require('../Controllers/AuthController');

const router = express.Router();

/*  ---------------------------------------------------- 
                Authentication Routes
    ---------------------------------------------------- 
*/

router
  .get('/login', authController.viewLogin)
  .post('/login', authController.login)
  .get('/register', authController.viewRegister)
  .post('/register', authController.register)
  .get('/logout', authController.logout);

module.exports = router;
