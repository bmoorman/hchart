import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    vars: [0,1], //MUST NOT CHANGE THE NAME OF THE ARRAY
  },
  mutations: {
    setVars (state, value) {
      state.vars = value
    }
  },
  actions: {
  },
  modules: {
  }
})
