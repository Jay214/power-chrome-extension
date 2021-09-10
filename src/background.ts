import { updateDynamicRules } from './popup/utils/use-request-manage'
// import { UrlItem } from './types'
// import { isIllegalUrl } from './utils/index'
// console.log("This message is sent from background script.");
export interface UrlItem {
  origin: string
  target: string
}
export const isIllegalUrl = (url: string) => {
  return url && typeof url === 'string'
}

chrome.runtime.onConnect.addListener(port => {
  port.onMessage.addListener((urls: UrlItem[]) => {
    console.log('---msg from popup', urls)
    const ruleUrls = urls.filter(({ origin, target}) => isIllegalUrl(origin) && isIllegalUrl(target))
    updateDynamicRules(ruleUrls)
  })
})

