import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { convert } from "./tabDependent";
import TabNodeList from "./components/TabNodeList";

export default function App() {
  const info = JSON.parse(
    new URLSearchParams(location.search.substring(1)).get("q") ?? ""
  ); // FIXME : dirty
  const dat = convert(info);

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
