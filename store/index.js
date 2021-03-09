export const state = () => ({
  loading:false,
  token:'',
  is_mobile:false
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
  },
  setMobile(state, mobile) {
    state.is_mobile = mobile;
  }
}
