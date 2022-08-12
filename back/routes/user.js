//Permet d'utiliser express + son middleware "router"
const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');

//associe controllers et routes
const userControllers = require('../controllers/user');
// récupère la fonction pour limiter les essais de mot de passe
//const limiter = require('../middleware/limiter')***voir pour ajouter étape "limiter" dans route login

//créer les routes pour se créer/connecter un compte
router.post('/signup', userControllers.signup);
router.post('/login', userControllers.login);
//router.get('/logout', userControllers.logout); NE SERT A RIEN
router.post('/identify', userControllers.identifyUser);
router.post('/:id', multer, userControllers.updateUser);
router.delete('/:id', userControllers.deleteUser);

//créer les routes pour acceder et effectuer des actions sur son espace personnel
// router.get('/:id', userControllers.userInfo);

// router.delete('/:id', userControllers.deleteUser);

module.exports = router;
