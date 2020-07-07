import { useState } from "react";

export const useTabInfo = (initialValue: string) => {
  const initialInfo = JSON.parse(initialValue);
  const [info, setInfo] = useState(initialInfo as Record<string, number>);
  chrome.runtime.onMessage.addListener((request) => {
    if (typeof request !== "object") {
      return;
    }
    setInfo(request as Record<string, number>);
  });
  return info;
};
