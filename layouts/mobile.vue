<template>
  <section>
    <loading v-if="is_loading" />
    <Nuxt />
  </section>
</template>
<script>
import loading from '~/components/loading'
export default {
  components:{
    loading
  },
  computed:{
    is_loading() {
      return this.$store.state.loading;
    },
  }
}
</script>
