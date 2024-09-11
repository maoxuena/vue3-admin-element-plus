<template>
  <div class="time-line-container">
    <vue-echarts :options="options"/>
  </div>
</template>

<script setup>
import VueEcharts from '@/components/VueEcharts'
import { ref, watch, onMounted, defineProps } from 'vue'

const props = defineProps({
  data: {
    type: Array
  },
  color: {
    type: String,
    default: '#409eff'
  },
  lineWidth: {
    type: Number,
    default: 2
  }
})
const options = ref(null)

const seriesList = []
var yarr = []
var linearr = []
var linev = { value: -0, symbol: 'none' }

const updateChart = () => {
  props.data.map((item, index) => {
    seriesList.push({
      date: item.policy_time,
      title: item.policy_title,
      country: item.policy_country,
      content: item.policy_content,
      value: 0,
      label: {
        show: true,
        lineHeight: 20,
        align: index % 2 === 0 ? 'left' : 'right',
        padding: 20,
        position: index % 2 === 0 ? 'left' : 'right',
        formatter: function (params) {
          return `{bolder|${params.name}}\n${params.data.title}`
        },
        rich: {
          bolder: {
            fontWeight: 700,
            color: props.color
          }
        }
      }
    })
  })
  seriesList.map((item) => {
    linearr.push({
      value: -0
    })
    yarr.push(`${item.date}  ${item.country}`)
  })
  options.value = {
    grid: {
      top: 0,
      left: '50%',
      right: '30%',
      bottom: 0
    },
    legend: {
      bottom: 0,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        padding: [2, 0, 0, 0]
      }
    },
    xAxis: {
      show: false,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: { show: false },
      min: 0,
      max: 0
    },
    yAxis: {
      type: 'category',
      axisLine: {
        show: true,
        lineStyle: {
          width: props.lineWidth,
          color: props.color
        }
      },
      axisTick: {
        show: false,
        alignWithLabel: true
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        margin: 30,
        alignWithLabel: true,
        show: false
      },
      data: ['', ...yarr, '']
    },
    color: props.color,
    series: [
      {
        type: 'line',
        symbolSize: 8,
        itemStyle: {
          borderColor: props.color,
          borderWidth: 2
        },
        hoverAnimation: false,
        legendHoverLink: false,
        data: [linev, ...seriesList, linev],
        lineStyle: {
          width: props.lineWidth / 2,
          color: props.color
        }
      }
    ]
  }
}

watch(
  () => props.data,
  (nextValue, prevValue) => {
    updateChart()
  }
)

onMounted(() => {
  updateChart()
})

</script>

<style lang="scss" scoped>
.time-line-container{
  height: 100%;
}
</style>
