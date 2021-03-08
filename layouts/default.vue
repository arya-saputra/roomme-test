<template>
  <div>
    <loading v-show="is_loading" />
    <dheader />
    <Nuxt class="pt-5" />
    <dfooter />
  </div>
</template>
<script>
import dheader from '~/components/desktop/dheader'
import dfooter from '~/components/desktop/dfooter'
import loading from '~/components/loading'

export default {
  components:{
    dheader,
    dfooter,
    loading
  },
  computed:{
    is_loading() {
      return this.$store.state.loading;
    },
  },
  mounted(){
    if(localStorage.rm_token) {
      this.$store.commit('pushToken', localStorage.rm_token)
    }
  }
}
</script>
<style>
</style>
