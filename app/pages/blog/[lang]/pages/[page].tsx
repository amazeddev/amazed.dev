import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { pageCount } from "../../../../utils/posts";
import BlogPage from "../../../../components/BlogPage";
import BlogHero from "../../../../components/BlogHero";
import { BlogPageProps, BlogPageParams, Post } from "../../../../types";

export default function Home({
  posts,
  page,
  language,
  setPage,
  translations,
}: BlogPageProps) {
  const currentPosts = posts.filter((post) => post.lang === language);

  return (
    <>
      <BlogPage
        posts={currentPosts}
        page={page}
        setPage={setPage}
        translations={translations}
        language={language}
      />
    </>
  );
}

const constructLangPosts = (files: string[], lang: "en" | "pl"): Post[] => {
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

export async function getStaticProps({ params: { page } }: BlogPageParams) {
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
}

export async function getStaticPaths() {
  const enFiles = fs.readdirSync(path.join("posts", "en"));
  const plFiles = fs.readdirSync(path.join("posts", "pl"));

  // totalPostCount number convert into a array
  let enPageIntoArray = Array.from(Array(pageCount(enFiles.length)).keys());
  let plPageIntoArray = Array.from(Array(pageCount(plFiles.length)).keys());

  let paths = [];

  enPageIntoArray.map((path) =>
    paths.push({
      params: { page: `${path + 1}`, lang: "en" },
    })
  );
  plPageIntoArray.map((path) =>
    paths.push({
      params: { page: `${path + 1}`, lang: "pl" },
    })
  );

  return {
    paths,
    fallback: false,
  };
}
