<template>
  <div class="data-today-container">
    <h2>TODAY TOTAL</h2>
    <h1>{{ today.time }} ({{ today.hour.toFixed(1) }} H)</h1>
    <div class="h10"></div>
    <h2>THREE MONTH TOTAL</h2>
    <h1>{{threeMonth.time}} ({{ threeMonth.hour.toFixed(1)}} H)</h1>
  </div>
</template>

<script setup>
import {ref, watch} from "vue";
import {getTimeFormat} from "../utils/baseUtils.js";

const props = defineProps({
  todayData: {
    type: Number,
    default: 0
  },
  threeMonthData: {
    type: Number,
    default: 0
  }
})
watch(() => props.todayData, () => {
  today.value = getFormat(props.todayData)
})
watch(() => props.threeMonthData, () => {
  threeMonth.value = getFormat(props.threeMonthData)
})


const getFormat = duration => {
  return {
    time: getTimeFormat(duration),
    hour: duration / 3600
  }
}

const today = ref({
  time: "00:00:00",
  hour: 0
})
const threeMonth = ref({
  time: "00:00:00",
  hour: 0
})
</script>

<style scoped>

</style>
