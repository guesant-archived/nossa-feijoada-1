const state = {
  global: {
    appLoading: false,
    appLoadingMessage: '',
  },
};

// getters
const getters = {
  getOption(state) {
    return (option) => state.global[option];
  },
};

// actions
const actions = {};

// mutations
const mutations = {
  setOptions(state, value) {
    state.global = value;
  },
  setOption(state, { option, value }) {
    state.global[option] = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
