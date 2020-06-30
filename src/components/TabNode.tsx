import React, { useState, useEffect } from "react";
import promisify from "../utils/promisify";
import { Node } from "../tabDependent";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import TabNodeList from "./TabNodeList";

type Props = {
  node: Node;
};

export default function TabNode(props: Props) {
  const [tab, setter] = useState(undefined as chrome.tabs.Tab | undefined);
  const [open, setOpen] = useState(true);
  const getTab = promisify(chrome.tabs.get);

  useEffect(() => {
    getTab(props.node.id).then((result) => {
      setter(result);
    });
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  const hasChild = props.node.children.length > 0;

  return (
    <div>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={(tab?.id ?? "") + "-" + (tab?.title ?? "")} />
        {hasChild && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>
      {hasChild && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <TabNodeList nodes={props.node.children} />
        </Collapse>
      )}
    </div>
  );
}
