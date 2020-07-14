import { ChangeEvent } from "react";
import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

type Props = {
  query: string;
  onChange: (val: string) => void;
};

export default function SearchBar(props: Props) {
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    props.onChange(event.target.value);
  }

  return (
    <div>
      <TextField
        id="standard-basic"
        label="フィルタ"
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
