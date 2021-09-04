<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs

import { ref } from "@vue/reactivity";

// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
const urlArr = ref([])
</script>

<template>
 <el-from>
     <el-row :gutter="16">
         
  <el-col :span="10">
       <el-form-item>
             <el-input placeholder="源地址"></el-input>
         </el-form-item>
  </el-col>
  <el-col :span="10">
      <el-form-item>
             <el-input placeholder="目标地址"></el-input>
         </el-form-item>
  </el-col>
  <el-col :span="2">
  <el-icon>
  <semi-select :size="20" />
</el-icon>
      
      
  </el-col>
  <el-col :span="2">
      <el-icon :size="20">
  <plus />
</el-icon>
      
  </el-col>
</el-row>
 </el-from>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
