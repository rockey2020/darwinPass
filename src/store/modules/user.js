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
      Object.entries(data).forEach(([key, value]) => {
        if (Object.keys(state).includes(key)) {
          state[key] = value;
        }
      });
    },
  },
  actions: {
    updateUser(context, data) {
      context.commit("updateUser", data);
    },
  },
};
