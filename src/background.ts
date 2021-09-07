import { updateDynamicRules, isIllegalUrl } from './popup/utils/use-request-manage'
import { UrlItem } from './popup/utils/types'
console.log("This message is sent from background script.");

chrome.runtime.onConnect.addListener(port => {
  port.onMessage.addListener((urls: UrlItem[]) => {
    console.log('---msg from popup', urls)
    const ruleUrls = urls.filter(({ origin, target}) => isIllegalUrl(origin) && isIllegalUrl(target))
    updateDynamicRules(ruleUrls)
  })
})

