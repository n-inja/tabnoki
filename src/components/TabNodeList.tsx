import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import TabNode from "./TabNode";
import List from "@material-ui/core/List";
import { Node } from "../tabDependent";

type Props = {
  nodes: Node[];
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 720,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

export default function TabNodeList(props: Props) {
  const classes = useStyles();
  return (
    <List component="div" disablePadding className={classes.root}>
      {props.nodes.map((child) => (
        <div className={classes.nested} key={child.id}>
          <TabNode node={child} />
        </div>
      ))}
    </List>
  );
}
