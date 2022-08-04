const Post = require('../models/Publication');

const fs = require('fs');

//accès à l'ensemble des sauces
exports.getAllPost = (req, res, next) => {
  Post.find()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

exports.createPost = (req, res, next) => {
  const postObject = req.body;
  const date = new Date();
  const post = new Post({
    ...postObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${
      req.body.imageUrl
    }`,
    createdAt:
      date.getDate() +
      '/' +
      date.getMonth() +
      '/' +
      date.getFullYear() +
      '  ' +
      date.getHours() +
      ':' +
      date.getMinutes(),
  });
  post
    .save()
    .then(() => res.status(201).json({ message: 'Post créé !' }))
    .catch((error) => res.status(400).json({ error }));
};

//modifier un post
exports.updatePost = (req, res, next) => {
  //vérifie s'il y un champs file
  const postObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete postObject._userId;
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.userId != req.auth.userId) {
        res.status(401).json({ message: 'Non-autorisé' });
      } else {
        Post.updateOne(
          { _id: req.params.id },
          { ...postObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: 'Post modifié !' }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//Supprimer un post
exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.userId != req.auth.userId) {
        res.status(401).json({ message: 'Non-autorisé' });
      } else {
        const filename = post.imageUrl.split('images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Post.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Post supprimé !' }))
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

//Liker & disliker un post
exports.likePost = (req, res, next) => {
  Post.findOne({
    _id: req.params.id,
  }).then((post) => {
    if (req.body.like == 1) {
      if (!post.usersLiked.includes(req.body.userId)) {
        if (post.usersDisliked.includes(req.body.userId)) {
          Post.updateOne(
            { _id: req.params.id },
            {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: req.body.userId },
              _id: req.params.id,
            }
          )
            .then()
            .catch((error) => {
              res.status(400).json({ error: error });
            });
        }
        Post.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: 1 },
            $push: { usersLiked: req.body.userId },
            _id: req.params.id,
          }
        )
          .then(() =>
            res.status(201).json({ message: 'Like ajouté avec succès !' })
          )
          .catch((error) => {
            res.status(400).json({ error: error });
          });
      } else {
        Post.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: -1 },
            $pull: { usersLiked: req.body.userId },
            _id: req.params.id,
          }
        )
          .then(() =>
            res.status(201).json({ message: 'Like retiré avec succès !' })
          )
          .catch((error) => {
            res.status(400).json({ error: error });
          });
      }
    } else {
      if (post.usersLiked.includes(req.body.userId)) {
        Post.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: -1 },
            $pull: { usersLiked: req.body.userId },
            _id: req.params.id,
          }
        )
          .then()
          .catch((error) => {
            res.status(400).json({ error: error });
          });
      }
      if (!post.usersDisliked.includes(req.body.userId)) {
        Post.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: 1 },
            $push: { usersDisliked: req.body.userId },
            _id: req.params.id,
          }
        )
          .then(() =>
            res.status(201).json({ message: 'Dislike ajouté avec succès !' })
          )
          .catch((error) => {
            res.status(400).json({ error: error });
          });
      } else {
        Post.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: -1 },
            $pull: { usersDisliked: req.body.userId },
            _id: req.params.id,
          }
        )
          .then(() =>
            res.status(201).json({ message: 'Dislike retiré avec succès !' })
          )
          .catch((error) => {
            res.status(400).json({ error: error });
          });
      }
    }
  });
};

//  affiche un post
exports.getOnePost = (req, res, next) => {
  Post.findOne({
    _id: req.params.id,
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

//commenter un post
exports.commentPost = (req, res, next) => {
  Post.findOne({
    _id: req.params.id,
  })
    .then((post) => {
      const date = new Date();
      req.body._id = post.comments.length.toString();
      req.body.imageUrl = `${req.protocol}://${req.get('host')}/images/${
        req.body.imageUrl
      }`;
      req.body.createdAt =
        date.getDate() +
        '/' +
        date.getMonth() +
        '/' +
        date.getFullYear() +
        '  ' +
        date.getHours() +
        ':' +
        date.getMinutes();
      Post.updateOne(
        { _id: req.params.id },
        { $push: { comments: req.body }, _id: req.params.id }
      )
        .then(() =>
          res.status(201).json({ message: 'Vous avez commenté ce post' })
        )
        .catch((error) => {
          res.status(400).json({ error: error });
        });
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

//******** M^me logique qu'avoir tous les post
// exports.getAllPostsFromUser = (req, res, next) => {
//   Post.find({ userId: req.params.userId })
//     .then((posts) => {
//       res.status(200).json(posts);
//     })
//     .catch((error) => {
//       res.status(400).json({
//         error: error,
//       });
//     });
// };

// exports.reactToComment = (req, res, next) => {
//   Post.findOne({
//     _id: req.params.id,
//   }).then((post) => {
//     if (req.body.like == 1) {
//       console.log(post.comments[req.params.commentId]);
//       res.status(201).json({ message: "Like ajouté avec succès !" });
//     }
//     if (req.body.like == -1) {
//       console.log(post.comments[req.params.commentId]);
//       res.status(201).json({ message: "Dislike ajouté avec succès !" });
//     }
//   });
// };

//mettre un like/dislike a un commentaire
// exports.likeToComment = (req, res, next) => {
//   Post.findOne({
//     _id: req.params.id,
//   }).then((post) => {
//     if (req.body.like == 1) {
//       console.log(post.comments[req.params.commentId]);
//       res.status(201).json({ message: "Like ajouté avec succès !" });
//     }
//     if (req.body.like == -1) {
//       console.log(post.comments[req.params.commentId]);
//       res.status(201).json({ message: "Dislike ajouté avec succès !" });
//     }
//   });
// };
