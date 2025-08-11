import { useState, useEffect, useMemo } from "react";

interface PostViews {
  [key: string]: number;
}

export const usePostViews = (posts: Array<{ slug: string; lang: string }>) => {
  const [views, setViews] = useState<PostViews>({});
  const [loading, setLoading] = useState(true);

  // Memoize the posts array to prevent unnecessary re-renders
  const postsKey = useMemo(() => {
    return posts
      .map((post) => `${post.slug}_${post.lang}`)
      .sort()
      .join(",");
  }, [posts]);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/analytics/stats");
        const data = await response.json();

        // Create a map of post views
        const viewsMap: PostViews = {};
        data.topPosts?.forEach((post: any) => {
          const key = `${post.slug}_${post.lang}`;
          viewsMap[key] = post.views;
        });

        setViews(viewsMap);
      } catch (error) {
        console.error("Failed to fetch post views:", error);
      } finally {
        setLoading(false);
      }
    };

    if (posts.length > 0) {
      fetchViews();
    }
  }, [postsKey]); // Use postsKey instead of posts array

  const getPostViews = (slug: string, lang: string): number => {
    const key = `${slug}_${lang}`;
    return views[key] || 0;
  };

  return { views, loading, getPostViews };
};
