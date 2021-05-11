export default {
  state: () => ({
    id: null,
    username: "",
    email: "",
    maxIdleTime: 0,
    servicePlatformType: null,
    authorization: "",
    //自定义字段
    servicePlatformTypeText: null,
  }),
  mutations: {
    updateUser(state, data) {
      Object.assign(state, data);
    },
  },
  actions: {
    updateUser(context, data) {
      context.commit("updateUser", data);
    },
  },
};
