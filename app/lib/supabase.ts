import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseClientKey: string =
  process.env.NEXT_PUBLIC_SUPABASE_CLIENT_KEY || "";

// Client-side Supabase client (for browser)
const supabaseClient = createClient(supabaseUrl, supabaseClientKey);

// Server-side Supabase client (for API routes)
const supabaseServerClient = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseClientKey
);

export { supabaseClient, supabaseServerClient };
