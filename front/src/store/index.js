import { createStore } from 'vuex'
 
export default createStore({
  state: {
    user: {},
    posts: [],
  },
  getters: {},
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
  },
 
  actions: {},
  modules: {},
})
