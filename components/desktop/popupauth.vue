<template>
  <div>
    <div class="row" v-if="mode=='login'">
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Email address</label>
        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" v-model="u_email">
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Password</label>
        <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="" v-model="u_password">
      </div>
      <div class="col-xs-12">
        <div class="alert alert-danger" role="alert" v-if="error">
          {{ error_msg }}
        </div>
      </div>
      <div class="d-grid gap-2">
        <button type="button" class="btn btn-md btn-outline-danger" @click="signInEmail()" :disabled="!u_password.length || !u_email.length? true:false">Sign In</button>
      </div>
      <div class="mb-3 mt-2 divider">or</div>
      <div class="d-grid gap-2">
        <button type="button" class="btn btn-md btn-light" id="google_login"><i class="bi bi-google"></i> Sign In with Google</button>
      </div>
      <div class="mt-2 d-grid gap-2">
        <button type="button" class="btn btn-md btn-light" @click="connectfb()"><i class="bi bi-facebook"></i> Sign In with Facebook</button>
      </div>
      <div class="mt-3 mb-3">
        <div class="f12 text-muted">Are you new user? <span class="text-danger" @click="mode='signup'">Click here</span></div>
      </div>
    </div>
    <div class="row" v-if="mode=='signup'">
      <div class="mb-3">
        <label for="inputFullname" class="form-label">Fullname</label>
        <input type="text" class="form-control" id="inputFullname" placeholder="Name" v-model="u_name">
      </div>
      <div class="mb-3">
        <label for="inputEmail" class="form-label">Email address</label>
        <input type="email" class="form-control" id="inputEmail" placeholder="name@example.com" v-model="u_email">
      </div>
      <div class="mb-3">
        <label for="inputNumber" class="form-label">Mobile Number</label>
        <input type="number" class="form-control" id="inputNumber" placeholder="08123456789" v-model="u_phone">
      </div>
      <div class="mb-3">
        <label for="inputPassword" class="form-label">Password</label>
        <input type="password" class="form-control" id="inputPassword" placeholder="" v-model="u_password">
        <small class="f12">Password must contain at least 6 characters</small>
      </div>
      <div class="mb-3">
        <label for="inputRepassword" class="form-label">Confirm Password</label>
        <input type="password" class="form-control" id="inputRepassword" placeholder="" v-model="u_repassword">
      </div>
      <div class="col-xs-12">
        <div class="alert alert-danger" role="alert" v-if="error">
          {{ error_msg }}
        </div>
      </div>
      <div class="d-grid gap-2">
        <button type="button" class="btn btn-md btn-outline-danger" :disabled="validate.email && validate.name && validate.phone && validate.password && validate.repassword? false:true" @click="signUp()">Sign Up</button>
      </div>
      <div class="mt-3 mb-3">
        <div class="f12 text-muted">Already have account? <span class="text-danger" @click="mode='login'">Click here</span></div>
      </div>
    </div>
    <div class="row text-center" v-if="mode=='success'">
      <div class="d-flex align-items-center justify-content-center" style="height:400px">
        <div>
          <i class="bi bi-check-circle-fill display-1 text-success"></i>
          <h3>Success</h3>
          <p class="f12">Your account has registered successfully. <span class="text-danger" @click="mode='login'">Sign in here.</span></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import global from '~/components/global.js'
import axios from 'axios'
import { mapMutations } from 'vuex'

export default {
  data(){
    return {
      mode:"login",
      u_email:'',
      u_password:'',
      u_repassword:'',
      u_name:'',
      u_phone:'',
      sos_token:'',
      fb_id:'',
      fb_name:'',
      gl_id:'',
      gl_name:'',
      gl_gender:'',
      validate:{
        email:false,
        phone:false,
        name:false,
        password:false,
        repassword:false,
      },
      auth2:'',
      error:false,
      error_msg:'',
    }
  },
  watch:{
    validate:function(val){
      console.log(val)
    },
    u_email:function(val){
      var vm = this;
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(val.length > 0 && re.test(val.toLowerCase())){
        vm.validate.email=true;
        vm.error = false;
      }else{
        vm.validate.email=false;
        vm.error = true;
        vm.error_msg = 'Please insert your email address.';
      }
    },
    u_name:function(val){
      var vm = this;
      if(val.length > 3){
        vm.validate.name = true;
        vm.error = false;
      }else{
        vm.validate.name = false;
        vm.error = true;
        vm.error_msg = 'Please insert your full name.';
      }
    },
    u_phone:function(val){
      var vm = this;
      if(val.length > 5){
        vm.validate.phone = true;
        vm.error = false;
      }else{
        vm.validate.phone = false;
        vm.error = true;
        vm.error_msg = 'Please insert your phone number.';
      }
    },
    u_password:function(val){
      var vm = this;
      if(val.length >= 6){
        vm.validate.password = true;
        vm.error = false;
      }else{
        vm.validate.password = false;
        vm.error = true;
        vm.error_msg = 'Password must contain at least 6 characters.';
      }
    },
    u_repassword:function(val){
      var vm = this;
      if(val == vm.u_password){
        vm.validate.repassword = true;
        vm.error = false;
      }else{
        vm.validate.repassword = false;
        vm.error = true;
        vm.error_msg = 'Please confirm & match your password.';
      }
    }
  },
  methods:{
    ...mapMutations({
      onLoading: 'onLoading'
    }),
    closeThis:function(){
      this.$emit('close');
    },
    connectfb:function(){
		  var vm = this;

      openFB.login(
        function(response) {
          if(response.status === 'connected') {
            vm.sos_token = response.authResponse.accessToken;
            vm.getFbUserData();
          } else {
            vm.error=true;
            vm.error_msg = response.message;
            setTimeout(()=>{
              vm.error = false;
            },3000)
          }
        }, {scope: 'email'});
    },
    getFbUserData:function(){
      var vm = this;
      openFB.api({
        path: '/me',
        success: function(response) {
          vm.fb_name = response.name;
          vm.fb_id = response.id;
          vm.signInSocial('facebook', vm.sos_token);
        },
        error: function(err){
          vm.error=true;
          vm.error_msg = err.message;
          setTimeout(()=>{
            vm.error = false;
          },3000)
        }
      });
    },
    startGoogle:function(){
      gapi.load('auth2', ()=>{
      // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '1082978135343-rr4c6ea0o1ur3e64dpepjdp4t10gmges.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          scope: 'profile'
        });
        this.attachSignin(document.getElementById('google_login'));
      });
    },
    attachSignin:function(element) {
      console.log(element.id);
      var vm = this;
      this.auth2.attachClickHandler(element, {},
      (googleUser)=> {
        // document.getElementById('name').innerText = "Signed in: " +
        // googleUser.getBasicProfile().getName();
        vm.sos_token = googleUser.getAuthResponse().id_token;

        vm.signInSocial('google', vm.sos_token);
      }, (error)=> {
        // alert(JSON.stringify(error, undefined, 2));
        this.error = true;
        this.error_msg = error.error;
        setTimeout(()=>{
          this.error = false;
          this.error_msg = '';
        },4000)
      });
    },
    signInSocial:function(app, token){
      var vm = this;
      vm.$store.commit('onLoading');

      var option = {
        socialMediaType: app,
        socialMediaToken: token
      }

      try{
        axios({
          method: 'POST',
          url: global.base_url+'signin-social',
          headers:{
            'Content-Type':'application/json',
            //'Access-Control-Allow-Origin': false
          },
          data : option
        })
        .then((response)=> {
          vm.closeThis();
          vm.$store.commit('onLoaded');
          vm.$store.commit('pushToken', response.data.data.token)
          localStorage.rm_token = response.data.data.token;

        })
        .catch((error) => {
          vm.error = true;
          vm.error_msg = error.message;

          setTimeout(()=>{
            vm.error = false;
            vm.error_msg = '';
          }, 5000)
        });
      }catch(err){
        alert(err);
      }
    },
    signInEmail:function(){
      var vm = this;
      vm.$store.commit('onLoading');

      try{
        axios({
          method: 'POST',
          url: global.base_url+'signin-email',
          headers:{
            'Content-Type':'application/json',
            //'Access-Control-Allow-Origin': false
          },
          data: {
            'email': vm.u_email,
            'password': vm.u_password
          }
        })
        .then((response)=> {
          vm.closeThis();
          vm.$store.commit('onLoaded');
          vm.$store.commit('pushToken', response.data.data.token)
          localStorage.rm_token = response.data.data.token;

        })
        .catch((error) => {
          vm.error = true;
          vm.error_msg = error.message;

          setTimeout(()=>{
            vm.error = false;
            vm.error_msg = '';
          }, 5000)
        });
      }catch(err){
        alert(err);
      }
    },
    signUp:function(){
      var vm = this;
      vm.$store.commit('onLoading');

      try{
        axios({
          method: 'POST',
          url: global.base_url+'signup',
          headers:{
            'Content-Type':'application/json',
            //'Access-Control-Allow-Origin': false
          },
          data: {
            'name': vm.u_name,
            'phoneNumber':vm.u_phone,
            'email': vm.u_email,
            'password': vm.u_password
          }
        })
        .then((response)=> {
          vm.$store.commit('onLoaded')
          vm.mode = 'success';
        })
        .catch((error) => {
          vm.error = true;
          vm.error_msg = error.message;

          setTimeout(()=>{
            vm.error = false;
            vm.error_msg = '';
          }, 5000)
        });
      }catch(err){
        alert(err);
      }
    }
  },
  mounted(){
    this.startGoogle();
    openFB.init({appId: '269239061332221'});
  }
}
</script>
