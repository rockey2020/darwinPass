import { createApp } from "vue";

import App from "./App";
import vant from "./plugins/vant";
import router from "./router";
import store from "./store";

const app = createApp(App);

app.use(vant);
app.use(store);
app.use(router);

app.config.devtools = true;

app.mount("#app");
