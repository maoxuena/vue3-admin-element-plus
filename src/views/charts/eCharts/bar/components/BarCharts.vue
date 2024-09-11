<template>
  <div class="bar-charts">
    <vue-echarts :options="options" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted, inject, defineProps } from 'vue'
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
    default: () => [['#78EDDC', '#45D7B6'], ['#A4EB00', '#6ED500']]
  },
  bgColor: {
    type: String,
    default: '#f1f1f1'
  }
})

const Echarts = inject('ec')

const options = ref(null)

const updateChart = () => {
  const label = props.data.label
  const value = props.data.value
  const sum = props.data.sum
  const textColor = props.textColor
  const barColor = props.barColor
  const bgColor = props.bgColor

  options.value = {
    textStyle: {
      fontFamily: 'PingFangSC-Semibold'
    },
    grid: {
      show: 'true',
      borderWidth: '0',
      height: '100%',
      width: '76%',
      x: '60px',
      y: '0'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: '{b0}: {c0}'
    },
    xAxis: {
      show: false, // 是否显示x轴
      type: 'value'
    },
    yAxis: {
      type: 'category',
      inverse: true, // 让y轴数据逆向
      axisLabel: {
        show: true,
        interval: 0,
        fontSize: 14,
        padding: [0, 5, 0, 0],
        color: textColor // y轴字体颜色
      },
      splitLine: { show: false }, // 横向的线
      axisTick: { show: false }, // y轴的端点
      axisLine: { show: false }, // y轴的线
      data: label
    },
    series: [
      {
        name: '数据内框',
        type: 'bar',
        itemStyle: {
          borderRadius: 15,
          color: (params) => {
            const index = params.dataIndex % 2
            return new Echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: barColor[index][0] }, { offset: 0.8, color: barColor[index][1] }], false)
          }
        },
        barWidth: 15,
        data: value
      },
      {
        name: '外框',
        type: 'bar',
        itemStyle: {
          borderRadius: 15,
          color: bgColor,
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowOffsetY: 2,
          shadowBlur: 4
        },
        barGap: '-100%',
        z: 0,
        barWidth: 15,
        data: sum
      }
    ]
  }
}
watch(
  [() => props.data.label, () => props.data.value, () => props.data.sum],
  (nextValue, prevValue) => {
    console.log(nextValue, prevValue)
    updateChart()
  }
)

onMounted(() => {
  console.log(props.data)
  updateChart()
})
</script>

<style lang="scss" scoped>
.bar-charts {
  height: 100%;
}
</style>
