import { createStore } from "vuex";

import createPersistedState from "../plugins/vuexPersistedstate";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {},
  plugins: [createPersistedState()],
});
