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
  calendarData.push([getDate(cursor), 0])
  // cursor.setDate(cursor.getDate() - 1)
  range.push(getDate(cursor))
  option.value.calendar.range = range
  // Process Data
  props.data.forEach(i => {
    const offset = calendarData.length -((cursor - new Date(getDate(new Date(i.start)))) / (1000 * 60 * 60 *24)) - 1
    if (offset < calendarData.length) {
      if (i.duration > 0)
        calendarData[offset][1] += i.duration
    }
  })
  option.value.series.data = calendarData
})

const option = ref({
  title: {
    left: 'center',
    text: 'LEAST THREE MONTH',
    subtext: "Data from toggl tracker"
  },
  tooltip: {
    formatter: e => {
      return "<div style=\"display: flex; flex-direction: column; align-items:center;\">" 
          + e.value[0] + "<div>" 
          + e.marker + getTimeFormat(e.value[1])
          + "</div>"
          + "</div>"
    }
  },
  visualMap: {
    min: 5 * 60,
    max: 6 * 60 * 60,
    type: 'continuous',
    orient: 'horizontal',
    left: 'center',
    show: false,
    top: 65,
    inRange: {
      color: 'green',
      opacity: [0,1]
    }
  },
  calendar: {
    left: 'center',
    top: 80,
    cellSize: [20, 20],
    range: ['2023-07-05', '2023-10-03'],
    splitLine: {
      lineStyle: {
        width: 2,
        color: "transparent",
        type: 'dashed'
      }
    },
    itemStyle: {
      borderWidth: 2,
      borderColor: '#ffffff',
      color: '#eeeeee',
    },
    dayLabel: {
        firstDay: 0,
        nameMap: 'ZH' // 从周一开始
    },
    monthLabel: {
      nameMap: 'ZH',
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