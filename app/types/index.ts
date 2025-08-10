// Common types used throughout the application

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
  };
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
}

export interface Translations {
  en: Translation;
  pl: Translation;
}

export type Language = "en" | "pl";

export interface AppProps {
  Component: React.ComponentType<any>;
  pageProps: any;
}

export interface HomeProps {
  posts: Post[];
}

export interface BlogProps {
  posts: Post[];
  language: Language;
  page: number;
  setPage: (page: number) => void;
  translations: Translation;
}

export interface AboutProps {
  translations: Translation;
}

export interface HeaderProps {
  setIsOpen: (isOpen: boolean) => void;
  toggleLocale: () => void;
  language: Language;
  translations: Translation;
}

export interface RootLayoutProps {
  children: React.ReactNode;
  language: Language;
  toggleLocale: () => void;
  translations: Translation;
}

export interface SearchModalProps {
  setIsOpen: (isOpen: boolean) => void;
  language: Language;
  translations: Translation;
}

export interface BlogPageProps {
  posts: Post[];
  page: number;
  setPage: (page: number) => void;
  language: Language;
  extended?: boolean;
}

export interface PostItemProps {
  post: Post;
  language: Language;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface IconWrapperProps {
  children: React.ReactNode;
  size?: string;
  color?: string;
  className?: string;
}

export interface FlexibleContainerProps {
  icon: React.ReactNode;
  title?: string;
  description?: string;
  layout?: "horizontal" | "vertical";
  className?: string;
}

export interface EnhancedIconProps {
  icon: React.ReactElement<any>;
  size?: string;
  color?: string;
  hoverColor?: string;
  className?: string;
  onClick?: () => void;
}

export interface TechCardProps {
  icon: React.ReactNode;
  badge?: React.ReactNode;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  variant?: "default" | "highlighted";
  onClick?: () => void;
}

export interface TechStackBlockProps {
  title: string;
  paragraph: string;
  icons: string[];
}

export interface LanguageSwitcherProps {
  toggleLocale: () => void;
  language: Language;
}

export interface PostPageProps {
  frontmatter: Post["frontmatter"];
  parsed: string;
  slug: string;
  language: Language;
}

export interface GetStaticPropsParams {
  params: {
    slug: string;
    lang: Language;
  };
}

export interface GetStaticPathsParams {
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

export interface BlogPageProps {
  posts: Post[];
  page: number;
  setPage: (page: number) => void;
  translations: Translation;
  language: Language;
}

export interface TagPageProps {
  posts: Post[];
  tag: string;
  lang: Language;
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

export interface MiddlewareRequest {
  cookies: {
    get: (name: string) => { value: string } | undefined;
  };
  headers: {
    get: (name: string) => string | null;
  };
}
