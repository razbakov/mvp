export default {
  namespaced: true,
  state: {
    user: null,
    loading: true
  },
  mutations: {
    setUser(state, payload) {
      state.loading = false;
      state.user = payload;
    }
  }
};
