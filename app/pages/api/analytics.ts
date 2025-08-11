import { NextApiRequest, NextApiResponse } from "next";
import { supabaseServerClient } from "../../lib/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { postSlug, postLang } = req.body;

    if (!postSlug || !postLang) {
      return res.status(400).json({ error: "Missing postSlug or postLang" });
    }

    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      console.error("Missing NEXT_PUBLIC_SUPABASE_URL");
      return res.status(500).json({ error: "Supabase not configured" });
    }

    // Check if post exists in views table
    console.log("Checking post:", { postSlug, postLang });

    const { data: existingPost, error: selectError } =
      await supabaseServerClient
        .from("post_views")
        .select("views")
        .eq("slug", postSlug)
        .eq("lang", postLang)
        .single();

    if (selectError && selectError.code !== "PGRST116") {
      // PGRST116 is "not found" error, which is expected for new posts
      console.error("Supabase select error:", selectError);
      return res.status(500).json({ error: "Database error" });
    }

    if (existingPost) {
      // Update existing post views
      const { error: updateError } = await supabaseServerClient
        .from("post_views")
        .update({ views: existingPost.views + 1 })
        .eq("slug", postSlug)
        .eq("lang", postLang);

      if (updateError) {
        console.error("Supabase update error:", updateError);
        return res.status(500).json({ error: "Database error" });
      }
    } else {
      // Insert new post with 1 view
      const { error: insertError } = await supabaseServerClient
        .from("post_views")
        .insert([
          {
            slug: postSlug,
            lang: postLang,
            views: 1,
          },
        ]);

      if (insertError) {
        console.error("Supabase insert error:", insertError);
        return res.status(500).json({ error: "Database error" });
      }
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Analytics API error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
