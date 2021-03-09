<template>
  <section>
    <h3 class="mt-5 text-center">Unit Listing</h3>
    <p class="f12 text-center" v-show="keyword">Search Keyword '{{ keyword }}'</p>
    <div class="container mt-5" v-if="!is_mobile">


      <div class="row">
        <div class="col-md-3 col-sm-6 mb-4"  v-for="(loc,index) in data_rooms.data">
          <div class="card shadow-sm" >
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
        </div>
      </div>
    </div>

    <div class="container pb-5" v-if="is_mobile">
      <div class="row mx-0 px-0">
        <div v-for="(loc,index) in data_rooms.data" class="col-6 mb-3" >
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
              <p class="f10 text-muted mb-1 text-decoration-line-through" v-show="loc.originalPrice != loc.sellingPrice">Start from Rp.{{ loc.originalPrice }}</p>
              <p class="display-7 text-danger"><strong>Rp. {{ loc.sellingPrice }}</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from 'axios'
import global from '~/components/global.js'

export default {
  async asyncData({ query, app }) {
    try {
      const data_rooms = await axios({
          method:'GET',
          url : global.base_url + 'list',
          headers:{
            'Content-Type':'application/json',
          },
      });

      const keyword = query.keyword

      return {
        data_rooms : data_rooms.data, keyword: keyword,
      }
    }catch(err){

    }
  },
  computed:{
    is_mobile(){
      return this.$store.state.is_mobile
    }
  },
  head(){
    return{
      title : this.data_rooms? this.data_rooms.meta.seo.title:'Find room at RoomMe.',
      meta:[
        {
          hid: 'description',
          name:'description',
          content: this.data_rooms? this.data_rooms.meta.seo.desc:'Find room at RoomMe.'
        }
      ],
    }
  },
}
</script>
<style scoped>

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
  width: 100% !important;
}

.card-title {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  height: 30px;
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

}
</style>
