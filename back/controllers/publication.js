const Post = require('../models/Publication');
const User = require('../models/User');
const Like = require('../models/Likes');

const fs = require('fs');

exports.createPost = (req, res, next) => {
  const postObject = req.body;
  //const date = new Date();

  let imageUrl = null;

  if (req.file) {
    imageUrl = `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`;
  }
  const post = new Post({
    ...postObject,
    imageUrl: imageUrl,
  });
  post
    .save()
    .then(() => res.status(201).json({ post }))
    .catch((error) => res.status(400).json({ error }));
};

//accès à l'ensemble des post
exports.getAllPost = (req, res, next) => {
  let postArray = [];
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => {
      posts.forEach((post) => {
        // CHECK THIS !!!
        // console.log(post)
        // post.post = ' ahora siii !!!! '
        User.findOne({ _id: post.userId }).then((user) => {
          console.log(post.post);
        });
        postArray.push(post);
      });
      res.status(200).json(postArray);
    })
    .catch((error) => res.status(400).json({ error }));
};

//modifier un post logique ok mais ne supprime pas les images du back
exports.updatePost = (req, res, next) => {
  const postObject = req.body;
  let imageUrl = null;

  if (req.file) {
    imageUrl = `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`;
    Post.updateOne(
      { _id: req.params.id },
      {
        $set: { imageUrl: imageUrl, post: req.body.post },
      }
    )
      .then(() => {
        Post.findById({ _id: req.params.id })
          .then((post) => res.status(200).json({ post }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  } else {
    Post.updateOne(
      { _id: req.params.id },
      {
        $set: { post: req.body.post },
      }
    )
      .then(() => {
        Post.findById({ _id: req.params.id })
          .then((post) => res.status(200).json({ post }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  }
};

/****************************************** logique upDate se coince car deux requêtes sont executées mais celle ci supprime bien images du back*/

// exports.updatePost = (req, res, next) => {
//   User.findOne({ _id: req.auth.userId }).then((user) => {
//     console.log(user);
//     Post.findOne({ _id: req.params.id }).then((post) => {
//       console.log('post', post);
//       console.log('post.imageUrl', post.imageUrl);

//       if (post.userId != req.auth.userId && user.admin == 'false') {
//         res.status(401).json({ message: 'Non-autorisé' });
//       } else {
//         try {
//           Post.findOne({ _id: req.params.id }).then((post) => {
//             if (post.imageUrl) {
//               const filename = post.imageUrl.split('images/')[1];
//               console.log('filename', filename);
//               fs.unlink(`images/${filename}`, (error) => {
//                 console.log('image supp');
//                 if (error) throw error;
//                 console.log(error);
//               });
//             } else {
//               console.log("ce post n'a pas de fichier à supprimer");
//             }
//             Post.updateOne({ _id: req.params.id })
//               .then((post) => {
//                 console.log('Post modifiée');
//                 res.status(200).json(post);
//               })
//               .catch((error) => res.status(400).json({ error }));
//           });
//         } catch {
//           (error) => res.status(500).json({ error });
//         }
//       }
//     });
//   });
// };

exports.deletePost = (req, res, next) => {
  User.findOne({ _id: req.auth.userId }).then((user) => {
    // console.log(user);
    Post.findOne({ _id: req.params.id }).then((post) => {
      // console.log('post', post);
      if (post.userId != req.auth.userId && user.admin == 'false') {
        res.status(401).json({ message: 'Non-autorisé' });
      } else {
        try {
          Post.findOne({ _id: req.params.id }).then((post) => {
            if (post.imageUrl) {
              const filename = post.imageUrl.split('images/')[1];
              console.log('filename', filename);
              fs.unlink(`images/${filename}`, (error) => {
                console.log('image supp');
                if (error) throw error;
                console.log(error);
              });
            } else {
              console.log("ce post n'a pas de fichier à supprimer");
            }
            Post.deleteOne({ _id: req.params.id })
              .then((post) => {
                console.log('Post supprimé');
                res.status(200).json(post);
              })
              .catch((error) => res.status(400).json({ error }));
          });
        } catch {
          (error) => res.status(500).json({ error });
        }
      }
    });
  });
};

//Liker & disliker un post derniere méthode testée
exports.likePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id }).then((post) => {
    if (!post.usersLiked.includes(req.body.userId)) {
      let toChange = {
        $inc: { likes: +1 },
        $push: { usersLiked: req.body.userId },
      };

      Post.updateOne({ _id: req.params.id }, toChange)

        .then(() => {
          res.status(200).json({ message: 'Liked!', post });
        })
        .catch((error) => res.status(400).json({ error }));
    } else if (post.usersLiked.includes(req.body.userId)) {
      Post.updateOne(
        { _id: req.params.id },

        { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
      )
        .then(() => {
          res.status(200).json({ message: 'Post unliked', post });
        })
        .catch((error) => res.status(400).json({ error }));
    }
  });
};

//Liker & disliker un post METHODE MARTIN
// exports.likePost = (req, res, next) => {
//   if (req.body.like == 1) {
//     Like.findOne({ userId: req.body.userId }, { postId: req.body.postId })
//       .then((post) => {
//         if (post) {
//           console.log('dislike');
//           Like.findOne(
//             { postId: req.body.postId },
//             { userId: req.body.userId }
//           ).then((like) => {
//             console.log(like);
//             Like.deleteOne({ userId: req.body.userId }).then(() =>
//               console.log('deleted ...')
//             );
//             // combien de likes il'y a dans cet post
//             Like.find({ postId: req.body.postId }).then((result) => {
//               console.log(result.length);
//               const likeCount = result.length;
//               Post.updateOne(
//                 { _id: req.body.postId },
//                 {
//                   $set: { likes: likeCount },
//                 }
//               ).then(() =>
//                 Post.findOne({ _id: req.body.postId }).then((post) => {
//                   console.log(post);
//                   res.status(200).json({ post });
//                 })
//               );
//             });
//           });
//         } else {
//           console.log('like');
//           const like = new Like({
//             userId: req.body.userId,
//             postId: req.body.postId,
//           });
//           like.save().then(() => {
//             // combien de likes il'y a dans cet post
//             Like.find({ postId: req.body.postId }).then((result) => {
//               const likeCount = result.length;
//               console.log(likeCount);
//               Post.updateOne(
//                 { _id: req.body.postId },
//                 {
//                   $set: { likes: likeCount },
//                 }
//               ).then(() =>
//                 Post.findOne({ _id: req.body.postId }).then((post) => {
//                   console.log(post);
//                   res.status(200).json({ post });
//                 })
//               );
//             });
//           });
//         }
//       })
//       .catch((err) => console.log(err));
//   }
// };
//};

// exports.likePost = (req, res, next) => {
//   /*************************************************************************/
//   Post.findOne({
//     _id: req.params.id,
//   })
//     .then((post) => {
//       switch (req.body.like) {
//         //ajouter un like
//         case 1:
//           if (
//             !post.usersLiked.includes(req.body.userId) &&
//             req.body.like == 1
//           ) {
//             console.log('like trouvé');
//             Like.updateOne(
//               console.log('like peut update'),
//               { _id: req.params.id },
//               {
//                 $inc: { likes: 1 },
//                 $push: { usersLiked: req.body.userId },
//                 _id: req.params.id,
//               }
//             )
//               .then(() =>
//                 res.status(201).json({ message: 'Like ajouté avec succès !' })
//               )
//               .catch((error) => {
//                 res.status(400).json({ error: error });
//               });
//           }
//           break;
            //ajouter un dislike
//         //       case -1:
//         //       if (!post.usersDisliked.includes(req.body.userId) && req.body.like == 1)  {
//         //         Post.updateOne(
//         //           { _id: req.params.id },
//         //           {
//         //             $inc: { dislikes: 1 },
//         //             $push: { usersDisliked: req.body.userId },
//         //             _id: req.params.id,
//         //           }
//         //         )
//         //           .then(() =>
//         //             res.status(201).json({ message: 'Dislike ajouté avec succès !' })
//         //           )
//         //           .catch((error) => {
//         //             res.status(400).json({ error: error });
//         //           });
//         //       }
//         //       break;
//         case 0:
//          //like doit revenir à 0
//           if (post.usersLiked.includes(req.body.userId)) {
//             Post.updateOne(
//               { _id: req.params.id },
//               {
//                 $inc: { likes: -1 },
//                 $pull: { usersLiked: req.body.userId },
//                 _id: req.params.id,
//               }
//             )
//               .then(() =>
//                 res.status(201).json({ message: 'Like retiré avec succès !' })
//               )
//               .catch((error) => {
//                 res.status(400).json({ error: error });
//               });
//           }
//           break;
//         //dislike doit revenir à 0
//         //           if(post.usersDisliked.includes(req.body.userId)){
//         //             Post.updateOne(
//         //               { _id: req.params.id },
//         //               {
//         //                 $inc: { dislikes: -1 },
//         //                 $pull: { usersDisliked: req.body.userId },
//         //                 _id: req.params.id,
//         //               }
//         //             )
//         //               .then(() =>
//         //                 res.status(201).json({ message: 'Dislike retiré avec succès !' })
//         //               )
//         //               .catch((error) => {
//         //                 res.status(400).json({ error: error });
//         //               });
//         //             }
//         //             break;
//       }
//     })
//     .catch((error) => {
//       res.status(404).json({ error });
//     });
// };
