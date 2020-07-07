/** @type Record<number, number[]> */
let tabId2Children = {};

/** @type Record<number, number> */
let tabId2Parent = {};

const t2PKey = "tabId2Parent";
const t2CKey = "tabId2Children";

async function sendMessage(obj) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(obj, resolve);
  });
}

const saveSession = () => {
  localStorage.setItem(t2PKey, JSON.stringify(tabId2Parent));
  localStorage.setItem(t2CKey, JSON.stringify(tabId2Children));
};

const restoreSession = () => {
  tabId2Parent = JSON.parse(localStorage.getItem(t2PKey) ?? "{}");
  tabId2Children = JSON.parse(localStorage.getItem(t2CKey) ?? "{}");
};

chrome.browserAction.onClicked.addListener(function () {
  restoreSession();
  const data = JSON.stringify(tabId2Parent);
  const s = encodeURIComponent(data);
  chrome.tabs.create({ url: chrome.runtime.getURL("index.html") + "?q=" + s });
  saveSession();
});

chrome.tabs.onCreated.addListener(function (tab) {
  if (tab.id === undefined) return;

  restoreSession();
  tabId2Parent[tab.id] = tab.openerTabId ?? -1;
  if (tab.openerTabId !== undefined) {
    if (!tabId2Children[tab.openerTabId]) {
      tabId2Children[tab.openerTabId] = [];
    }
    tabId2Children[tab.openerTabId].push(tab.id);
  }
  saveSession();
});

chrome.tabs.onRemoved.addListener(function (tabId) {
  restoreSession();
  const openerId = tabId2Parent[tabId];
  tabId2Children[openerId] = tabId2Children[openerId]?.filter(
    (id) => id !== tabId
  );
  tabId2Children[tabId]?.forEach((id) => (tabId2Parent[id] = -1));
  delete tabId2Parent[tabId];
  delete tabId2Children[tabId];
  saveSession();
});
