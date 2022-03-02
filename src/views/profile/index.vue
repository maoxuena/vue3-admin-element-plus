<template>
  <div class="my-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="8" :lg="6">
        <project-card class="user-card" :features="featureData"></project-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="16" :lg="18">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
              <feature :features="featureData" />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter">
              <chapter />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { feature } from '@/api/user'
import { watchSwitchLang } from '@/utils/i18n'
import ProjectCard from './components/ProjectCard.vue'
import Chapter from './components/Chapter.vue'
// eslint-disable-next-line
import Feature from './components/Feature.vue'

const activeName = ref('feature')

const featureData = ref([])
const getFeatureData = async () => {
  featureData.value = await feature()
}
getFeatureData()
// 监听语言切换
watchSwitchLang(getFeatureData)
</script>

<style lang="scss" scoped></style>
