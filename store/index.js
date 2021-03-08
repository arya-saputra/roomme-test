export const state = () => ({
  loading:false,
  token:''
});

export const mutations = {
  onLoading(state) {
    state.loading=true;
  },
  onLoaded(state) {
    state.loading=false;
  },
  pushToken(state, newtoken) {
    state.token = newtoken;
  },
  clearToken(state) {
    state.token = '';
  }
}
