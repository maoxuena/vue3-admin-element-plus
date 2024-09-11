<template>
  <div :class="[className, 'echarts']">
  </div>
</template>

<script setup>
import { watch, onMounted, inject, defineProps, defineEmits, onUnmounted, nextTick } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const props = defineProps({
  options: {
    type: Object
  },
  theme: {
    type: [String, Object]
  },
  n: {
    type: String,
    default: 'init'
  }
})

const Echarts = inject('ec')

let dom
let chart
const className = `echarts${uuidv4()}`

const emits = defineEmits(['getParams'])

const initChart = () => {
  if (!chart) {
    dom = document.getElementsByClassName(className)[0]
    chart = Echarts.init(dom, props.theme)
    chart.on('click', (params) => {
      emits('getParams', params)
    })
  }
  props.options && chart.setOption(props.options, true)
}

onMounted(() => {
  initChart()
})

watch(() => props.options, () => {
  nextTick(() => {
    initChart()
  })
})

onUnmounted(() => {
  chart.dispose()
})

</script>

<style lang="scss" scoped>
.echarts {
  height: 100%;
  width: 100%;
}
</style>
