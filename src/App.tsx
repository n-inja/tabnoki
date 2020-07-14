import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { convert } from "./tabDependent";
import TabNodeList from "./components/TabNodeList";
import { useTabInfo } from "./hooks/tabInfo";

export default function App() {
  const info = useTabInfo(
    new URLSearchParams(location.search.substring(1)).get("q") ?? ""
  );
  const dat = convert(info);

  useEffect(() => {
    chrome.runtime.sendMessage({ command: "update" });
  }, []);

  const orphans = dat.find((d) => d.id === -1)?.children ?? [];
  const others = dat.filter((d) => d.id !== -1) ?? [];

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello!</p>
        <TabNodeList nodes={orphans} />
        <TabNodeList nodes={others} />
      </header>
    </div>
  );
}
