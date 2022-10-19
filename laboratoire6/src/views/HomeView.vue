<script setup>
import WeatherHeader from '../components/WeatherHeader.vue'
import WeatherBody from '../components/WeatherBody.vue'
</script>

<template>
  <main>
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
