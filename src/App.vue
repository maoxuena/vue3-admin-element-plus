<!-- 参照：https://imooc-admin.lgdsunday.club/login -->
<template>
  <router-view />
</template>

<script setup>
import * as echarts from 'echarts'
import { provide } from 'vue'
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
import { watchSwitchLang } from '@/utils/i18n'

provide('ec', echarts)

const store = useStore()
generateNewStyle(store.getters.mainColor).then(newStyleText => {
  writeNewStyle(newStyleText)
})

/**
 * 监听 语言变化，重新获取个人信息
 */
watchSwitchLang(() => {
  if (store.getters.token) {
    store.dispatch('user/getUserInfo')
  }
})
</script>

<style lang="scss"></style>
