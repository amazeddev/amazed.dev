// Common types used throughout the application

import { Project } from "../data/projects";

export interface Post {
  slug: string;
  frontmatter: {
    title: string;
    excerpt?: string;
    date: string;
    tags: string[];
    cover_img?: string;
    published: boolean;
    author?: string;
    description?: string;
  };
  lang: "en" | "pl";
}

export interface Translation {
  main: {
    title: { lead: string; highlight: string; tail: string };
    greeting: string;
    banner: {
      paragraph: string;
    };
    blogs: {
      caption: string;
    };
    cvBtn: string;
  };
  header: {
    home: string;
    blog: string;
    about: string;
    projects: string;
  };
  seo: { home: string; blog: string; about: string; projects: string };
  switcher: { unavailable: string };
  search: {
    noPosts: string;
    placeholder: string;
  };
  blog: {
    paragraph: string;
  };
  about: {
    greeting: string;
    banner: {
      title: string;
      paragraph: string;
    };
    stack: {
      title: string;
      tech: string;
      languages: {
        title: string;
        paragraph: string;
      };
      tools: {
        title: string;
        paragraph: string;
      };
      ai: {
        title: string;
        paragraph: string;
      };
      infrastructure: {
        title: string;
        paragraph: string;
      };
    };
  };
  projects: {
    banner: {
      title: string;
      paragraph: string;
    };
    techTitle: string;
    visitSite: string;
    backToProjects: string;
  };
}

export interface Translations {
  en: Translation;
  pl: Translation;
}

export type Language = "en" | "pl";

/** Counterpart of a page in each language; null when there is none. */
export type Alternates = Record<Language, string | null>;

export interface PageI18nProps {
  language: Language;
  translations: Translation;
  alternates: Alternates;
}

export interface AppProps {
  Component: React.ComponentType<any>;
  pageProps: any;
}

export interface SearchModalProps {
  setIsOpen: (isOpen: boolean) => void;
  language: Language;
  translations: Translation;
}

export interface PostItemProps {
  post: Post;
  language: Language;
}

export interface GetStaticPropsParams {
  params: {
    slug: string;
    lang: Language;
  };
}

export interface BlogPageParams {
  params: {
    page: string;
    lang: Language;
  };
}

export interface TagPageParams {
  params: {
    tag: string;
    lang: Language;
  };
}

export interface CodeTitleOptions {
  // Add any options if needed
}

export interface CodeNode {
  lang?: string;
  type: string;
}

export interface TitleNode {
  type: string;
  value: string;
}

export interface Tree {
  children: Array<CodeNode | TitleNode>;
}

export interface HeaderProps {
  setIsOpen: (isOpen: boolean) => void;
  language: Language;
  translations: Translation;
  alternates: Alternates;
}

export interface RootLayoutProps {
  children: React.ReactNode;
  language: Language;
  translations: Translation;
  alternates: Alternates;
}

export interface LanguageSwitcherProps {
  language: Language;
  alternates: Alternates;
  translations: Translation;
}

export interface BlogPageProps {
  posts: Post[];
  page: number;
  totalPages: number;
  language: Language;
  translations: Translation;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  language: Language;
}

export type ProjectsPageProps = PageI18nProps;

export interface ProjectDetailProps extends PageI18nProps {
  project: Project;
}

export interface PostPageProps extends PageI18nProps {
  frontmatter: Post["frontmatter"];
  parsed: string;
  slug: string;
}

export interface TagPageProps extends PageI18nProps {
  posts: Post[];
  tag: string;
}
