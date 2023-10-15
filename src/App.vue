<template>
  <h1 style="text-align: center;">Time Tracker: Dashboard</h1>

  <div class="pie-group">
    <t-radio-group variant="default-filled" default-value="desc" @change="by">
      <t-radio-button value="desc">Description</t-radio-button>
      <t-radio-button value="tags">Tags</t-radio-button>
      <t-radio-button value="proj">Project</t-radio-button>
    </t-radio-group>
    <div class="opt-btn-group" @click="settingsDialog = true">
      <t-button>
        <template #icon><t-icon name="setting" /></template>
        SETTING
      </t-button>
      <t-button @click="loadData">
        <template #icon><t-icon name="refresh" /></template>
        SYNC
      </t-button>
    </div>
  </div>

  <t-loading text="加载中..." :loading="loading" size="small">
    <div class="data-l1-container">
      <t-card class="data-today">
        <Timeboard :today-data="timeStatistics.today" :three-month-data="timeStatistics.threeMonth" />
      </t-card>
      <t-card class="data-heatmap">
        <CalenderHeatmap :data="yearData" />
      </t-card>
      <t-card class="card-container">
        <CountDown />
      </t-card>
    </div>


    <div class="pie-group">
      <Pie :data="todayData.byGroup" />
      <Histogram :option="weekData.option" :data="weekData.data" />
    </div>
  </t-loading>

  <Timeline :data="timeline" />

  <Settings v-model:show="settingsDialog" @saved="settingSaved" />

  <div class="footer">
    <p>time tracker dashboard: version 1.3</p>
    <p>Copyright time_tracker@zhengyi59 2023</p>
  </div>
</template>

<script setup>
import { groupByTag, groupByDescription, groupByProject } from './utils/groupUtils'
import { getDate, getTime, getTimeFormat } from './utils/baseUtils'
import {getRecentDayCount, getToday, getWeek, statisticsTime} from './utils/toggl-utils'

import { ref, onMounted } from 'vue';
import Pie from './components/echart/Pie.vue';
import Histogram from './components/echart/Histogram.vue';
import Timeline from './components/Timeline.vue'
import Settings from './components/Settings.vue';
import { getEntires } from './api/toggl';
import CalenderHeatmap from './components/echart/CalenderHeatmap.vue';
import CountDown from './components/CountDown.vue';
import { getSetting, initSettings } from './utils/settings-utils';
import Timeboard from "./components/Timeboard.vue";

let data = []

const settingsDialog = ref(false)
const timeStatistics = ref({
  today: 0,
  threeMonth: 0
})
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
  data: [],
  time: 0
})
const yearData = ref([])

const loading = ref(true)

onMounted(() => {
  // Get Data
  loadData(false)
  // Init Settings
  initSettings()
  // Register keys to sync data
  window.addEventListener("keydown", e => {
    if (e.code === "KeyR") {
      loadData()
    }
  })
})

const loadData = (force = true) => {
  loading.value = true

  const td = new Date()
  const sd = getDate(new Date(new Date().setDate(td.getDate() - 90)))
  const ed = getDate(new Date(new Date().setDate(td.getDate() + 1)))

  const RECENT_DAY = getSetting("recentDaysCount")

  weekData.value.option.startDate = getDate(new Date(new Date().setDate(td.getDate() - RECENT_DAY)))
  weekData.value.option.endDate = ed
  weekData.value.option.count++

  getEntires(sd, ed, force).then(dt => {
    if (!dt) return
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

    yearData.value = dt

    // weekData.value.data = getWeek(dt)
    weekData.value.data = getRecentDayCount(dt, RECENT_DAY)

    // Statistic 3 Month
    timeStatistics.value.today = statisticsTime(data)
    timeStatistics.value.threeMonth = statisticsTime(dt)
  })
}

const by = (key) => {
  switch (key) {
    case 'tags': todayData.value.byGroup = groupByTag(data); break
    case 'desc': todayData.value.byGroup = groupByDescription(data); break
    case 'proj': todayData.value.byGroup = groupByProject(data); break
  }
}

const settingSaved = () => {
  console.log("SETTING SAVED, RELOAD PAGE")
  location.reload()
}
</script>

<style scoped>
/* DATA L 1 */
.data-l1-container {
  margin: 20px;
  display: flex;
  gap: 20px;
  align-items: normal;
}

.data-l1 {
  display: flex;
}
.data-today {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.data-heatmap {
  flex: 1;
}

.by-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
  gap: 10px;
}

.data-today-container {
  text-align: center;
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

.opt-btn-group {
  position: absolute;
  right: 0;
  display: flex;
  gap: 10px;
}
</style>
