<script>
  export default{
    name: "WeatherHeader",
    props: {
      city_name: {
        type: String,
        required: true
        // validator: (value) => {
        //   return value >= 0
        // }
      },
      longitude: {
        required: true
      },
      latitude: {
        required: true
      }
    }
  }
</script>

<template>
  <div class="container">
    <div class="introduction">
      <h1 class="green">Weather in {{city_name}}</h1>
      <h3 class="blue">Powered by <a href="https://www.weatherbit.io/" target="_blank" rel="noopener" class="green">Weatherbit.io</a></h3>
      <h5>Your cordinates [{{longitude}}, {{latitude}}]</h5>
    </div>
    <div class="location">
      <img class="small"/>
      <h3> Title </h3>
    </div>
  </div>
</template>

<style>

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}

</style>
