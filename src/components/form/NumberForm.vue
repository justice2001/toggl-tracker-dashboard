<template>
  <t-form-item :label="label">
    <t-input-number :value="value" @change="change"/>
  </t-form-item>
</template>

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
const emit = defineEmits(['update:value'])
const change = e => {
  emit('update:value', e)
}

</script>
