<template>
  <div class="bar-charts">
    <vue-echarts :options="options" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted, defineProps } from 'vue'
import VueEcharts from '@/components/VueEcharts'
const props = defineProps({
  data: {
    type: Object
  },
  textColor: {
    type: String,
    default: '#111111'
  },
  barColor: {
    type: Array,
    default: () => [['#ff11DC'], ['#78EDDC', '#45D7B6'], ['#A4EB00'], ['#45D7B6'], ['#A4EB00', '#6ED500']]
  },
  bgColor: {
    type: String,
    default: '#f1f1f1'
  }
})

const options = ref(null)

const updateChart = () => {
  const type = []
  const time = props.data.time
  const value = props.data.value
  const series = []
  value.forEach((item, index) => {
    const barColor = props.barColor[index]
    const color = barColor.length > 1 ? {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 1,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: barColor[0] // 0% 处的颜色
        },
        {
          offset: 1,
          color: barColor[1] // 100% 处的颜色
        }
      ]
    } : barColor[0]

    const temp = {
      name: item.type,
      type: 'bar',
      stack: '总量',
      itemStyle: {
        normal: {
          color: color
        }
      },
      label: {
        normal: {
          color: '#111',
          show: true,
          position: 'insideRight'
        }
      },
      data: item.data
    }

    series.push(temp)
    type.push(item.type)
  })

  options.value = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: type
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: time
    },
    series: series
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
.bar-charts {
  height: 100%;
}
</style>
