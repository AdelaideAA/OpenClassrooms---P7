//Permet d'utiliser express + son middleware "router"
const express = require('express');
const router = express.Router();

//associe controllers et routes
const userControllers = require('../controllers/user');
// récupère la fonction pour limiter les essais de mot de passe
//const limiter = require('../middleware/limiter')***voir pour ajouter étape "limiter" dans route login

//créer les routes pour se créer/connecter un compte
router.post('/signup', userControllers.signup);
router.post('/login', userControllers.login);

module.exports = router; 