const express = require('express');
const router = express.Router();

const publicationCtrl = require('../controllers/publication');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//voir la totalité des post
router.get('/', auth, publicationCtrl.getAllPost);
//créer un post
router.post('/', auth, multer, publicationCtrl.createPost);
//modifier un post
router.put('/:id', auth, multer, publicationCtrl.updatePost);
//supprimer un post
router.delete('/:id', auth, publicationCtrl.deletePost);
//like & dislike
router.post('/:id/like', auth, publicationCtrl.likePost);

//voir un post, pas sûre d'en avoir besoin
//router.get('/:id', auth, publicationCtrl.getOnePost);
//router.get("/:userId", auth, publicationCtrl.getAllPostsFromUser);

// commenter un post
//router.post('/:id/comment', auth, multer, publicationCtrl.commentPost);



module.exports = router;
