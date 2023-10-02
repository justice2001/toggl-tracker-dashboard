<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts';
import VChart, { THEME_KEY } from 'vue-echarts';

import { use } from 'echarts/core'
import { HeatmapChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
  CalendarComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { getDate, getTime, getTimeFormat } from '../../utils/baseUtils';

use([
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
  CalendarComponent,
  HeatmapChart,
  CanvasRenderer
])

const DAY = 90
const startAt = new Date(new Date().setDate(new Date().getDate() - DAY))
const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})
watch(() => props.data, (v, o) => {
  let cursor = new Date(getDate(startAt))
  const range = [getDate(cursor)]
  const calendarData = []
  // Set Calender
  for (let i = 0;i < DAY;i++) {
    calendarData.push([getDate(cursor), 0])
    cursor.setDate(cursor.getDate() + 1)
  }
  cursor.setDate(cursor.getDate() - 1)
  range.push(getDate(cursor))
  console.log(cursor);
  option.value.calendar.range = range
  option.value.calendar.dayLabel.firstDay = cursor.getDay() / 7
  // Process Data
  props.data.forEach(i => {
    const offset = calendarData.length - 1 -((cursor - new Date(getDate(new Date(i.start)))) / (1000 * 60 * 60 *24))
    if (offset < calendarData.length) {
      calendarData[offset][1] += i.duration
    }
  })
  option.value.series.data = calendarData
})

const option = ref({
  title: {
    top: 30,
    left: 'center',
    text: 'LEAST THREE MONTH',
    subtext: "Data from toggl tracker"
  },
  tooltip: {
    formatter: e => {
      return "TIME: " + getTimeFormat(e.value[1])
    }
  },
  visualMap: {
    min: 5 * 60,
    max: 12 * 60 * 60,
    type: 'piecewise',
    orient: 'horizontal',
    left: 'center',
    show: false,
    top: 65,
    inRange: {
      color: ['lightgreen', 'darkgreen'],
      symbolSize: [30, 100]
    }
  },
  calendar: {
    left: 'center',
    top: 120,
    cellSize: [13, 13],
    range: '2023',
    itemStyle: {
      borderWidth: 0.5
    },
    dayLabel: {
        firstDay: 0,
        nameMap: 'ZH' // 从周一开始
    },
    yearLabel: { show: false }
  },
  series: {
    type: 'heatmap',
    coordinateSystem: 'calendar',
    data: []
  }
})

onMounted(() => {
})
</script>

<style scoped>
.chart {
  height: 240px;
}
</style>