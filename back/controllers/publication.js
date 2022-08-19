const Post = require('../models/Publication')
const User = require('../models/User')
const Like = require('../models/Likes')

const fs = require('fs')

exports.createPost = (req, res, next) => {
	const postObject = req.body
	const date = new Date()

	let imageUrl = null

	if (req.file) {
		imageUrl = `${req.protocol}://${req.get('host')}/images/${
			req.file.filename
		}`
	}
	const post = new Post({
		...postObject,
		imageUrl: imageUrl,
		
		
	})
	post
		.save()
		.then(() => res.status(201).json({ post }))
		.catch((error) => res.status(400).json({ error }))
}

//accès à l'ensemble des post
exports.getAllPost = (req, res, next) => {
	let postArray = []
	Post.find()
		.sort({ createdAt: -1 })
		.then((posts) => {
			posts.forEach((post) => {
				// CHECK THIS !!!
				// console.log(post)
				// post.post = ' ahora siii !!!! '
				User.findOne({ _id: post.userId }).then((user) => {
					console.log(post.post)
				})
				postArray.push(post)
			})
			res.status(200).json(postArray)
		})
		.catch((error) => res.status(400).json({ error }))
}

//modifier un post
exports.updatePost = (req, res, next) => {
	const postObject = req.body
	let imageUrl = null

	if (req.file) {
		imageUrl = `${req.protocol}://${req.get('host')}/images/${
			req.file.filename
		}`
		Post.updateOne(
			{ _id: req.params.id },
			{
				$set: { imageUrl: imageUrl, post: req.body.post },
			}
		)
			.then(() => {
				Post.findById({ _id: req.params.id })
					.then((post) => res.status(200).json({ post }))
					.catch((error) => res.status(400).json({ error }))
			})
			.catch((error) => {
				res.status(400).json({ error })
			})
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
					.catch((error) => res.status(400).json({ error }))
			})
			.catch((error) => {
				res.status(400).json({ error })
			})
	}
}

//Supprimer un post
exports.deletePost = (req, res, next) => {
	Post.findOne({ _id: req.params.id })
		.then((post) => {
			if (post.userId != req.auth.userId) {
				res.status(401).json({ message: 'Non-autorisé' })
			} else {
				const filename = post.imageUrl.split('images/')[1];
				fs.unlink(`images/${filename}`, () => {
				Post.deleteOne({ _id: req.params.id })
					.then(() => res.status(200).json({ message: 'Post supprimé !' }))
					.catch((error) => res.status(401).json({ error }))
				});
			}
		})
		.catch((error) => res.status(500).json({ error }))
}

//Liker & disliker un post
exports.likePost = (req, res, next) => {
	if (req.body.like == 1) {
		Like.findOne({ userId: req.body.userId }, { postId: req.body.postId })
			.then((post) => {
				if (post) {
					console.log('dislike')

					Like.findOne(
						{ postId: req.body.postId },
						{ userId: req.body.userId }
					).then((like) => {
						console.log(like)
						Like.deleteOne({ userId: req.body.userId }).then(() =>
							console.log('deleted ...')
						)
						// combien de likes il'y a dans cet post
						Like.find({ postId: req.body.postId }).then((result) => {
							console.log(result.length)
							const likeCount = result.length
							Post.updateOne(
								{ _id: req.body.postId },
								{
									$set: { likes: likeCount },
								}
							).then(() =>
								Post.findOne({ _id: req.body.postId }).then((post) => {
									console.log(post)
									res.status(200).json({ post })
								})
							)
						})
					})
				} else {
					console.log('like')
					const like = new Like({
						userId: req.body.userId,
						postId: req.body.postId,
					})
					like.save().then(() => {
						// combien de likes il'y a dans cet post
						Like.find({ postId: req.body.postId }).then((result) => {
							const likeCount = result.length
							console.log(likeCount)
							Post.updateOne(
								{ _id: req.body.postId },
								{
									$set: { likes: likeCount },
								}
							).then(() =>
								Post.findOne({ _id: req.body.postId }).then((post) => {
									console.log(post)
									res.status(200).json({ post })
								})
							)
						})
					})
				}
			})
			.catch((err) => console.log(err))
	}

	/*
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
							res.status(400).json({ error: error })
						})
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
						res.status(400).json({ error: error })
					})
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
						res.status(400).json({ error: error })
					})
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
						res.status(400).json({ error: error })
					})
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
						res.status(400).json({ error: error })
					})
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
						res.status(400).json({ error: error })
					})
			}
		}
	})
	*/
}



//commenter un post
exports.commentPost = (req, res, next) => {
	Post.findOne({
		_id: req.params.id,
	})
		.then((post) => {
			const date = new Date()
			req.body._id = post.comments.length.toString()
			req.body.imageUrl = `${req.protocol}://${req.get('host')}/images/${
				req.body.imageUrl
			}`
			
			Post.updateOne(
				{ _id: req.params.id },
				{ $push: { comments: req.body }, _id: req.params.id }
			)
				.then(() =>
					res.status(201).json({ message: 'Vous avez commenté ce post' })
				)
				.catch((error) => {
					res.status(400).json({ error: error })
				})
		})
		.catch((error) => {
			res.status(404).json({
				error: error,
			})
		})
}




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


// exports.likePost = (req, res, next) => {
//   /*************************************************************************/
//   Post.findOne({
//     _id: req.params.id,
//   }).then((post) => {
//     switch(req.body.like){
//        //ajouter un like
//       case 1:
//         if (!post.usersLiked.includes(req.body.userId) && req.body.like == 1) {
//           Post.updateOne(
//             { _id: req.params.id },
//             {
//               $inc: { likes: 1 },
//               $push: { usersLiked: req.body.userId },
//               _id: req.params.id,
//             }
//           )
//           .then(() =>
//             res.status(201).json({ message: 'Like ajouté avec succès !' })
//           )
//           .catch((error) => {
//             res.status(400).json({ error: error });
//           });
//         }
//       break;
//       case -1:
//         //ajouter un dislike
//       if (!post.usersDisliked.includes(req.body.userId) && req.body.like == 1)  {
//         Post.updateOne(
//           { _id: req.params.id },
//           {
//             $inc: { dislikes: 1 },
//             $push: { usersDisliked: req.body.userId },
//             _id: req.params.id,
//           }
//         )
//           .then(() =>
//             res.status(201).json({ message: 'Dislike ajouté avec succès !' })
//           )
//           .catch((error) => {
//             res.status(400).json({ error: error });
//           });
//       }
//       break;
//       case 0:
//           //like doit revenir à 0
//           if(post.usersLiked.includes(req.body.userId))  {
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
//           //dislike doit revenir à 0
//           if(post.usersDisliked.includes(req.body.userId)){
//             Post.updateOne(
//               { _id: req.params.id },
//               {
//                 $inc: { dislikes: -1 },
//                 $pull: { usersDisliked: req.body.userId },
//                 _id: req.params.id,
//               }
//             )
//               .then(() =>
//                 res.status(201).json({ message: 'Dislike retiré avec succès !' })
//               )
//               .catch((error) => {
//                 res.status(400).json({ error: error });
//               });
//             }
//             break;
//     }
//   })
//   .catch((error) => {
//     res.status(404).json({ error });
//   });
// };





