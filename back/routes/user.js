//Permet d'utiliser express + son middleware "router"
const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');

//associe controllers et routes
const userControllers = require('../controllers/user');
// récupère la fonction pour limiter les essais de mot de passe
const limiter = require('../middleware/limiter')

//créer les routes pour se créer/connecter un compte
router.post('/signup', userControllers.signup);
router.post('/login', limiter, userControllers.login);
router.post('/identify', userControllers.identifyUser);
router.put('/:id', multer, userControllers.updateUser);
router.delete('/:id', userControllers.deleteUser);

module.exports = router;
