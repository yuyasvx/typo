import Vue from 'vue';
import Vuex from 'vuex';
import homeWindow from './store/home-window';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    homeWindow
  }
});
