import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authenticatedUser: null,
    posts: [],
  },
  mutations: {
    setAuthenticatedUser(state, user) {
      state.authenticatedUser = user;
    },
    addPost(state, post) {
      state.posts.push(post);
    },
    
  },
  actions: {
    login({ commit }, user) {
      commit('setAuthenticatedUser', user);
    },
    createPost({ commit }, post) {
      commit('addPost', post);
    },
    
  },
  getters: {
    isAuthenticated(state) {
      return state.authenticatedUser !== null;
    },
    getUserPosts(state) {
      return state.posts.filter(post => post.user.id === state.authenticatedUser.id);
    }
  }
});
