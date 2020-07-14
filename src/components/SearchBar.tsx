import { ChangeEvent } from "react";
import React from "react";

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
      <input type="text" value={props.query} onChange={onChange}></input>
    </div>
  );
}
