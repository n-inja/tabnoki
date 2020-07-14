import React, { useEffect, useState } from "react";
import quotes from "../assets/quotes.json";

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

export default function App() {
  const { quote, author } = useQuote();
  return (
    <p className="App">
      {quote} - {author}
    </p>
  );
}
