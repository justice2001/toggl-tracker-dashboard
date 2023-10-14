<script setup>
const props = defineProps({
  value: {
    type: String,
    required: true,
    default: 0
  },
  label: {
    type: String,
    required: true,
    default: ''
  }
})
const emit = defineEmits(['update:value'])
const change = e => {
  emit("update:value", e)
}
</script>

<template>
  <t-form-item :label="label">
    <t-date-picker :value="value" @change="change"/>
  </t-form-item>
</template>

<style scoped>

</style>
