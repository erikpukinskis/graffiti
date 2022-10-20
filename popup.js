function sendAddTextMessage() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, 'add-text');
  });
}

document.getElementById("add-text-button").addEventListener("click", sendAddTextMessage)
