export const openTab = (url: string) => {
  window.chrome.tabs.create({
    url: window.chrome.runtime.getURL(url)
})
}