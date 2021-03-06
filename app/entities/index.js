const express = require('express');
const mongoose = require('mongoose');
const { catchErrors } = require('../handlers/errorHandlers');
const authController = require('./user/controllers/auth');
const verificationController = require('./admin/controllers/verification');
const registrationController = require('./user/controllers/register');
const router = express.Router();

router.get('/', (req, res) => {res.render('index')});

// ------------ REGISTRATION CONTROLLER ------------- //

router.get( '/register', registrationController.registerForm);
router.post( '/register',
    catchErrors(registrationController.validateRegister),
    catchErrors(registrationController.register)
);

// ------------ VERIFICATION CONTROLLER ------------- //
// router.get('/resend', userController.resendURL);
// router.post('/resend', catchErrors(userController.resendVerificationToken));
router.get('/verification', verificationController.verification);
router.get('/account/verify/:token', catchErrors(verificationController.confirmationPost));
router.post('/account/verify/:token', catchErrors(verificationController.confirmationPost));

// ------------ LOGIN CONTROLLER ------------- //

router.get('/login', authController.loginForm); 
router.post( '/login',
    catchErrors(verificationController.isVerified),
    catchErrors(authController.logInStatus),
    authController.login
);

router.get('/logout', authController.logout);

module.exports = router;