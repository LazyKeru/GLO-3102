<script setup>
import WeatherHeader from '../components/WeatherHeader.vue'
import WeatherBody from '../components/WeatherBody.vue'
import { reactive, toRef  } from 'vue'
import Coords from '../service/location';


// Not working properly
const coords = reactive(new Coords());
const latitude = toRef(coords, 'latitude')

</script>

<template>
  <main>
    <h1>Test {{latitude}}</h1>
    <WeatherHeader/>
    <WeatherBody/>
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
