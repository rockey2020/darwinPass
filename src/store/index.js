import { createStore } from "vuex";

import setting from "@/store/modules/setting";
import user from "@/store/modules/user";

import createPersistedState from "../plugins/vuexPersistedstate";

export default createStore({
  modules: { user, setting },
  plugins: [createPersistedState()],
});
