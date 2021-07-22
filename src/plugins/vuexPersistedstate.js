import createPersistedState from "vuex-persistedstate";

import storageCache from "./storageCache";

export default (params = {}) => {
  const baseConfig = {
    key: "v1", //作为版本号
    storage: {
      getItem: (key) => storageCache.storageCache[key],
      setItem: (key, value) => chrome.storage.local.set({ [key]: value }),
      removeItem: (key) => chrome.storage.local.remove([key]),
    },
  };
  return createPersistedState({ ...baseConfig, ...params });
};
