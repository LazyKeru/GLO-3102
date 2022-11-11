<script>
import WeatherHeader from '../components/WeatherHeader.vue'
import WeatherBody from '../components/WeatherBody.vue'
import Coords from '../service/location';
import fakeCall from "../service/FakeAPI"

export default {
  data() {
    return {
      post: fakeCall(),
      coords: null,
      loading: false,
      error: null,
      lat: 0,
      lon: 0
    }
  },
  created() {
    this.coords = new Coords();
  },
  mounted() {
    this.loading = true;
    this.updateCord();
  },
  methods: {
    updateCord() {
      this.loading = true;
      this.coords.fetchPosition()
        .then((position) => {
          console.log(position);
          this.lat = position.coords.latitude
          this.lon = position.coords.longitude
          // this.post = fakeCall()
          // console.log(this.post)
          this.loading = false
        })
        .catch((err) => this.error = err)
    }
  },
  components: {
    WeatherHeader,
    WeatherBody
  }
}


</script>

<template>
  <main>
    <div v-if="loading" >
      loading...
    </div>
    <div v-if="error">
      {{error.message}}
    </div>
    <div v-if="!loading">
      <WeatherHeader :city_name="post.city_name" :latitude="lat" :longitude="lon" />
      <WeatherBody/>
    </div>
  </main>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
