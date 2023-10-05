<template>
    <div class="count-down-container">
        <h2>NOW</h2>
        <h1>{{ time }}</h1>
        <h2>YOU ONLY HAVE</h2>
        <h1 class="date">{{ count }} DAYS</h1>
        <div class="h10"></div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getTime } from '../utils/baseUtils';

const count = ref(0)
const time = ref('00:00:00')
let timeInterval = -1

const startTimeInterval = () => {
    if (timeInterval < 0) {
        timeInterval = setInterval(() => {
            const now = new Date()
            time.value = getTime(now, true)
        }, 1000)
    }
}

const load = () => {
    const target = new Date("2023-12-24")
    const today = new Date()
    count.value = ((target-today) / (1000*60*60*24)).toFixed(0)

    startTimeInterval()
}

onMounted(() => {
    load()
})
</script>

<style scoped>
.count-down-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.date {
    color: red;
}
</style>