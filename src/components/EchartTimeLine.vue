<template>
  <VChart :option="option" autoresize />
</template>

<script setup>
import VChart from 'vue-echarts'
import * as echarts from 'echarts';

import { use } from 'echarts/core'
import { CustomChart } from 'echarts/charts'
import {
  TooltipComponent,
  TitleComponent,
  DataZoomComponent,
  GridComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { ref } from 'vue';

use([
  TooltipComponent,
  TitleComponent,
  DataZoomComponent,
  GridComponent,
  CustomChart,
  CanvasRenderer
])

const option = ref({
  series: [
    {
      type: 'custom',
      renderItem: (param, api) => {
        console.log(param);
      },
      itemStyle: {
        opacity: 0.8
      },
      data: [{
        name: "TEST",
        value: [0, 200000, 210000, 10000],
        itemStyle: {
          normal: {
            color: 'red'
          }
        }
      }]
    }
  ]
})
</script>

<style scoped></style>