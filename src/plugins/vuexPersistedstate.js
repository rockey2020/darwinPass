import createPersistedState from "vuex-persistedstate";

export default (params = {}) => {
  const baseConfig = {
    key: "v1", //作为版本号
  };
  return createPersistedState({ ...baseConfig, ...params });
};
