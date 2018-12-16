interface state {
  pageTitle: string | null;
}

export default {
  namespaced: true,
  state: {
    pageTitle: 'Typo'
  },
  mutations: {
    updateTitle(state: state, text: string): void {
      state.pageTitle = text;
    }
  },
  actions: {},
  getters: {}
};
