import { useState } from "react";

export const useTabInfo = (initialValue: string) => {
  const initialInfo = JSON.parse(initialValue);
  const [info, setInfo] = useState(initialInfo as Record<string, number>);
  chrome.runtime.onMessage.addListener((request) => {
    if (typeof request.tabId2Parent !== "object") {
      return;
    }
    setInfo(request.tabId2Parent as Record<string, number>);
  });
  return info;
};
