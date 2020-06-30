import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { convert } from "./tabDependent";
import TabNode from "./TabNode";
import { Button } from "@material-ui/core";

export default function App() {
  const info = JSON.parse(
    new URLSearchParams(location.search.substring(1)).get("q") ?? ""
  ); // FIXME : dirty
  const dat = convert(info);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello!</p>
        <Button color="primary">Hello World</Button>
        <ul className="tabList">
          {dat.map((node) => (
            <TabNode key={node.id} node={node} />
          ))}
        </ul>
      </header>
    </div>
  );
}
