<template>
    <v-chart class="chart" :option="option" autoresize />
</template>

<script setup>
import {getTimeFormat} from '../../utils/baseUtils'

import { use } from 'echarts/core';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, defineProps, watch } from 'vue';

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
]);


const props = defineProps({
    data: {
        type: Array,
        withDefaults: []
    }
})

watch(() => props.data, (v, o) => {
    option.value.series[0].data = v
})

const option = ref({
  title: {
    text: 'Time Tracker',
    subtext: 'Data From Toggl Tracker',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    valueFormatter: getTimeFormat
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [{label: "loading", value: 0}]
    }
  ],
});
</script>

<style scoped>
.chart {
  height: 480px;
}
</style>