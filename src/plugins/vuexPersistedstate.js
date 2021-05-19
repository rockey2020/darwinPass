import createPersistedState from "vuex-persistedstate";

export default (params = {}) => {
  const baseConfig = {};
  return createPersistedState({ ...baseConfig, ...params });
};
