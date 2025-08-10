import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseClientKey: string =
  process.env.NEXT_PUBLIC_SUPABASE_CLIENT_KEY || "";

const supabaseClient = createClient(supabaseUrl, supabaseClientKey);

export { supabaseClient };
