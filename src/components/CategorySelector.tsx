import React from "react";
import Chip from "@material-ui/core/Chip";
import TagIcon from "@material-ui/icons/LocalOffer";
import { makeStyles, createStyles } from "@material-ui/core/styles";

type Props = {
  categories: string[];
  onChange: (val: string) => void;
  selectedCategory: string;
  disabled: boolean;
};

const useStyles = (props: Props) =>
  makeStyles(() =>
    createStyles({
      container: {
        display: "flex",
        alignItems: "center",
        marginLeft: "1rem",
        flexShrink: 1,
        minWidth: 0,
        overflow: "scroll",
        marginRight: "16px",
      },
      chip: {
        marginLeft: "0.5rem",
      },
      tag: {
        marginLeft: "0.5rem",
        opacity: props.disabled ? 0.5 : 1,
      },
    })
  );

export default function SearchBar(props: Props) {
  const classes = useStyles(props)();
  return (
    <div className={classes.container}>
      <TagIcon className={classes.tag} />
      {props.categories.map((c, idx) => (
        <Chip
          className={classes.chip}
          key={idx}
          label={c}
          disabled={props.disabled}
          variant={c !== props.selectedCategory ? "outlined" : "default"}
          onClick={() => props.onChange(c !== props.selectedCategory ? c : "")}
        />
      ))}
    </div>
  );
}
