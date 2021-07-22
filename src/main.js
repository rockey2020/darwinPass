import { createApp } from "vue";

import storageCache from "./plugins/storageCache";

storageCache.initStorageCache().then(async () => {
  const app = createApp((await import("./App")).default);

  app.use((await import("./plugins/vant")).default);
  app.use((await import("./store")).default);
  app.use((await import("./router")).default);

  app.config.devtools = true;

  app.mount("#app");
});
