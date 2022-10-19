import React, { useEffect, useState } from "react";
import search from "../search.json";
import PostItem from "./PostItem";

export default function SearchModal({ setIsOpen }) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  useEffect(() => {
    const results =
      query.length > 1
        ? search.filter((post) => post.title.toLowerCase().includes(query))
        : [];
    console.log(results);
    setResult(results);
  }, [query]);
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <>
      <div id="myModal" className="modal" onClick={() => setIsOpen(false)}>
        <div className="container" onClick={(e) => e.stopPropagation()}>
          <div className="search-wrapper">
            <label htmlFor="search-form">
              <input
                type="search"
                name="search-form"
                id="search-form"
                className="search-input"
                placeholder="Search posts..."
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
          </div>
          <div class="cards" onClick={() => setIsOpen(false)}>
            {result && result.length > 0 ? (
              result.map((post, index) => (
                <PostItem post={post} view_count={undefined} key={index} />
              ))
            ) : (
              <h2>Brak postów...</h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
