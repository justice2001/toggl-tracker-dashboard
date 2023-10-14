<template>
  <t-dialog width="50%" @opened="opened" header="SETTINGS" :visible.sync="show" @close="close" @confirm="save">
    <t-loading text="LOADING..." :loading="loading">
      <t-form labelWidth="200px" labelAlign="left">
        <p v-for="(v, k) in settingsDict">
          <component :is="`${v.type}-form`" :label="v.description" v-model:value="settingsConfiguration[k]" />
        </p>
      </t-form>
    </t-loading>
  </t-dialog>
</template>

<script setup>
import { VueElement, ref } from 'vue';
import {getSettings, getSettingsDict, saveSettings} from '../utils/settings-utils';
import Timeline from './Timeline.vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
const settingsConfiguration = ref({})
const settingsDict = ref({})
const emit = defineEmits(['update:show', 'saved'])
const loading = ref(true)

const opened = () => {
  loading.value =true
    settingsConfiguration.value = getSettings()
    settingsDict.value = getSettingsDict()
  loading.value = false
}

const close = () => {
  emit("update:show", false)
}

const save = () => {
  saveSettings(settingsConfiguration.value)
  close()
  emit('saved')
}
</script>

