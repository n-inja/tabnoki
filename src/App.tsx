import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import promisify from "./utils/promisify";
import { convert } from "./tabDependent";
import TabNode from "./TabNode";

function App() {
  const [tabs, setter] = useState([] as chrome.tabs.Tab[]);

  const query = promisify(chrome.tabs.query);
  const info = JSON.parse(
    new URLSearchParams(location.search.substring(1)).get("q") ?? ""
  ); // FIXME : dirty
  const dat = convert(info);
  console.log(dat);

  useEffect(() => {
    query({ currentWindow: true }).then((result) => {
      setter(result);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello!</p>
        <ul className="tabList">
          {dat.map((node) => (
            <TabNode key={node.id} node={node}></TabNode>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
