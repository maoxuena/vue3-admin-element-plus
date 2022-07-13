<template>
  <div class="echart-container">
     <el-alert
      title="更多图表可关注：https://www.makeapie.com/explore.html"
      type="info"
      effect="dark">
    </el-alert>
    <div class="echart-box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.echart-box{
  padding-top: 20px;
}
</style>
