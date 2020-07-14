import React, { useEffect, useState } from "react";
import quotes from "../assets/quotes.json";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useQuote = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  useEffect(() => {
    const index = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[index]?.quote ?? "All tabs with you");
    setAuthor(quotes[index]?.author ?? "✨💪🌚🍤✨");
  });
  return { quote, author };
};

const useStyles = makeStyles(() =>
  createStyles({
    quote: {
      fontStyle: "italic",
      fontSize: "1rem",
      maxWidth: "50rem",
    },
  })
);

export default function App() {
  const { quote, author } = useQuote();
  const classes = useStyles();
  return (
    <blockquote className={classes.quote}>
      {quote} - {author}
    </blockquote>
  );
}
