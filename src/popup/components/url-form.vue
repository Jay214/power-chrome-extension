<script setup lang="ts">
import { ref } from "vue";
import { StorageConnection } from '../utils/chrome-storage'
import { openTab } from '../utils/chrome-api'
const STORAGE_KEY = 'forward'
const POPUP_PATH = 'src/popup/index.html'
const urlArr = ref([
  {
    origin: "",
    target: "",
  },
]);
const decrease = (index: number) => {
    urlArr.value.splice(index, 1)
} 
const increase = () => {
    urlArr.value.push({
        origin: '',
        target: ''
    })
}
const storageConnector = new StorageConnection()
storageConnector.output(STORAGE_KEY).then(res => {
    urlArr.value = res as [] || [{
        origin: '',
        target: ''
    }]
})
storageConnector.observe(urlArr, STORAGE_KEY)

const openInNewTab = () => {
    openTab(POPUP_PATH)
}

</script>

<template>
<div class="popup-head">
    <h2>powerful tool</h2>
     <el-tooltip content="新标签页中打开" placement="top" effect="light">
        <el-button circle @click="openInNewTab" icon="el-icon-top-right"></el-button>
    </el-tooltip>
</div>
  <el-form :model="urlArr">
    <el-row :gutter="16">
      <template v-for="(item, index) in urlArr" :key="index">
        <el-col :span="10">
          <el-form-item>
            <el-input v-model="item.origin" placeholder="源地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item>
            <el-input v-model="item.target" placeholder="目标地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-icon v-if="urlArr.length > 1" @click="decrease(index)">
            <semi-select :size="20" />
          </el-icon>
        </el-col>
        <el-col :span="2" v-if="index === urlArr.length - 1" @click="increase">
          <el-icon :size="20">
            <plus />
          </el-icon>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<style>
.popup-head {
    padding: 0 10px 10px 10px;
        display: flex;
    justify-content: space-between;
}
</style>
