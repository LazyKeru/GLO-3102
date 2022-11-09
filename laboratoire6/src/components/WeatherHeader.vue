<script setup>

</script>

<template>
  <div class="container">
    <div class="introduction">
      <h1 class="green">Weather Station</h1>
      <h3 class="blue">Powered by <a href="https://www.weatherbit.io/" target="_blank" rel="noopener" class="green">Weatherbit.io</a></h3>
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
