
import { Ref, toRaw, unref, watch } from "vue"
import { throttle } from "lodash"

const storageCallBack = (args: any) => {
  return Promise.resolve(args)
}
export class Storage {
  private instance: any
  constructor() {
     this.instance = window.chrome.storage.sync
  }

  getItem(key: any, callback: Function = storageCallBack) {
    return new Promise((resolve, reject) => {
      this.instance.get(key, (args: any) => {
        resolve(callback(args[key]))
      })
    })
  }

  setItem(obj: any, callback: Function = storageCallBack) {
    return new Promise((resolve, reject) => {
      this.instance.set(obj, (args: any) => {
        resolve(callback(args))
      })
    })
  }

  removeItem(key: any) {
    this.instance.remove(key)
  }

  clear(callback: Function = storageCallBack) {
    return new Promise((resolve, reject) => {
      this.instance.clear(resolve(callback()))
    })
  }
}

interface StorageConnectionInitOption {
  ConnectInfo: chrome.runtime.ConnectInfo
  retryTimes: number
}
export class StorageConnection {
  private storage = new Storage()
  private connectionOption = {
    ConnectInfo: {},
    retryTimes: 0
  }
  private port
  constructor(option?: StorageConnectionInitOption) {
    this.port = chrome.runtime.connect(option?.ConnectInfo)
    this.connectionOption = option || this.connectionOption
    this.port.onDisconnect.addListener(port => {
      console.log(port, 'disconnect')
      this.retryConnect()
    })
  }
   observe(data: Ref, storageKey: any) {
    watch(data, (v, ov) => {
      const realV = toRaw(v)
      this.postMessage(realV.filter(({ enable }) => enable))
      if (realV) {
        this.storage.setItem({
          [storageKey]: realV,
        })
      } else if (!realV) {
        this.storage.removeItem(storageKey)
      }
      
    }, { deep: true })
    return this
   }

   output(storageKey: any) {
    return this.storage.getItem(storageKey)
  }

   postMessage(data: any) {
    this.port.postMessage(data)
  }

  listeners(callback: (msg: any) => void) {
    this.port.onMessage.addListener(callback)
  }

  retryConnect() {
    if (this.connectionOption.retryTimes > 0) {
      this.port = chrome.runtime.connect(this.connectionOption.ConnectInfo)
    }
  }

}