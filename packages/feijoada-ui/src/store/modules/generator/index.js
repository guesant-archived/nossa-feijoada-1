const state = {
  preview: '',
  message: '',
  generator: {
    templatedoc: {},
    sources: [],
  },
};

// getters
const getters = {
  getOption(state) {
    return (key) => state[key];
  },
};

// actions
const actions = {
  changeTemplate({ commit }, templatedoc) {
    commit('SET_TEMPLATE', templatedoc);
  },
};

// mutations
const mutations = {
  SET_OPTION(state, { key, value }) {
    state[key] = value;
  },
  SET_TEMPLATE(state, templatedoc) {
    state.generator.templatedoc = templatedoc;
  },
  SET_MESSAGE(state, message) {
    state.message = message;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
