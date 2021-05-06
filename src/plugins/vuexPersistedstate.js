import createPersistedState from "vuex-persistedstate";

import localforage from "@/plugins/localforage";

export default (params = {}) => {
  const baseConfig = {
    storage: {
      getItem: (key) => localforage.getItem(key),
      setItem: (key, value) => localforage.setItem(key, value),
      removeItem: (key) => localforage.removeItem(key),
    },
  };
  return createPersistedState({ ...baseConfig, ...params });
};
