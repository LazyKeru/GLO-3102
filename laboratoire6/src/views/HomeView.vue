<script>
import WeatherHeader from '../components/WeatherHeader.vue';
import WeatherBody from '../components/WeatherBody.vue';
import Coords from '../service/location';
import WeatherService from '../service/weather';

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
        .catch(error => console.error(error.message))
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
      loading... (TIP : make sure location is enabled in your browser for this website)
    </div>
    <div v-if="error">
      {{error.message}}
    </div>
    <div v-if="!loading">
      <WeatherHeader :city_name="post.city_name" :latitude="lat" :longitude="lon" />
      <WeatherBody :post="post"/>
    </div>
  </main>
</template>
