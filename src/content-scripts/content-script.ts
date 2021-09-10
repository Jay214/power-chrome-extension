function injectJS() {
  // document.addEventListener("readystatechange", () => {
    const injectPath = "inject-script.js";
    const temp = document.createElement("script");

    temp.setAttribute("type", "module");
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
    temp.src = chrome.runtime.getURL(injectPath);
    document.body.appendChild(temp);
  // });
}
  injectJS()