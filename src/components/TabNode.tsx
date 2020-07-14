import React, { useState, useEffect, MouseEvent } from "react";
import promisify from "../utils/promisify";
import { Node } from "../tabDependent";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import Language from "@material-ui/icons/Language";
import TabNodeList from "./TabNodeList";
import { removeTab } from "../utils/tab";
import { makeStyles, createStyles } from "@material-ui/core/styles";

type Props = {
  node: Node;
};

const useStyles = makeStyles(() =>
  createStyles({
    inactive: {
      opacity: 0.5,
    },
    text: {
      marginLeft: "1rem",
    },
  })
);

export default function TabNode(props: Props) {
  const [tab, setter] = useState(undefined as chrome.tabs.Tab | undefined);
  const [open, setOpen] = useState(true);
  const getTab = promisify(chrome.tabs.get);

  useEffect(() => {
    setTimeout(() => {
      getTab(props.node.id).then((result) => {
        setter(result);
      });
    }, 500);
  }, []);

  const expand = (event: MouseEvent) => {
    setOpen(!open);
    event.stopPropagation();
  };

  const openTab = () => {
    setTimeout(() => {
      chrome.tabs.update(tab?.id ?? -1, { active: true });
    }, 300);
  };

  const hasChild = props.node.children.length > 0;

  const classes = useStyles();
  return (
    <div>
      <ListItem button onClick={openTab}>
        {hasChild ? (
          open ? (
            <ExpandLess onClick={expand} />
          ) : (
            <ExpandMore onClick={expand} />
          )
        ) : (
          <Language className={classes.inactive} />
        )}
        <ListItemText className={classes.text} primary={tab?.title ?? ""} />
        <ListItemSecondaryAction>
          <div onClick={() => removeTab(props.node)}>
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </div>
        </ListItemSecondaryAction>
      </ListItem>
      {hasChild && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <TabNodeList nodes={props.node.children} />
        </Collapse>
      )}
    </div>
  );
}
