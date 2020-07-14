import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { convert } from "./tabDependent";
import TabNodeList from "./components/TabNodeList";
import { useTabInfo } from "./hooks/tabInfo";
import SearchBar from "./components/SearchBar";
import searchTab from "./searchTab";
import { Node } from "./tabDependent";

const useSearch = (rootNode: Node) => {
  const [query, setQuery] = useState("");
  const [filteredNodes, setFilteredNodes] = useState([] as Node[]);
  const onChange = async (query: string) => {
    setQuery(query);
    setFilteredNodes(await searchTab(rootNode, query));
  };
  return { query, onChange, filteredNodes };
};

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

  const { query, onChange, filteredNodes } = useSearch({
    id: -1,
    children: dat,
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello!</p>
        <SearchBar query={query} onChange={onChange} />
        {filteredNodes.length === 0 ? (
          <div>
            <TabNodeList nodes={orphans} />
            <TabNodeList nodes={others} />
          </div>
        ) : (
          <TabNodeList nodes={filteredNodes} />
        )}
      </header>
    </div>
  );
}
