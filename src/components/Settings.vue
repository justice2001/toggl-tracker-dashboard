<template>
    <t-button @click="openSetting">OPEN SETTINGS</t-button>
  <t-dialog width="50%" @opened="opened" header="SETTINGS" :visible.sync="settingsShow" @close="close">
    <t-form labelWidth="200px" labelAlign="left">
      <p v-for="(v, k) in settingsDict">
        <component :is="`${v.type}-form`" :label="v.description" :value="settingsConfiguration[k]" />
      </p>
    </t-form>

  </t-dialog>
</template>

<script setup>
import { VueElement, ref } from 'vue';
import { getSettings, getSettingsDict } from '../utils/settings-utils';
import Timeline from './Timeline.vue';

const settingsShow = ref(false)
const settingsConfiguration = ref({})
const settingsDict = ref({})

const openSetting = () => {
    settingsShow.value = true
}

const opened = () => {
    settingsConfiguration.value = getSettings()
    settingsDict.value = getSettingsDict()
}

const close = () => {
  settingsShow.value = false
}
</script>

