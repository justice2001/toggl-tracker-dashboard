<template>
  <h1 style="text-align: center;">Time Tracker: Dashboard</h1>

  <div class="pie-group">
    <t-radio-group variant="default-filled" default-value="desc" @change="by">
      <t-radio-button value="desc">Description</t-radio-button>
      <t-radio-button value="tags">Tags</t-radio-button>
      <t-radio-button value="proj">Project</t-radio-button>
    </t-radio-group>
    <t-button class="refresh-btn" @click="loadData">
      <template #icon><t-icon name="refresh" /></template>
      REFRESH
    </t-button>
  </div>

  <t-loading text="加载中..." :loading="loading" size="small">
    <t-card class="data-today">
      <h2>TODAY TOTAL: {{ todayData.totalTime }}</h2>
      <h2>TODAY HOUR: {{ todayData.timeHour.toFixed(1) }} H</h2>
    </t-card>

    <div class="pie-group">
      <Pie :data="todayData.byGroup" />
      <Histogram :option="weekData.option" :data="weekData.data" />
    </div>
  </t-loading>

  <Timeline :data="timeline" />

  <div class="footer">
    <p>time tracker dashboard: version 1.0</p>
    <p>Copyright time_tracker@zhengyi59 2023</p>
  </div>
</template>

<script setup>
import { groupByTag, groupByDescription, groupByProject } from './utils/groupUtils'
import { getDate, getTime, getTimeFormat } from './utils/baseUtils'
import { getToday, getWeek } from './utils/toggl-utils'

import { ref, onMounted } from 'vue';
import Axios from "axios"
import Pie from './components/echart/Pie.vue';
import Histogram from './components/echart/Histogram.vue';
import Timeline from './components/Timeline.vue'
import cfg from '../cfg';
import { time } from 'echarts';
import { getEntires } from './api/toggl';

let data = []

const todayData = ref({
  totalTime: "00:00:00",
  timeHour: 0,
  byGroup: []
})
const timeline = ref([])
const weekData = ref({
  option: {
    startDate: "",
    endDate: "",
    count: 0,
  },
  data: []
})

const loading = ref(true)

onMounted(() => {
  // Get Data
  loadData(false)
})

const loadData = (force = true) => {
  loading.value = true

  const td = new Date()
  const sd = getDate(new Date(new Date().setDate(td.getDate() - 7)))
  const ed = getDate(new Date(new Date().setDate(td.getDate() + 1)))

  weekData.value.option.startDate = sd
  weekData.value.option.endDate = ed
  weekData.value.option.count++

  getEntires(sd, ed, force).then(dt => {

    data = getToday(dt)
    // Process Today Timeline
    const todayTimeline = []
    data.forEach(i => {
      if (i.duration > 0) {
        const st = getTime(new Date(i.start))
        const edt = getTime(new Date(i.stop))
        todayTimeline.push({st, ed: edt, name: i.description})
      }
    })
    timeline.value = todayTimeline
    // Process Group
    let dur = 0
    data.forEach(i => {
      if (i.duration > 0)
        dur += i.duration
    })
    weekData.value.data = [dur]
    todayData.value.timeHour = dur / 3600
    todayData.value.totalTime = getTimeFormat(dur)
    todayData.value.byGroup = groupByDescription(data)
    loading.value = false

    weekData.value.data = getWeek(dt)
  })
}

const by = (key) => {
  switch (key) {
    case 'tags': todayData.value.byGroup = groupByTag(data); break
    case 'desc': todayData.value.byGroup = groupByDescription(data); break
    case 'proj': todayData.value.byGroup = groupByProject(data); break
  }
}
</script>

<style scoped>
.by-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
  gap: 10px;
}

.footer {
  font-size: 12px;
  color: #777;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
}

.footer p {
  padding: 0;
  margin: 0;
}

.pie-group {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px;
  position: relative;
}

.data-today {
  margin: 20px;
  display: flex;
  justify-content: space-around;
}

.refresh-btn {
  position: absolute;
  right: 0;
}
</style>
