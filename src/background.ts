console.log("This message is sent from background script.");

chrome.runtime.onConnect.addListener(port => {
  port.onMessage.addListener(msg => {
    console.log('---msg from popup', msg)
  })
})  