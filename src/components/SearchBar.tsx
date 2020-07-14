import { Component, useState } from "react";
import React from "react";

type Props = {
    node: Node[]
}

export default function SearchBar(props: Props) {
    const [query, setQuery] = useState('')

    function onChange(event) {
        setQuery(event.target.value);
    }

    return (
        <div>
            <input type="text" value={query} onChange={onChange}></input>
        </div>
    )
}