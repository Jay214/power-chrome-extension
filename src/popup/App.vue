<script setup lang="ts">
import { Component, ref } from 'vue'
import UrlForm from './components/url-form.vue'
import ResInterceptForm from './components/res-intercept-form.vue'

const menuList = ref<{label: string, cmp: Component }[]>([
  {
    label: 'forward', cmp: UrlForm
  },
  {
    label: 'response', cmp: ResInterceptForm
  }
])
</script>

<template>
<el-tabs tab-position="left">
<el-tab-pane v-for="item in menuList" :key="item.label" :label="item.label">
<component :is="item.cmp"></component>
</el-tab-pane>
</el-tabs>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
