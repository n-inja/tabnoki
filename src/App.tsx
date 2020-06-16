import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  chrome.tabs.query({}, console.log);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello!</p>
      </header>
    </div>
  );
}

export default App;
