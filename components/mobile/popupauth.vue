<template>
  <div>
    <div class="mb-4 display-3" @click="backNow">
      <i class="bi bi-arrow-left-short"></i>
    </div>
    <div class="row mx-0 px-0" v-if="mode=='login'">
      <div class=" mb-5">
        <div class="display-2 mb-2"><strong>Sign In</strong></div>
        <div class="f12 text-muted">Are you new user? <span class="text-danger" @click="mode='signup'">Click here</span></div>
      </div>
      <div class="mb-3">
        <div class="input-group mb-3">
          <input type="text" class="form-control form-control-lg" placeholder="Email" :value='u_email' @input='evt=>u_email=evt.target.value' aria-label="Email" aria-describedby="basic-addon2">
          <span class="input-group-text" id="basic-addon2"><i class="bi bi-envelope"></i></span>
        </div>
      </div>
      <div class="mb-3">
         <div class="input-group mb-3">
          <input :type="psw_view?'text':'password'" class="form-control form-control-lg" placeholder="Password" :value='u_password' @input='evt=>u_password=evt.target.value' aria-label="Password" aria-describedby="basic-addon2">
          <span class="input-group-text f10" id="basic-addon2" @click="psw_view=!psw_view">{{ !psw_view? 'Show':'Hide'}}</span>
        </div>
      </div>
      <div class="col-xs-12">
        <div class="alert alert-danger" role="alert" v-if="error">
          {{ error_msg }}
        </div>
      </div>
      <div class="d-grid gap-2">
        <button type="button" class="btn btn-lg btn-outline-danger" @click="signInEmail()" :disabled="!u_password.length || !u_email.length? true:false">Sign In</button>
      </div>
      <div class="mb-3 mt-2 divider">or</div>
      <div class="d-grid gap-2">
        <button type="button" class="btn btn-lg btn-light" id="google_login"><i class="bi bi-google"></i> Sign In with Google</button>
      </div>
      <div class="mt-2 d-grid gap-2">
        <button type="button" class="btn btn-lg btn-light" @click="connectfb()"><i class="bi bi-facebook"></i> Sign In with Facebook</button>
      </div>
    </div>
    <div class="row mx-0 px-0" v-if="mode=='signup'">
      <div class="mb-5">
        <div class="display-2 mb-2"><strong>Sign Up</strong></div>
        <div class="f12 text-muted">Already have account? <span class="text-danger" @click="mode='login'">Click here</span></div>
      </div>
      <div class="mb-3">
        <div class="input-group mb-3">
          <input type="text" class="form-control form-control-lg" placeholder="Full Name" :value='u_name' @input='evt=>u_name=evt.target.value' aria-label="Fullname" aria-describedby="basic-addon2">
          <span class="input-group-text" id="basic-addon2"><i class="bi bi-person"></i></span>
        </div>
      </div>
      <div class="mb-3">
        <div class="input-group mb-3">
          <input type="text" class="form-control form-control-lg" placeholder="Email" :value='u_email' @input='evt=>u_email=evt.target.value' aria-label="Email" aria-describedby="basic-addon2">
          <span class="input-group-text" id="basic-addon2"><i class="bi bi-envelope"></i></span>
        </div>
      </div>
      <div class="mb-3">
        <div class="input-group mb-3">
          <input type="number" class="form-control form-control-lg" placeholder="Phone Number" :value='u_phone' @input='evt=>u_phone=evt.target.value' aria-label="Phone" aria-describedby="basic-addon2">
          <span class="input-group-text" id="basic-addon2"><i class="bi bi-phone"></i></span>
        </div>
      </div>
      <div class="mb-3">
        <div class="input-group mb-3">
          <input :type="psw_view?'text':'password'" class="form-control form-control-lg" placeholder="Password" :value='u_password' @input='evt=>u_password=evt.target.value' aria-label="Password" aria-describedby="basic-addon2">
          <span class="input-group-text f10" id="basic-addon2" @click="psw_view=!psw_view">{{ !psw_view? 'Show':'Hide'}}</span>
        </div>
      </div>
      <div class="mb-3">
        <div class="input-group mb-3">
          <input :type="rpsw_view?'text':'password'" class="form-control form-control-lg" placeholder="Confirm Password" :value='u_repassword' @input='evt=>u_repassword=evt.target.value' aria-label="Confirm Password" aria-describedby="basic-addon2">
          <span class="input-group-text f10" id="basic-addon2" @click="rpsw_view=!rpsw_view">{{ !rpsw_view? 'Show':'Hide'}}</span>
        </div>
      </div>
      <div class="col-xs-12">
        <div class="alert alert-danger" role="alert" v-if="error">
          {{ error_msg }}
        </div>
      </div>
      <div class="d-grid gap-2">
        <button type="button" class="btn btn-lg btn-outline-danger" :disabled="validate.email && validate.name && validate.phone && validate.password && validate.repassword? false:true" @click="signUp()">Sign Up</button>
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
      psw_view:false,
      rpw_view:false,
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
    backNow:function(){
      window.history.back();
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
      // console.log(element.id);
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
          vm.$store.commit('onLoaded');
          vm.$store.commit('pushToken', response.data.data.token)
          localStorage.rm_token = response.data.data.token;
          location.href='/';
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
          vm.$store.commit('onLoaded');
          vm.$store.commit('pushToken', response.data.data.token)
          localStorage.rm_token = response.data.data.token;
          location.href="/";
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

    if(localStorage.rm_token) {
      location.href = '/'
    }
  }
}
</script>
<style scoped>
.input-group-text{
  background: white;

  border-width: 1px;
  color: rgb(199, 199, 199);
}

.input-group input[type='text'], .input-group input[type='password'],  .input-group input[type='number']{
  border-right: none;
}
</style>
