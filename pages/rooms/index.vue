<template>
  <section>
    <div class="container mt-5">
      <h3 class="mt-3 text-center">Unit Listing</h3>
      <p class="f12 text-center">Search Keyword 'Jakarta'</p>

      <div class="row">
        <div class="col-md-3 col-sm-6 mb-4"  v-for="(loc,index) in data_rooms.data">
          <div class="card shadow-sm">
            <div class="card-img">
              <img :src="loc.image.url" class="card-img-top" :alt="loc.image.alt">
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ loc.name }}</h5>
              <p class="f12 text-secondary">{{ loc.address }}</p>
              <p class="display-7 text-danger"><strong>Rp. {{ loc.sellingPrice }}</strong></p>
            </div>
          </div>
          <div class="card shadow-sm" v-for="(loc,index) in data_rooms.data.recommendationList">
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
  </section>
</template>
<script>
import axios from 'axios'
import global from '~/components/global.js'

export default {
  async asyncData({ params, app }) {
    try {
      const data_rooms = await axios({
          method:'GET',
          url : global.base_url + 'list',
          headers:{
            'Content-Type':'application/json',
          },
      });

      return {
        data_rooms : data_rooms.data
      }
    }catch(err){

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


.card-title {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  height: 30px;
}
</style>
