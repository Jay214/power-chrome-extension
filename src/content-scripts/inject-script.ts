import { Ref, ref } from 'vue';
import { hook, OriginXMLHttpRequest } from "ajax-hook";
import { isMatchUrl } from '../utils/index'
interface ModifyResItem {
  url: string
  content: any
}
const isOn = ref(true)
const interceptors = ref<ModifyResItem[]>([])
interceptors.value = [
  {
    url: '909.bugfix',
    content: 'hhhhhhhhhhhhhhh'
  }
]
console.log('this message is come from content-script')
// const useResponseInterceptor = (xhr: XMLHttpRequest, isOn: Ref<boolean>, interceptors: Ref<[]>) => {
//   if (isOn.value && isMatchUrl('909.bugfix', xhr.responseURL)) {
//     xhr.response = 'test'
//   }
// }

const interceptResponseGetter = (value: any, xhr: XMLHttpRequest) => {
  console.log('interceptResponseGetter', xhr.responseURL)
  const matchItem = interceptors.value.find(({ url }) => isMatchUrl(url, xhr.responseURL))
  return ((isOn.value && matchItem) && matchItem.content) || value
}
const interceptResponseTextGetter = (value: string, xhr: OriginXMLHttpRequest) => {
  console.log('interceptResponseTextGetter', xhr.responseURL)
  const matchItem = interceptors.value.find(({ url }) => isMatchUrl(url, xhr.responseURL))
  return ((isOn.value && matchItem) && matchItem.content) || value
}
hook(
  {
    response: {
      getter: interceptResponseGetter
    },
    responseText: {
      getter: interceptResponseTextGetter
    },
  })

  