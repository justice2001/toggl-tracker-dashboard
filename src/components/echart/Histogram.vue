<template>
  <t-card class="card">
    <v-chart :option="option" class="histogram-chart" autoresize /> 
  </t-card>
</template>

<script setup>
import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { ref, watch } from 'vue';
import VChart, { THEME_KEY } from 'vue-echarts';
import { getDate, getTimeFormat } from '../../utils/baseUtils';

use([GridComponent, BarChart, CanvasRenderer])

const props = defineProps({
    option: {
        type: Object,
        required: true
    },
    data: {
        type: Array,
        required: true
    }
})

watch(() => props.option.count, (v, o) => {
    const sd = props.option.startDate
    const ed = props.option.endDate
    const diff = (new Date(ed)-new Date(sd))/(1000*60*60*24)-1
    let dt = new Date(new Date(sd).setDate(new Date(sd).getDate() + 1))
    let xAxis = []
    for (let i = 0;i < diff;i++) {
        xAxis.push(getDate(dt).slice(5))
        dt = new Date(dt.setDate(dt.getDate() + 1))
    }
    console.log("XAXIS", xAxis);
    option.value.xAxis.data = xAxis
})

watch(() => props.data, (v, o) => {
    console.log(props.data);
    option.value.series[0].data = props.data
})

const option = ref({
  title: {
    text: "THIS WEEK",
    subtext: 'Data From Toggl Tracker',
    left: 'center'
  },
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value',
    axisLabel: {
        formatter: function (value, index) {
            return getTimeFormat(value);
        }
    },
  },
  series: [
    {
      data: [],
      type: 'bar',
      label: {
        position: 'top',
        show: true,
        formatter: function(v) {
          // return getTimeFormat(v.value)
          return (v.value / 3600).toFixed(1) + "H"
        }
      }
    }
  ]
})
</script>

<style scoped>
.histogram-chart {
    height: 400px;
}
</style>