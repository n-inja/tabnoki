const tabId2Parent = {};

/** @type Record<number, number[]> */
const tabId2Children = {};

let indexTabId = -1;

chrome.browserAction.onClicked.addListener(function () {
  if (indexTabId !== -1) {
    chrome.tabs.update(indexTabId, { active: true });
    return;
  }
  const data = JSON.stringify(tabId2Parent);
  const s = encodeURIComponent(data);
  chrome.tabs.create(
    { url: chrome.runtime.getURL("index.html") + "?q=" + s },
    (tab) => {
      indexTabId = tab.id;
    }
  );
});

chrome.tabs.onCreated.addListener(function (tab) {
  if (tab.id === undefined) return;

  tabId2Parent[tab.id] = tab.openerTabId ?? -1;
  if (tab.openerTabId !== undefined) {
    if (!tabId2Children[tab.openerTabId]) {
      tabId2Children[tab.openerTabId] = [];
    }
    tabId2Children[tab.openerTabId].push(tab.id);
  }
});

chrome.tabs.onRemoved.addListener(function (tabId) {
  const openerId = tabId2Parent[tabId];
  tabId2Children[openerId] = tabId2Children[openerId]?.filter(
    (id) => id !== tabId
  );
  tabId2Children[tabId]?.forEach((id) => (tabId2Parent[id] = -1));
  delete tabId2Parent[tabId];
  delete tabId2Children[tabId];

  if (tabId === indexTabId) {
    indexTabId = -1;
  }
});
