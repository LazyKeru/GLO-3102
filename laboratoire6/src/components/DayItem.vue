<script>
export default {
  name: 'DayItem',
  props: {
    date: {
      type: String,
      required: true,
    },
    minTmp: {
      type: Number,
      required: true,
    },
    maxTmp: {
      type: Number,
      required: true,
    },
    weatherIcon: {
      type: String,
      required: true,
    },
  },
}
</script>

<template>
  <div class="day">
    <h3 class="weekday">{{ date }}</h3>
    <img
      :src="'./src/assets/weatherIcons/' + weatherIcon + '.png'"
      alt="weather icon"
    />
    <h3> Max : {{ maxTmp }} Celsius</h3>
    <h3> Min : {{ minTmp }} Celsius</h3>
  </div>
</template>

<style>
.day {
  margin: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 3px black;
  border-radius: 5px;
}
</style>
