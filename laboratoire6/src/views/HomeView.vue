<script>
import WeatherHeader from '../components/WeatherHeader.vue'
import WeatherBody from '../components/WeatherBody.vue'
import Coords from '../service/location';
import WeatherService from '../service/weather';
import fakeCall from "../service/FakeAPI"

export default {
  data() {
    return {
      post: undefined,
      coords: null,
      weatherService: null,
      loading: false,
      error: null,
      lat: 0,
      lon: 0
    }
  },
  created() {
    this.loading = true;
    this.coords = new Coords();
    this.weatherService = new WeatherService();
  },
  mounted() {
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
          this.updateForecast()
        })
        .catch((err) => this.error = err)
    },
    updateForecast() {
      this.loading = true;
      this.weatherService.forecast(this.lat,this.lon,7)
        .then((res) => {
          this.post = res
          this.loading = false
        }
        )
        .catch(error => console.alert(error.message))
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
