<template>
    <v-chart :option="option" class="histogram-chart" autoresize /> 
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
    const diff = (new Date(ed)-new Date(sd))/(1000*60*60*24)
    let dt = new Date(sd)
    let xAxis = []
    for (let i = 0;i < diff;i++) {
        xAxis.push(getDate(dt))
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
  xAxis: {
    type: 'category',
    data: ['Mon']
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
      data: [120],
      type: 'bar'
    }
  ]
})
</script>

<style scoped>
.histogram-chart {
    height: 480px;
}
</style>