<template>
  <div>
    <loading v-show="is_loading" />
    <dheader v-if="!is_mobile" />
    <mheader v-if="is_mobile" />
    <Nuxt :class="!is_mobile? 'pt-5':'pt-1'" />
    <toolbar v-if="is_mobile" />
    <dfooter v-if="!is_mobile" />
  </div>
</template>
<script>
import dheader from '~/components/desktop/dheader'
import dfooter from '~/components/desktop/dfooter'
import mheader from '~/components/mobile/mheader'
import toolbar from '~/components/mobile/toolbar'
import loading from '~/components/loading'

export default {
  components:{
    dheader,
    dfooter,
    mheader,
    toolbar,
    loading
  },
  computed:{
    is_loading() {
      return this.$store.state.loading;
    },
    is_mobile() {
      return this.$store.state.is_mobile;
    }
  },
  mounted(){
    if(localStorage.rm_token) {
      this.$store.commit('pushToken', localStorage.rm_token);
    }

    const mediaQuery = window.matchMedia('(max-width: 768px)');

    if(mediaQuery.matches){
      this.$store.commit('setMobile', true);
    }


  }
}
</script>
<style>
</style>
