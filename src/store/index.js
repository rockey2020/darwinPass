import { createStore } from "vuex";

import user from "@/store/modules/user";

import createPersistedState from "../plugins/vuexPersistedstate";

export default createStore({
  modules: { user },
  plugins: [createPersistedState()],
});
