<script setup lang="ts">
import { ref } from "vue";
import { StorageConnection } from '../utils/chrome-storage'
import { openTab } from '../utils/chrome-api'
const STORAGE_KEY = 'forward'
const POPUP_PATH = 'src/popup/index.html'


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
 
</template>

<style>
.popup-head {
    padding: 0 10px 10px 10px;
        display: flex;
    justify-content: space-between;
}
</style>
