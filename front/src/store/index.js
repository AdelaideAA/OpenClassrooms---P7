import { createStore } from 'vuex'

export default createStore({
	state: {
		user: {},
		posts: [],
	},
	getters: {
		// getPosts(state){
		//   return state.posts
		// }
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
			// state.posts.post = updatePost.post
			// state.posts.imageUrl = updatePost.file
			state.posts.forEach((post) => {
				if (post._id === updatedPost._id) {
					post.post = updatedPost.post
					post.imageUrl = updatedPost.imageUrl
				}
			})
		},
		updateLikes(state, updatedPost) {
			console.log(updatedPost.likes)
			state.posts.forEach((post) => {
				if (post._id == updatedPost._id) {
					post.likes = updatedPost.likes
				}
			})
			// state.posts.post.likes = likesCoun
		},
		deletePost(state, post) {
			var index = state.posts.findIndex(p => p.id == post._id);
			state.posts.splice(index, 1);
			
		  //let postFound = {};
		//   state.posts.forEach((post) => {
		//     if (post._id == deletedPost._id) {
		// 		post.post = deletedPost.post
		//       //postFound = post;
		//     }
		 // });
		  
		}
	},

	actions: {},
	modules: {},
})
