import { useState } from "react";

export type TabInfo = {
  tabId2Parent: Record<number, number>;
  category2TabIds: Record<string, number[]>;
  tabId2Categories: Record<number, string[]>;
};

export const useTabInfo = () => {
  const [info, setInfo] = useState({} as TabInfo);
  chrome.runtime.onMessage.addListener((message: TabInfo) => {
    setInfo(message);
  });
  return info;
};
