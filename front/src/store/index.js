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
      state.posts.push(newPost)
     
    },
    updateUser(state, updatedUser) {
			state.user.description = updatedUser.description
			state.user.picture = updatedUser.picture
		},
    updatePost(state, updatePost){
      state.posts.post = updatePost.post
      state.posts.imageUrl = updatePost.file
    },
    // deletePost(state, id) {
    //   let postFound = {};
    //   state.posts.forEach((post) => {
    //     if (id == post.id) {
    //       postFound = post;
    //     }
    //   });
    //   state.deletePost = postFound;
    // }
  },
 
  actions: {},
  modules: {},
})
