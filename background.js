chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setPopup({ popup: 'index.html' });
  });
  