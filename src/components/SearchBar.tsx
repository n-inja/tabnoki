import { ChangeEvent } from "react";
import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles, createStyles } from "@material-ui/core/styles";

type Props = {
  query: string;
  onChange: (val: string) => void;
};

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      flexShrink: 0,
    },
  })
);

export default function SearchBar(props: Props) {
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    props.onChange(event.target.value);
  }

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <TextField
        id="standard-basic"
        placeholder="フィルタ"
        value={props.query}
        onChange={onChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}
