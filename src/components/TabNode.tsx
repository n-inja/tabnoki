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
import Chip from "@material-ui/core/Chip";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";
import TagEditor from "./TagEditor";

type Props = {
  node: Node;
};

const useStyles = makeStyles(() =>
  createStyles({
    node: {
      width: "100%",
      maxWidth: "50rem",
    },
    inactive: {
      opacity: 0.5,
    },
    text: {
      marginLeft: "1rem",
    },
    secondaryActionContainer: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
    },
  })
);
export default function TabNode(props: Props) {
  const [tab, setter] = useState(undefined as chrome.tabs.Tab | undefined);
  const [categories, categoriesSetter] = useState(
    new Set(props.node.categories)
  );
  const [open, setOpen] = useState(true);
  const [openTagEditor, setOpenTagEditor] = useState(false);
  const [category, setCategory] = useState("");
  const getTab = promisify(chrome.tabs.get);

  function addCategory(category: string) {
    categoriesSetter(() => {
      const currentCategories = categories;
      currentCategories.add(category);
      return new Set(currentCategories);
    });
    chrome.runtime.sendMessage({
      command: "addCategory",
      tabId: tab?.id ?? -1,
      category,
    });
  }

  function removeCategory(category: string) {
    categoriesSetter(
      (() => {
        const currentCategories = categories;
        currentCategories.delete(category);
        return new Set(currentCategories);
      })()
    );
    chrome.runtime.sendMessage({
      command: "removeCategory",
      tabId: tab?.id ?? -1,
      category,
    });
  }

  const expand = (event: MouseEvent) => {
    setOpen(!open);
    event.stopPropagation();
  };

  const openTab = () => {
    setTimeout(() => {
      chrome.tabs.update(tab?.id ?? -1, { active: true });
    }, 300);
  };

  useEffect(() => {
    setTimeout(() => {
      getTab(props.node.id).then((result) => {
        setter(result);
      });
    }, 100);
  }, []);

  const hasChild = props.node.children.length > 0;

  const classes = useStyles();
  return (
    <div className={classes.node}>
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
          <div className={classes.secondaryActionContainer}>
            {Array.from(categories)
              .sort()
              .map((category) => (
                <Chip
                  key={category}
                  label={category}
                  onDelete={() => removeCategory(category)}
                />
              ))}
            <div className={classes.secondaryActionContainer}>
              {openTagEditor && (
                <TagEditor category={category} setCategory={setCategory} />
              )}
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => {
                  if (openTagEditor && !!category) {
                    addCategory(category);
                    setCategory("");
                  }
                  setOpenTagEditor(!openTagEditor);
                }}
              >
                {openTagEditor ? <CheckIcon /> : <AddIcon />}
              </IconButton>
            </div>
            <div onClick={() => removeTab(props.node)}>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </div>
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
