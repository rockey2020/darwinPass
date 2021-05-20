export default {
  state: () => ({
    list: [],
  }),
  mutations: {
    updatePasswordList(state, data) {
      state.list = data;
    },
  },
  actions: {
    updatePasswordList(context, data) {
      context.commit("updatePasswordList", data);
    },
  },
};
