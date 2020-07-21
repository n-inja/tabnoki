/** @type Record<number, number> */
const tabId2Parent = {};

/** @type Record<number, number[]> */
const tabId2Children = {};

let indexTabId = -1;

async function sendMessage(obj) {
  return new Promise((resolve) => {
    if (indexTabId === -1) {
      resolve();
    }
    chrome.runtime.sendMessage(obj, resolve);
  });
}

async function sendSession() {
  return await sendMessage(tabId2Parent);
}

chrome.browserAction.onClicked.addListener(function () {
  if (indexTabId !== -1) {
    chrome.tabs.update(indexTabId, { active: true });
    return;
  }
  chrome.tabs.create({ url: chrome.runtime.getURL("index.html") }, (tab) => {
    indexTabId = tab.id;
  });
});

chrome.tabs.onCreated.addListener(async (tab) => {
  if (tab.id === undefined) return;

  tabId2Parent[tab.id] = tab.openerTabId ?? -1;
  if (tab.openerTabId !== undefined) {
    if (!tabId2Children[tab.openerTabId]) {
      tabId2Children[tab.openerTabId] = [];
    }
    tabId2Children[tab.openerTabId].push(tab.id);
  }
  await sendSession();
});

chrome.tabs.onUpdated.addListener(async (tabId) => {
  console.log(indexTabId, tabId);
  if (indexTabId !== -1 && tabId === indexTabId) {
    await sendSession();
  }
});

chrome.tabs.onRemoved.addListener(async function (tabId) {
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
  await sendSession();
});

(async function onSessionRequested() {
  chrome.runtime.onMessage.addListener(async (request) => {
    if (request !== typeof object) return;
    switch (request.command ?? "") {
      case "update": {
        await sendSession();
        break;
      }
      default:
        break;
    }
  });
})();
