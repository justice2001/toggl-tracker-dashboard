<template>
    <div class="count-down-container">
        <h2>YOU ONLY HAVE</h2>
        <h2 class="date">{{ count }} DAYS</h2>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const count = ref(0)

onMounted(() => {
    const target = new Date("2023-12-24")
    const today = new Date()
    count.value = ((target-today) / (1000*60*60*24)).toFixed(0)
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