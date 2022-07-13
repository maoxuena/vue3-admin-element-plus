<template>
  <div class="bar-page">
    <el-row :gutter="10">
      <el-col :xs="24"
              :sm="12"
              :md="8"
              :lg="6">
        <div class="chart-box">
        {{ barData.text}}
          <bar-charts :data="barData"></bar-charts>
        </div>
      </el-col>
      <el-col :xs="24"
              :sm="12">
        <div class="chart-box">
          <bar-stacking :data="barStackingData"></bar-stacking>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="24">
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import BarCharts from './components/BarCharts'
import BarStacking from './components/BarStacking'
import { totalize, createArray } from '@/utils'

const barData = reactive({
  label: ['22'],
  value: [22],
  sum: [33]
})

const barStackingData = {
  value: [
    {
      type: '直接访问',
      data: [320, 302, 301, 334, 390, 330, 320]
    },
    {
      type: '邮件营销',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      type: '联盟广告',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      type: '视频广告',
      data: [150, 212, 201, 154, 190, 330, 410]
    },
    {
      type: '搜索引擎',
      data: [820, 832, 901, 934, 1290, 1330, 1320]
    }
  ],
  time: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
}

const getAllData = () => {
  const data = {
    label: ['香蕉', '苹果', '芒果', '哈密瓜', '凤梨', '柚子'],
    value: [222, 333, 125, 88, 356, 452]
  }
  const sum = totalize(barData.value)
  const len = barData.value.length
  barData.label = data.label
  barData.value = data.value
  barData.sum = createArray(len, sum)
}

onMounted(() => {
  getAllData()
})
</script>

<style lang="scss" scoped>
.chart-box {
  height: 300px;
  padding: 5px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
</style>
