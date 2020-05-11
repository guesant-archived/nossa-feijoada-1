import Vue from 'vue';
import Vuex from 'vuex';
import generator from './modules/generator';
import settings from './modules/settings';
import shared from './modules/shared';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    generator,
    settings,
    shared,
  },
  strict: debug,
});
