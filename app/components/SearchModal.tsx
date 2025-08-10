import React, { useEffect, useState } from "react";
import search from "../search.json";
import PostItem from "./PostItem";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SearchModalProps, Post } from "../types";

const SearchModal: React.FC<SearchModalProps> = ({
  setIsOpen,
  language,
  translations,
}) => {
  const [query, setQuery] = useState("");
  const [articleResult, setArticleResult] = useState<Post[]>([]);
  const [tagResult, setTagResult] = useState<Post[]>([]);

  useEffect(() => {
    const results =
      query.length > 1
        ? (search as Post[])
            .filter((post) => post.lang === language)
            .filter((post) => {
              const phrases = [
                ...new Set([
                  ...(post.frontmatter.title.match(/\w+(?:'\w+)*/g) || []),
                  ...post.frontmatter.tags,
                ]),
              ].map((p) => p.toLowerCase());

              const querySet =
                query
                  .match(/\w+(?:'\w+)*/g)
                  ?.filter((q) => q.length > 2)
                  .map((q) => q.toLowerCase()) || [];

              return querySet.every((q) => phrases.some((p) => p.includes(q)));
            })
            .sort(
              (a, b) =>
                new Date(b.frontmatter.date).getTime() -
                new Date(a.frontmatter.date).getTime()
            )
        : [];
    setArticleResult(results);

    const tagsResults =
      query.length > 1
        ? (search as Post[]).filter((post) =>
            post.frontmatter.tags.some((t) => t.includes(query))
          )
        : [];

    setTagResult(tagsResults);
  }, [query, language]);

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [setIsOpen]);

  return (
    <>
      <div id="myModal" className="modal" onClick={() => setIsOpen(false)}>
        <div className="container">
          <div
            className="container-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="search-wrapper">
              <label htmlFor="search-form">
                <input
                  type="search"
                  name="search-form"
                  id="search-form"
                  className="search-input"
                  placeholder={translations.search.placeholder}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>
              <div className="search-close" onClick={() => setIsOpen(false)}>
                <FontAwesomeIcon icon={faXmark as any} />
              </div>
            </div>
            <div className="cards" onClick={() => setIsOpen(false)}>
              {articleResult?.length > 0 ? (
                articleResult.map((post, index) => (
                  <PostItem post={post} language={language} key={index} />
                ))
              ) : (
                <h2>{translations.search.noPosts}</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;
