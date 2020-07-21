import React from "react";
import Input from "@material-ui/core/Input";

export type Props = {
  category: string;
  setCategory: (c: string) => void;
};

const TagEditor = (props: Props) => {
  return (
    <div>
      <Input
        value={props.category}
        placeholder="タグを追加"
        onChange={(e) => props.setCategory(e.target.value)}
      />
    </div>
  );
};

export default TagEditor;
