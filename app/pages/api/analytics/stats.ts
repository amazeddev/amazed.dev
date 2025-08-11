import { NextApiRequest, NextApiResponse } from "next";
import { supabaseServerClient } from "../../../lib/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Get all post views
    const { data: postViews, error } = await supabaseServerClient
      .from("post_views")
      .select("*")
      .order("views", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: "Database error" });
    }

    // Calculate total views
    const totalViews =
      postViews?.reduce((sum, post) => sum + post.views, 0) || 0;

    const posts: Record<
      string,
      {
        slug: string;
        totalViews?: number;
        langs: Array<{
          lang: string;
          views: number;
        }>;
      }
    > = {};
    postViews?.forEach((post) => {
      if (!posts[post.slug]) {
        posts[post.slug] = {
          slug: post.slug,
          totalViews: post.views,
          langs: [
            {
              lang: post.lang,
              views: post.views,
            },
          ],
        };
      } else {
        posts[post.slug].totalViews += post.views;
        posts[post.slug].langs.push({
          lang: post.lang,
          views: post.views,
        });
      }
    });

    // Process data
    const stats = {
      totalViews,
      totalPosts: postViews?.length || 0,
      posts: Object.values(posts),
      postsByLanguage:
        postViews?.reduce((acc, post) => {
          acc[post.lang] = (acc[post.lang] || 0) + post.views;
          return acc;
        }, {} as Record<string, number>) || {},
    };

    res.status(200).json(stats);
  } catch (error) {
    console.error("Analytics stats error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
