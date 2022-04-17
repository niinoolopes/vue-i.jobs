import { createStore } from 'vuex'

export default createStore({
  state: {
    logged: false,
    perfil: {}
  },
  getters: {
    isUser(state) {
      return state.logged && !!state.perfil?.skillIds
    },
    isCompany(state) {
      return state.logged && !!state.perfil?.vagaIds
    },
  },
  mutations: {
    SET(store, { key, value }) {

      if (!(key in store)) {
        return
      }
      store[key] = value
    }
  },
  actions: {
    signIn: ({ commit }, usuario) => {
      commit('SET', {
        key: 'logged',
        value: true
      })

      commit('SET', {
        key: 'perfil',
        value: usuario
      })
    },

    signOut: ({ commit }) => {
      commit('SET', {
        key: 'logged',
        value: false
      })

      commit('SET', {
        key: 'perfil',
        value: {}
      })
    },
  },
  modules: {
  }
})
