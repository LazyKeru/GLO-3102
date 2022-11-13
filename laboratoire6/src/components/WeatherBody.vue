<script>
import DayItem from './DayItem.vue'

export default{
  name: "WeatherBody",
  props: {
    post: {
      default: null
    }  
  },
  components: {
    DayItem
  }
}
</script>

<template>
  <div class="days-containers" v-if="post">
    <div  v-for="(day, index) in post.data" v-bind:key="index">
      <DayItem :date="day.datetime" :minTmp="day.min_temp" :maxTmp="day.max_temp" :weatherIcon="day.weather.icon"></DayItem>
    </div>
  </div>
</template>

<style>
.days-containers{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>

