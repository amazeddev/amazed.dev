import fs from "fs";
import path from "path";
import matter from "gray-matter";
import React from "react";
import { structText } from "../utils/text";
import { Post, Language, HomeProps } from "../types";
import { GetStaticProps } from "next";
import Image from "next/image";

export default function Home({ translations }: { translations: any }) {
  return (
    <>
      {/* No analytics needed for home page */}
      <div className="container-content">
        <div className="home">
          <div className="banner">
            <div>
              <h1 className="title">
                Senior <span className="highlight">{`{Backend}`}</span>
                <br /> web & app developer
              </h1>
              {/* <h1 className="title">{translations.main.greeting}</h1> */}
              <>{structText(translations.main.banner.paragraph)}</>

              <a
                href="/SebastianLuszczek_CV.pdf"
                download="Sebastian_Luszczek_CV.pdf"
              >
                <button className="cv-btn">{translations.main.cvBtn}</button>
              </a>
            </div>
            <div className="about-image">
              <img
                src="/images/profile.webp"
                alt="Sebastian Luszczek - Senior Backend Developer"
                title="AmazedDEV"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const constructLangPosts = (files: string[], lang: Language): Post[] => {
  return files.map((filename) => {
    const slug = filename.replace(".md", "");

    const markdowWithMeta = fs.readFileSync(
      path.join("posts", lang, filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdowWithMeta);
    return { slug, frontmatter: frontmatter as Post["frontmatter"], lang };
  });
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const enFiles = fs.readdirSync(path.join("posts", "en"));
  const plFiles = fs.readdirSync(path.join("posts", "pl"));

  return {
    props: {
      posts: [
        ...constructLangPosts(enFiles, "en"),
        ...constructLangPosts(plFiles, "pl"),
      ]
        .filter((post) => post.frontmatter.published)
        .sort(
          (a, b) =>
            new Date(b.frontmatter.date).getTime() -
            new Date(a.frontmatter.date).getTime()
        ),
    },
  };
};
