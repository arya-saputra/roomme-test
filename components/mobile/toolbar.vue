<template>
  <section class="fixed-bottom shadow">
    <div class="row mx-0 toolbar">
      <div :class="url_name=='/'?'col-4 text-center active':'col-4 text-center'">
        <a href="/" class="text-decoration-none" style="color:inherit;">
          <i class="bi bi-house"></i>
          <p class="f12">Home</p>
        </a>
      </div>
      <div :class="url_name=='/rooms/' || url_name=='/rooms'?'col-4 text-center active':'col-4 text-center'">
        <a href="/rooms/" class="text-decoration-none" style="color:inherit;">
          <i class="bi bi-building"></i>
          <p class="f12">Unit Listing</p>
        </a>
      </div>
      <div class="col-4 text-center" v-show="!token">
        <a href="/m/auth/" class="text-decoration-none" style="color:inherit;">
          <i class="bi bi-person"></i>
          <p class="f12">Sign In</p>
        </a>
      </div>
      <div class="col-4 text-center" v-show="token" @click="logout">
          <i class="bi bi-person"></i>
          <p class="f12">Logout</p>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  computed:{
    token(){
      return this.$store.state.token
    },
    url_name(){
      return this.$route.path
    }
  },
  mounted(){
    console.log(this.url_name)
  },
  methods:{
    logout: function(){
      localStorage.clear();
      this.$store.commit('clearToken');
    }
  }
}
</script>
<style scoped>
.fixed-bottom{
  position: fixed;
  background: white;
  padding:15px 0 0;
}

.toolbar .active{
  color:tomato
}
</style>
