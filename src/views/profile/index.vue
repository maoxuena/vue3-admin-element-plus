<template>
  <div class="">
    个人中心{{ $t('msg.login.passwordRule') }}
    <el-pagination
      :page-size="100"
      layout="total, prev, pager, next"
      :total="400"
    >
    </el-pagination>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
