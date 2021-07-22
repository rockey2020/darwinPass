let storageCache = {};

const syncReadStorage = (key) => {
  return new Promise((resolve) => {
    chrome.storage.local.get([key], (obj) => {
      storageCache[key] = obj[key];
      resolve(storageCache);
    });
  });
};

export default {
  storageCache,
  initStorageCache: async () => {
    await syncReadStorage("v1");
    chrome.storage.onChanged.addListener(async (changes, namespace) => {
      await syncReadStorage("v1");
    });
  },
};
