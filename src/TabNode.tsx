import React, { useState, useEffect } from "react";
import "./App.css";
import promisify from "./utils/promisify";
import { Node } from "./tabDependent";

type Props = {
  node: Node;
};

export default function TabNode(props: Props) {
  const [tab, setter] = useState(undefined as chrome.tabs.Tab | undefined);
  const getTab = promisify(chrome.tabs.get);

  useEffect(() => {
    getTab(props.node.id).then((result) => {
      setter(result);
    });
  }, []);

  return (
    <li>
      {(tab?.id ?? "") + "-" + (tab?.title ?? "")}
      <ul className="tabList">
        {props.node.children.map((child) => (
          <TabNode key={child.id} node={child} />
        ))}
      </ul>
    </li>
  );
}
