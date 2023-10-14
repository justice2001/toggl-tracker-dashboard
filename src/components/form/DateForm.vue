<script setup>
const props = defineProps({
  value: {
    type: Number,
    required: true,
    default: 0
  },
  label: {
    type: String,
    required: true,
    default: ''
  }
})
</script>

<template>
  <t-form-item :label="label">
    <t-date-picker :value="value"/>
  </t-form-item>
</template>

<style scoped>

</style>
