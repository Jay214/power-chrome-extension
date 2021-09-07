import { UrlItem } from "./types";
const isFunction = (fn: any) => typeof fn === "function";
export const getMatchTargetUrl = (url: string, urls: UrlItem[]) => {
  return urls.find(({ origin }) => origin === url)?.target || url;
};
export class RequestManager {
  private urls: UrlItem[];
  handles: Function[] = [];
  constructor(urls: UrlItem[]) {
    this.urls = urls;
  }

  executeHandles(details: chrome.webRequest.WebRequestBodyDetails) {
    return this.handles.reduce((pre, cur) => {
      if (isFunction(cur)) {
        return Object.assign(pre, cur(details, this.urls));
      }
      return pre;
    }, {});
  }

  handleBeforeRequest() {
    window.chrome.webRequest.onBeforeRequest.addListener(
      (details) => {
        console.log("before request", details);
        return this.executeHandles(
          details
        ) as chrome.webRequest.BlockingResponse;
      },
      {
        urls: this.urls.map(({ origin }) => origin),
      },
      ["blocking"]
    );
  }

  handleBeforeSendHeaders() {
    window.chrome.webRequest.onBeforeSendHeaders.addListener((details) => {});
  }

  addBeforeReqHandle(fn: Function) {
    this.handles.push(fn);
  }

  updateUrls(urls: UrlItem[]) {
    this.urls = urls;
  }
}

export const redirectToMatchUrl = (
  details: chrome.webRequest.WebRequestBodyDetails,
  urls: UrlItem[]
): chrome.webRequest.BlockingResponse => {
  return { redirectUrl: getMatchTargetUrl(details.url, urls) };
};

export const isIllegalUrl = (url: string) => {
  return url && typeof url === 'string'
}

let id = 1;
export const updateDynamicRules = (rules: UrlItem[]) => {
  clearDynamicRules().then(() => {
    const addRules = rules.map(({ origin, target }) => {
      return {
        id: id++,
        priority: 1,
        action: { type: "redirect", redirect: { regexSubstitution: target } },
        condition: { regexFilter: origin, resourceTypes: ["xmlhttprequest"] },
      } as chrome.declarativeNetRequest.Rule;
    });
    console.log('addRules', addRules)

  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: addRules,
    removeRuleIds: []
  });
  })
  
};

export const clearDynamicRules = () => {
  return chrome.declarativeNetRequest.getDynamicRules().then(value => {
    chrome.declarativeNetRequest.updateDynamicRules({
      addRules: [],
      removeRuleIds: value.map(({ id }) => id)
    })
  })
}