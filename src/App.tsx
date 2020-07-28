import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { convert } from "./tabDependent";
import TabNodeList from "./components/TabNodeList";
import { useTabInfo } from "./hooks/tabInfo";
import SearchBar from "./components/SearchBar";
import CategorySelector from "./components/CategorySelector";
import searchTab from "./searchTab";
import { Node } from "./tabDependent";
import Quote from "./components/Quote";
import categoryFilter from "./categoryFilter";

const useSearch = (rootNode: Node) => {
  const [query, setQuery] = useState("");
  const [filteredNodes, setFilteredNodes] = useState([] as Node[]);
  const onChange = async (query: string) => {
    setQuery(query);
    setFilteredNodes(await searchTab(rootNode, query));
  };
  return { query, onChange, filteredNodes };
};

const useAllCategories = (root: Node) => {
  const traverse = (n: Node): string[] =>
    [n.categories, ...n.children.map(traverse)].flat();
  return Array.from(new Set(traverse(root))).filter(Boolean);
};

const useCategoryFilter = (rootNode: Node) => {
  const [currentCategory, setCurrentCategory] = useState("");
  const filteredNodes = categoryFilter(rootNode, currentCategory);
  const setCategory = (category: string) => {
    setCurrentCategory(category);
  };
  return { currentCategory, setCategory, filteredNodes };
};

export default function App() {
  const info = useTabInfo();
  const dat = convert(info);

  const rootNode = { id: -1, children: dat, categories: [] };

  useEffect(() => {
    chrome.runtime.sendMessage({ command: "update" });
  }, []);

  const orphans = dat.find((d) => d.id === -1)?.children ?? [];
  const others = dat.filter((d) => d.id !== -1) ?? [];

  const { query, onChange, filteredNodes } = useSearch(rootNode);

  const allCategories = useAllCategories(rootNode);
  const {
    currentCategory,
    setCategory,
    filteredNodes: categoryFilteredNodes,
  } = useCategoryFilter(rootNode);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Quote />
      </header>
      <div className="App-container">
        <div className="App-searchContainer">
          <SearchBar query={query} onChange={onChange} />
          {allCategories.length > 0 && (
            <CategorySelector
              disabled={query.length > 0}
              categories={allCategories}
              onChange={setCategory}
              selectedCategory={currentCategory}
            />
          )}
        </div>
        {query.length > 0 ? (
          <TabNodeList nodes={filteredNodes} />
        ) : categoryFilteredNodes.length > 0 ? (
          <TabNodeList nodes={categoryFilteredNodes} />
        ) : (
          <div>
            <TabNodeList nodes={orphans} />
            <TabNodeList nodes={others} />
          </div>
        )}
      </div>
    </div>
  );
}
