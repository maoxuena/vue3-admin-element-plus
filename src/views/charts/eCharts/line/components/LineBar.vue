<template>
  <div class="line-bar-container">
    <vue-echarts :options="options" />
  </div>
</template>

<script setup>
import VueEcharts from '@/components/VueEcharts'
import { ref, watch, onMounted, inject, defineProps } from 'vue'
const props = defineProps({
  data: {
    type: Object
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

const Echarts = inject('ec')
const options = ref(null)

const updateChart = () => {
  options.value = {
    title: {
      text: '增量设备贯通情况-单位',
      x: 'center',
      y: 0,
      textStyle: {
        color: '#B4B4B4',
        fontSize: 16,
        fontWeight: 'normal'
      }
    },
    backgroundColor: '#191E40',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255,255,255,0.9)',
      axisPointer: {
        type: 'shadow',
        label: {
          show: true,
          backgroundColor: '#7B7DDC'
        }
      }
    },
    legend: {
      data: ['已贯通', '计划贯通', '贯通率'],
      textStyle: {
        color: '#B4B4B4'
      },
      top: '7%'
    },
    grid: {
      x: '6%',
      width: '88%',
      height: '80%',
      y: '10%'
    },
    xAxis: {
      data: props.data.category,
      axisLine: {
        lineStyle: {
          color: '#B4B4B4'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: [
      {
        splitLine: { show: false },
        axisLine: {
          lineStyle: {
            color: '#B4B4B4'
          }
        },
        axisLabel: {
          formatter: '{value} '
        }
      },
      {
        splitLine: { show: false },
        axisLine: {
          lineStyle: {
            color: '#B4B4B4'
          }
        },
        axisLabel: {
          formatter: '{value} '
        }
      }
    ],
    series: [
      {
        name: '贯通率',
        type: 'line',
        smooth: true,
        showAllSymbol: true,
        symbol: 'emptyCircle',
        symbolSize: 8,
        yAxisIndex: 1,
        itemStyle: {
          normal: {
            color: '#F02FC2'
          }
        },
        data: props.data.rateData
      },
      {
        name: '已贯通',
        type: 'bar',
        barWidth: 10,
        itemStyle: {
          normal: {
            barBorderRadius: 5,
            color: new Echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                { offset: 0, color: '#956FD4' },
                { offset: 1, color: '#3EACE5' }
              ]
            )
          }
        },
        data: props.data.barData
      },
      {
        name: '计划贯通',
        type: 'bar',
        barGap: '-100%',
        barWidth: 10,
        itemStyle: {
          normal: {
            barBorderRadius: 5,
            color: new Echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                { offset: 0, color: 'rgba(156,107,211,0.5)' },
                { offset: 0.2, color: 'rgba(156,107,211,0.3)' },
                { offset: 1, color: 'rgba(156,107,211,0)' }
              ]
            )
          }
        },
        z: -12,
        data: props.data.lineData
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
.line-bar-container{
  height: 100%;
}
</style>
