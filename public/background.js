const tabID2openerID = {};

chrome.browserAction.onClicked.addListener(function () {
  const data = JSON.stringify(tabID2openerID);
  const s = encodeURIComponent(data);
  chrome.tabs.create({ url: chrome.runtime.getURL("index.html") + "?q=" + s });
});

chrome.tabs.onCreated.addListener(function (tab) {
  tabID2openerID[tab.id] = tab.openerTabId ?? -1;
});
