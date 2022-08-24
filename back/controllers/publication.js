const Post = require('../models/Publication')
const User = require('../models/User')

const fs = require('fs')

exports.createPost = (req, res, next) => {
	const postObject = req.body
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
				User.findOne({ _id: post.userId }).then((user) => {
					console.log(post.post)
				})
				postArray.push(post)
			})
			res.status(200).json(postArray)
		})
		.catch((error) => res.status(400).json({ error }))
}

//modifier un post logique ok mais ne supprime pas les images du back
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
	User.findOne({ _id: req.auth.userId }).then((user) => {
		Post.findOne({ _id: req.params.id }).then((post) => {
			//console.log('post', post);
			if (post.userId != req.auth.userId && user.admin == 'false') {
				res.status(401).json({ message: 'Non-autorisé' })
			} else {
				try {
					Post.findOne({ _id: req.params.id }).then((post) => {
						if (post.imageUrl) {
							const filename = post.imageUrl.split('images/')[1]
							//console.log('filename', filename)
							fs.unlink(`images/${filename}`, (error) => {
								console.log('image supp')
								if (error) throw error
								console.log(error)
							})
						} else {
							console.log("ce post n'a pas de fichier à supprimer")
						}
						Post.deleteOne({ _id: req.params.id })
							.then((delPost) => {
								console.log('Post supprimé')
								res.status(200).json({delPost})
							})
							.catch((error) => res.status(400).json({ error }))
					})
				} catch {
					;(error) => res.status(500).json({ error })
				}
			}
		})
	})
}

//Liker & disliker un post derniere méthode testée
exports.likePost = (req, res, next) => {
	Post.findOne({ _id: req.params.id }).then((post) => {
		if (!post.usersLiked.includes(req.body.userId)) {
			let toChange = {
				$inc: { likes: +1 },
				$push: { usersLiked: req.body.userId },
			}

			Post.updateOne({ _id: req.params.id }, toChange)

				.then(() => {
					Post.findOne({ _id: req.params.id }).then((updatedPost) =>
						res.status(200).json({ message: 'Liked!', updatedPost })
					)
				})
				.catch((error) => res.status(400).json({ error }))
		} else if (post.usersLiked.includes(req.body.userId)) {
			Post.updateOne(
				{ _id: req.params.id },

				{ $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
			)
				.then(() => {
					Post.findOne({ _id: req.params.id }).then((updatedPost) =>
						res.status(200).json({ message: 'Post unliked', updatedPost })
					)
					// res.status(200).json({ message: 'Post unliked', post })
				})
				.catch((error) => res.status(400).json({ error }))
		}
	})
}


