<script>
import fakeCall from "../service/FakeAPI"
import DayItem from './DayItem.vue'

export default{
  data(){
    return {
      loading: null,
      post: fakeCall(),
      error: null,
    }
  },
  mounted() {
  },
  components: {
    DayItem
  }
}
</script>

<template>
  <div v-if="loading">
    <p>loading</p>
  </div>
  <div class="days-containers" v-if="post">
    <div v-for="day in post.data">
      <DayItem :day-time=day.datetime :tempeture=day.temp></DayItem>
    </div>
  </div>
</template>

<style>
.days-containers{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
@media (min-width: 1024px) {
  .days-containers {
    flex-direction: row;
  }
}
</style>

