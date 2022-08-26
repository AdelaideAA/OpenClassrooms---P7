import { createStore } from 'vuex'
  import axios from 'axios'

export default createStore({
	state: {
		user: {},
		posts: [],
	},
	getters: {
		
	},
	mutations: {
		setUser(state, user) {
			state.user = user
		},
		setPosts(state, posts) {
			state.posts = posts
		},
		ajouterPost(state, newPost) {
			state.posts.unshift(newPost)
		},
		updateUser(state, updatedUser) {
			state.user.description = updatedUser.description
			state.user.picture = updatedUser.picture
		},
		updatePost(state, updatedPost) {
			state.posts.forEach((post) => {
				if (post._id === updatedPost._id) {
					post.post = updatedPost.post
					post.imageUrl = updatedPost.imageUrl
				}
			})
		},
		updateLikes(state, updatedPost) {
			state.posts.forEach((post) => {
				if (post._id == updatedPost._id) {
					post.likes = updatedPost.likes
					//post.usersLiked = updatedPost.usersLiked
					console.log('updatePost.likes', updatedPost.likes)
					console.log('post.likes', post.likes)
				}
			})
		},
		deletePost(state, post) {
			console.log('runnning deletePost', post, state.posts)
			var index = state.posts.findIndex((p) => p.id == post._id)
			state.posts.splice(index, 1)
		},
	},

	actions: {
		async getAllPosts(context) {
			try {
				const response = await axios.get('publication', {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				context.commit('setPosts', response.data)
			} catch  (err) {
				console.log(err)
			}
			
		},
	},
	modules: {},
})
