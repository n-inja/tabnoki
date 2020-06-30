const tabID2Parent = {};

/** @type Record<number, number[]> */
const tabId2Children = {};

chrome.browserAction.onClicked.addListener(function () {
  const data = JSON.stringify(tabID2Parent);
  const s = encodeURIComponent(data);
  chrome.tabs.create({ url: chrome.runtime.getURL("index.html") + "?q=" + s });
});

chrome.tabs.onCreated.addListener(function (tab) {
  if (tab.id === undefined) return;

  tabID2Parent[tab.id] = tab.openerTabId ?? -1;
  if (tab.openerTabId !== undefined) {
    if (!tabId2Children[tab.openerTabId]) {
      tabId2Children[tab.openerTabId] = [];
    }
    tabId2Children[tab.openerTabId].push(tab.id);
  }
});

chrome.tabs.onRemoved.addListener(function (tabId) {
  const openerId = tabID2Parent[tabId];
  tabId2Children[openerId] = tabId2Children[openerId]?.filter(
    (id) => id !== tabId
  );
  tabId2Children[tabId]?.forEach((id) => (tabID2Parent[id] = -1));
  delete tabID2Parent[tabId];
  delete tabId2Children[tabId];
});
