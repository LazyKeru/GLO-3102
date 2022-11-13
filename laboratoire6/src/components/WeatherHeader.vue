<script>
export default {
  name: 'WeatherHeader',
  props: {
    city_name: {
      type: String,
      required: true,
    },
    longitude: {
      required: true,
    },
    latitude: {
      required: true,
    },
  },
}
</script>

<template>
  <div class="container">
    <div class="introduction">
      <h1 class="green">Weather in {{ city_name }}</h1>
      <h3 class="blue">
        Powered by
        <a
          href="https://www.weatherbit.io/"
          target="_blank"
          rel="noopener"
          class="green"
          >Weatherbit.io</a
        >
      </h3>
      <h5>Your cordinates [{{ latitude }}, {{ longitude }}]</h5>
    </div>
  </div>
</template>

<style>
h1 {
  text-align: left;
  font-size: 2rem;
}

h5,h3 {
  text-align: left;
  font-size: 1rem;
}

@media (max-width: 1024px) {
  h1 {
    font-size: 1.5rem;
    text-align: center;
  }
  h5, h3 {
    text-align: center;
    font-size: 1rem;
  }
}
</style>
