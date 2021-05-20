import { createStore } from "vuex";

import password from "@/store/modules/password";
import setting from "@/store/modules/setting";
import user from "@/store/modules/user";

import createPersistedState from "../plugins/vuexPersistedstate";

export default createStore({
  modules: { user, setting, password },
  plugins: [createPersistedState()],
});
