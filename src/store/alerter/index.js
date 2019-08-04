const initialState = {
  active: false,
  body: '',
  type: 'error'
}

const state = Object.assign({}, initialState)

const mutations = {
  'ACTIVATE': (state, payload) => {
    Object.assign(state, payload)
  },
  'DEACTIVATE': (state) => {
    state = Object.assign(state, initialState)
  }
}

const actions = {
  notify: ({ commit }, { body, type }) => {
    return new Promise(() => {
      commit('ACTIVATE', {
        active: true,
        body,
        type
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
