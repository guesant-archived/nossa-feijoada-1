import localForage from 'localforage';
const state = {
  options: {
    preview: true,
    account: {
      token: '',
      logged: false,
      username: '',
    },
  },
};

// getters
const getters = {
  getOption(state) {
    return (option) => state.options[option];
  },
};

// actions
const actions = {
  async loadOptions({ commit }) {
    const options = await localForage.getItem('options');
    if (options) {
      commit('setOptions', options);
    }
  },
  async saveOptions({ state }) {
    await localForage.setItem('options', state.options);
  },
  updateOption({ commit, dispatch }, { option, value }) {
    commit('setOption', { option, value });
    dispatch('saveOptions');
  },
};

// mutations
const mutations = {
  setOptions(state, value) {
    state.options = value;
  },
  setOption(state, { option, value }) {
    state.options[option] = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
