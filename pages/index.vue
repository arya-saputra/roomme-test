<template>
  <section>
    <section v-if="!is_mobile">
      <div  class="fullwidth-container mb-5">
        <div class="row m-0">
          <div class="col-md-12 col-sm-12 p-0">
            <VueSlickCarousel :arrows="true" :dots="true" :autoplay="true" :autoplaySpeed="5000">
              <div v-for="(banner,index) in data_home.data.banners">
                <a :href="banner.linkUrl">
                  <img :src="banner.image.url" :alt="banner.image.alt" width="100%" />
                </a>
              </div>
            </VueSlickCarousel>
          </div>
        </div>

        <div class="container search-container ">
          <div class="search-wrapper shadow">
            <div class="row">
              <div class="col-md-12 col-sm-12">
                <h3>Welcome</h3>
                <h3 class="mb-3"><strong>Find your affordable room, promotion and so much more...</strong></h3>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Search Location</label>
                  <div class="input-group flex-nowrap search-box">
                    <span class="input-group-text" id="addon-wrapping"><i class="bi-search"></i></span>
                    <input type="text" class="form-control" placeholder="Nama lokasi" aria-label="Username" aria-describedby="addon-wrapping" style="width:70%; margin-right:31px;" :value='search_keyword' @input='evt=>search_keyword=evt.target.value' @keyup="autocomplete()">

                    <div v-if="search_auto" class="search-autocomplete">
                      <div class="search-item" v-if="search_data.length" v-for="src in search_data" @click="addSearch(src.unit.name+' - '+src.district.name)">{{ src.unit.name }} - {{ src.district.name }}, {{ src.city.name }}, {{ src.province.name }}</div>
                    </div>
                    <div class="d-grid gap-2  ml-2" style="width: 14%;">
                      <button class="btn btn-outline-danger" type="button" :disabled="search_keyword.length > 3? false:true" @click="search">Cari</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container px-0" style="margin-top:10%;">
        <a href="/rooms/" class="text-dark" style="text-decoration:none;">
          <h4 class="mb-3"><strong>Lokasi Paling Banyak Dicari</strong></h4>
        </a>
        <div class="row">
          <VueSlickCarousel :arrows="true" :dots="true" :slidesToShow="5" centerPadding="30px" :autoplay="true" :autoplaySpeed="3000">
            <div class="card  shadow-sm" v-for="(loc,index) in data_home.data.locationsList">
              <div class="card-img">
                <img :src="loc.image.url" class="card-img-top" :alt="loc.image.alt">
              </div>
              <div class="card-body">
                <h5 class="card-title text-center">{{ loc.name }}</h5>
              </div>
            </div>
          </VueSlickCarousel>
        </div>
      </div>
      <div class="container px-0" style="margin-top:3%;">
        <a href="/rooms/" class="text-dark" style="text-decoration:none;">
          <h4><strong>Rekomendasi Untukmu</strong></h4>
        </a>
        <p class="mb-3">Check out some of our featured units around your area</p>
        <div class="row">
          <VueSlickCarousel :arrows="true" :dots="false" :slidesToShow="4" centerPadding="30px">
            <div class="card shadow-sm" v-for="(loc,index) in data_home.data.recommendationList">
              <div class="card-img">
                <div class="card-discount" v-if="loc.discount">
                  <div class="card-badge">
                    {{ loc.discount }}% Off Today
                  </div>
                </div>
                <img :src="loc.image.url" class="card-img-top" :alt="loc.image.alt">
              </div>
              <div class="card-body card-body-room">
                <h5 class="card-title">{{ loc.name }}</h5>
                <p class="f12 text-secondary">{{ loc.address }}</p>
                <p class="f10 text-muted mb-1 text-decoration-line-through" v-show="loc.originalPrice != loc.sellingPrice">Start from Rp.{{ addCommas(loc.originalPrice) }}</p>
                <p class="display-7 text-danger"><strong>Rp. {{ addCommas(loc.sellingPrice) }}</strong></p>
              </div>
            </div>
          </VueSlickCarousel>
        </div>
      </div>
      <section class="section-community">
        <div class="container">
          <div class="row">
            <div class="col-md-8 text-light">
              <h3>RoomMe Community Adapting the Current Modern lifestyle</h3>
              <p>Our kost is more than a room, it is a new living experience</p>
              <button type="button" class="btn btn-danger btn-lg mt-3">Explore Community</button>
            </div>
          </div>
        </div>
      </section>
      <section>
        <img src="/img/landlord.png" width="100%" />
      </section>
    </section>
    <section v-if="is_mobile" class="mobile-wrapper pb-5">
        <div class="position-relative">
          <div class="row m-0">
            <div class="col-md-12 col-sm-12 p-0">
              <VueSlickCarousel :arrows="false" :dots="true" :autoplay="true" :autoplaySpeed="5000">
                <div v-for="(banner,index) in data_home.data.banners">
                  <a :href="banner.linkUrl">
                    <img :src="banner.image.url" :alt="banner.image.alt" width="100%" />
                  </a>
                </div>
              </VueSlickCarousel>
            </div>
          </div>
          <div class="px-2 bg-light " style="margin-top:-20px">
            <div class="input-group mb-3 shadow">
              <input type="text" class="form-control form-control-lg f12" placeholder="Cari kost terbaik di sini" aria-label="Username" aria-describedby="basic-addon1" :value='search_keyword' @input='evt=>search_keyword=evt.target.value' @keyup="autocomplete()">
              <span class="input-group-text" id="basic-addon1" @click="search"><i class="bi bi-search"></i></span>
            </div>
          </div>
        </div>
        <div class="row mx-0 px-0">
          <h4 class="f16 mb-3">Lokasi yang banyak dicari</h4>
          <VueSlickCarousel :arrows="false" :dots="true" :slidesToShow="2.1" centerPadding="30px" :autoplay="true" :autoplaySpeed="3000" class="slick-location">
            <div class="card  shadow-sm" v-for="(loc,index) in data_home.data.locationsList">
              <div class="card-img">
                <img :src="loc.image.url" class="card-img-top" :alt="loc.image.alt">
              </div>
              <div class="card-body">
                <h5 class="card-title text-center ">{{ loc.name }}</h5>
              </div>
            </div>
          </VueSlickCarousel>
        </div>
        <div class="row mx-0 px-0">
          <h4 class="f16 mt-5 mb-3">Rekomendasi Untukmu</h4>
          <div v-for="(loc,index) in data_home.data.recommendationList" class="col-6 mb-3" >
            <div class="card card-m ">
              <div class="card-img shadow">
                <div class="card-discount" v-if="loc.discount">
                  <div class="card-badge">
                    {{ loc.discount }}%
                  </div>
                </div>
                <div class="card-rating">
                  <i class="bi bi-star-fill"></i> {{ loc.rating }}
                </div>
                <img :src="loc.image.url" class="card-img-top shadow" :alt="loc.image.alt">
              </div>
              <div class="card-body card-body-room">
                <h5 class="card-title">{{ loc.name }}</h5>
                <p class="f12 text-secondary">{{ loc.address }}</p>
                <p class="f10 text-muted mb-1 text-decoration-line-through" v-show="loc.originalPrice != loc.sellingPrice">Start from Rp.{{ addCommas(loc.originalPrice) }}</p>
                <p class="display-7 text-danger"><strong>Rp. {{ addCommas(loc.sellingPrice) }}</strong></p>
              </div>
            </div>
          </div>
        </div>
    </section>
  </section>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import '~/node_modules/vue-slick-carousel/dist/vue-slick-carousel.css'
// import '~/node_modules/vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import axios from 'axios'
import global from '~/components/global.js'
import { addCommas } from '~/components/tools.js'

export default {
  async asyncData({ app, redirect }) {
    try {
      const data_home = await axios({
        method: 'GET',
        url: global.base_url+'home',
        headers:{
            'Content-Type':'application/json',
        },
      });

      return {
        data_home : data_home.data
      }
    }catch(err){

    }
  },
  components: {
    VueSlickCarousel
  },
  head(){
    return{
      title : this.data_home? this.data_home.meta.seo.title:'Find room at RoomMe.',
      meta:[
        {
          hid: 'description',
          name:'description',
          content: this.data_home? this.data_home.meta.seo.desc:'Find room at RoomMe.'
        }
      ],
    }
  },
  data(){
    return{
      search_keyword:'',
      search_auto:false,
      search_data:''
    }
  },
  computed:{
    is_mobile(){
      return this.$store.state.is_mobile;
    },
  },
  methods: {
    addCommas,
    search:function() {
      location.href="/rooms/?keyword="+this.search_keyword
    },
    autocomplete:function(){
      var vm = this;
      vm.search_data = '';

      try{
        axios({
          method: 'GET',
          url: global.base_url+'search/autocomplete?keyword='+vm.search_keyword,
          headers:{
            'Content-Type':'application/json',
            //'Access-Control-Allow-Origin': false
          },
        })
        .then((response)=> {
          vm.search_auto = true;
          vm.search_data = response.data.data
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
    addSearch: function(str) {
      this.search_auto = false;
      this.search_keyword = str;
      this.search_data = '';
    }
  },
  mounted(){
    console.log(this.data_home)
  }
}
</script>
<style scoped src="~/node_modules/vue-slick-carousel/dist/vue-slick-carousel-theme.css"></style>
<style>
.section-community{
  background: url('https://miro.medium.com/max/626/1*rxe5PC9XPGmID8Xw9mQ9ZQ.jpeg') no-repeat center center, rgba(0,0,0,.4);
  background-blend-mode: color;
  background-size: cover;
  padding:10% 0;
  margin:30px 0 0;
}

.input-group-text{
  background: white;

  border-width: 1px;
  border-right: none;
  color: rgb(199, 199, 199);
}

.input-group input{
  border-left: none;
}

.title {

  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.fullwidth-container{
  width: 100%;
  max-width: 100%;
  height: fit-content;
  max-height: 100vh;
  position: relative;
}

.search-container{
  position: absolute;
  bottom: -130px;
  left: 0;
  width: 100%;
  max-width: unset !important;
}

.search-container .search-wrapper{
  position: relative;
  padding:20px 30px 10px;
  background: white;
  margin:0 auto;
  border-radius: 6px;
  max-width: 1340px;
}

.search-box{
  position: relative;
}

.search-autocomplete{
  position: absolute;
  bottom: 0;
  background: rgb(255, 255, 255);
  border: 1px solid whitesmoke;
  border-radius: 0 0 4px 4px;
  width: 83.4%;
  left: 0;
  top: 37px;
  z-index: 8;
  height: fit-content;
}

.search-autocomplete .search-item{
  padding:10px 5px;
}

.search-autocomplete .search-item:hover{
  cursor: pointer;
  background: tomato;
  color: white;
}

.card-img {
  height: 200px;
  overflow: hidden;
  display: flex;
  align-items: stretch;
  background: whitesmoke;
  position: relative;
}

.card-discount {
  position: absolute;
  left: 0;
  top: 10px;
}

.card-badge {
  width: 140px;
  height: 30px;
  position: relative;
  background: rgb(25, 147, 14);
  color: whitesmoke;
  padding:4px 10px;
}
.card-badge:before {
  content: "";
  position: absolute;
  right: -15px;
  bottom: 0;
  width: 0;
  height: 0;
  border-left: 15px solid rgb(25, 147, 14);
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
}

.card-body-room {
  height: 150px;
}

.card{
  width: 96% !important;
}

@media only screen and (max-width: 1700px) {
  .search-container{
    /* left: 6.5rem; */
  }
}

@media only screen and (max-width: 768px) {
  .card-img {
    height: 20vh;
  }

  .card-body-room {
    height: 60px;
  }

  .card-title{
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
  }

  .slick-location{
    width: 100%;
  }

  .slick-location .slick-list{
    padding:0px 5px 10px;
  }

  .slick-location .slick-dots{
    text-align: left;
    right: 0;
    padding-left: 10px;
    bottom: -15px;
  }

  .slick-location .slick-dots li button{
    background-color: rgb(205, 51, 34);
  }

  .card-m{
    width: 100% !important;
    border:none;
  }

  .card-badge {
    width: 50px;
    height: 30px;
    position: relative;
    background: rgb(250, 200, 0);
    color: black;
    padding:4px 10px;
    font-size: 14px;
  }
  .card-badge:before {
    content: "";
    position: absolute;
    right: -15px;
    bottom: 0;
    width: 0;
    height: 0;
    border-left: 15px solid rgb(250, 200, 0);
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
  }
  .card-discount {
    position: absolute;
    left: 10px;
    top: 10px;
  }

  .card-m .card-title{
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
  }

  .card-rating{
    background: white;
    position: absolute;
    bottom: 0;
    padding:3px 10px;
    font-size: 12px;
    border-radius: 0 4px 0 0;
  }

  .card-rating .bi{
    color: rgb(250, 200, 0);
  }

  .card-m .card-body-room{
    height: auto;
    padding:15px 0 0;
  }

  .card-m .bard-body{
    border:none
  }

  .input-group-text{
  background: white;

  border-width: 1px;
  border-left: none;
  color: rgb(199, 199, 199);
}

.input-group input{
  border-right: none;
}


}

.mobile-wrapper{
  padding:38px 0 0;
}
</style>
