import { UrlItem } from "../../types";

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

  return chrome.declarativeNetRequest.updateDynamicRules({
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