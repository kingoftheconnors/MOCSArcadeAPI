const express = require('express');
const path = require('path')

const router = express.Router();
const loginController = require('../controllers/login')
const isAuth = require('../middleware/is-auth')

/**
 * Recaptcha
 */
const Recaptcha = require('express-recaptcha').RecaptchaV2;
const recaptcha = new Recaptcha(process.env.RECAPTCHA_SITE_KEY, process.env.RECAPTCHA_SECRET_KEY);

//Here our gets are returning stuff

router.get('/', recaptcha.middleware.render,  isAuth.isNotLoggedIn, loginController.login);

router.get('/register', recaptcha.middleware.render, isAuth.isNotLoggedIn, loginController.register)

//Here our posts are doing stuff

router.post('/', recaptcha.middleware.verify, isAuth.isNotLoggedIn, loginController.postLogin)

router.post('/register',  recaptcha.middleware.verify, isAuth.isNotLoggedIn, loginController.postRegister)

// Email authentication

router.get('/authenticate/:authenticationCode', loginController.authenticate)


router.get('/logout',  loginController.logout)

module.exports = router;