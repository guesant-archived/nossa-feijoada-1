import Vue from 'vue';
import Vuex from 'vuex';
import settings from './modules/settings';
import shared from './modules/shared';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    settings,
    shared,
  },
  strict: debug,
});
