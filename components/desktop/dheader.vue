<template>
  <section class="header-top-fix shadow-sm">
    <div class="container ">
      <div class="row align-items-center dnavbar">
        <div class="col-md-10 col-sm-12">
          <a href="/">
            <img src="/img/logo.png" width="80">
          </a>
        </div>
        <div class="col-md-2">
          <div class="text-danger text-end" v-if="token" @click="logout">Logout</div>
          <div class="popover-group float-end" v-if="!token">
            <button type="button" class="btn btn-outline-danger example-popover" @click="popover_show? popover_show=false:popover_show=true">Sign In</button>
            <div class="popover-box top shadow" @blur="popover_show=false" v-show="popover_show">
              <popupauth @close="popover_show=false" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import popupauth from '~/components/desktop/popupauth'

export default {
  components:{
    popupauth
  },
  data(){
    return {
      popover_show:false,
    }
  },
  computed:{
    token() {
      return this.$store.state.token;
    }
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
.dnavbar {
  padding: 10px 0;
  height: 70px;
}

.popover-group{
  position: relative;
}

.popover-box{
  width: 310px;
  padding: 14px;
  position: absolute;
  right: 0;
  top: 48px;
  border-radius: 6px;
  background: white;
  z-index: 10;
}

.popover-box::before {
	content: "";
	width: 0px;
	height: 0px;
	border: 0.8em solid transparent;
	position: absolute;
}

.popover-box.top::before {
	right: 10px;
	top: -24px;
	border-bottom: 10px solid #ffffff;
}

.header-top-fix {
  position: fixed;
  top:0;
  width: 100%;
  left: 0;
  background: white;
  z-index: 9;
}

</style>
