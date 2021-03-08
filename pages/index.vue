<template>
  <section>
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

      <div class="container search-container shadow">
        <div class="row">
          <div class="col-md-12 col-sm-12">
            <h3>Welcome</h3>
            <h3 class="mb-3"><strong>Find your affordable room, promotion and so much more...</strong></h3>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Search Location</label>
              <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping"><i class="bi-search"></i></span>
                <input type="text" class="form-control" placeholder="Nama lokasi" aria-label="Username" aria-describedby="addon-wrapping" style="width:70%; margin-right:31px;" :value='search_keyword' @input='evt=>search_keyword=evt.target.value'>
                <div class="d-grid gap-2  ml-2" style="width: 14%;">
                  <button class="btn btn-outline-danger" type="button" :disabled="search_keyword.length > 3? false:true" @click="search">Cari</button>
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
              <p class="f10 text-muted mb-1 text-decoration-line-through" v-show="loc.originalPrice != loc.sellingPrice">Start from Rp.{{ loc.originalPrice }}</p>
              <p class="display-7 text-danger"><strong>Rp. {{ loc.sellingPrice }}</strong></p>
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
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import '~/node_modules/vue-slick-carousel/dist/vue-slick-carousel.css'
import '~/node_modules/vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import axios from 'axios'
import global from '~/components/global.js'

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
      search_keyword:''
    }
  },
  methods: {
    search:function() {
      location.href="/rooms/"
    }
  },
  mounted(){
    console.log(this.data_home)
  }
}
</script>

<style>
.section-community{
  background: url('https://miro.medium.com/max/626/1*rxe5PC9XPGmID8Xw9mQ9ZQ.jpeg') no-repeat center center, rgba(0,0,0,.4);
  background-blend-mode: color;
  background-size: cover;
  padding:10% 0;
  margin:30px 0 0;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
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
  left: 15%;
  padding:20px 30px 10px;
  background: white;
  margin:0 auto;
  border-radius: 6px;
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
    left: 12%;
  }
}
</style>
