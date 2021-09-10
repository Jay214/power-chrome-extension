<script setup lang="ts">
import { computed, ref, Ref } from "vue";
import { StorageConnection } from '../utils/chrome-storage'
import { openTab } from '../utils/chrome-api'
const STORAGE_KEY = 'forward'
const POPUP_PATH = 'src/popup/index.html'
const urlArr = ref([
  {
    origin: "",
    target: "",
    enable: true,
  },
]);
const decrease = (index: number) => {
    urlArr.value.splice(index, 1)
} 
const increase = () => {
    urlArr.value.push({
        origin: '',
        target: '',
        enable: true,
    })
}
const storageConnector = new StorageConnection()
storageConnector.output(STORAGE_KEY).then(res => {
    urlArr.value = res as [] || [{
        origin: '',
        target: '',
        enable: true,
    }]
})
storageConnector.observe(urlArr, STORAGE_KEY)

const openInNewTab = () => {
    openTab(POPUP_PATH)
}

const useRules = (formModel: Ref<any[]>) => {
  const urlValidator = (rule: any, value: string, callback: Function) => {
    if (/[\u4e00-\u9fa5]/ig.test(value)) {
      callback('不能包含中文字符')
      return
    }
    callback
  }
  const rule = [
    {required: true, trigger: 'blur', message: '请输入合法的url' },
    { validator: urlValidator, trigger: 'blur' }
  ]
  const rules = computed(() => {
    const res:any = {}
    formModel.value.forEach((item, index) => {
      res[`${index}.origin`] = rule
      res[`${index}.target`] = rule
    })
    return res
  })

  return rules
}

const rules = useRules(urlArr)

</script>

<template>
<div class="popup-head">
    <h2>powerful tool</h2>
     <el-tooltip content="新标签页中打开" placement="bottom" effect="light">
        <el-button size="mini" type="primary" @click="openInNewTab" icon="el-icon-top-right"></el-button>
    </el-tooltip>
</div>
  <el-form :model="urlArr" :rules="rules">
    <el-row style="align-items: baseline" :gutter="16">
      <template v-for="(item, index) in urlArr" :key="index">
        <el-col :span="9">
          <el-form-item required :prop="`${index}.origin`">
            <el-input v-model.trim="item.origin" placeholder="源地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item required :prop="`${index}.target`">
            <el-input v-model.trim="item.target" placeholder="目标地址"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="2">
         <el-switch v-model="item.enable"></el-switch>
        </el-col>
        <el-col :span="2">
          <el-button v-if="urlArr.length > 1" @click="decrease(index)" circle size="mini" type="danger" icon="el-icon-delete"></el-button>
        </el-col>
        <el-col :span="2">
          <el-button v-if="index === urlArr.length - 1" @click="increase" circle size="mini" type="primary" icon="el-icon-plus"></el-button>
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
    align-items: center;
}
</style>
