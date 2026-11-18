import { createClient } from "@supabase/supabase-js";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "./config";

export const EVENTS_CHANNEL = "events";
export const ACTIVITY_CHANNEL = "activity";

export const supabase = createClient(SUPABASE_URL || "http://localhost", SUPABASE_PUBLISHABLE_KEY || "public", {
  auth: { persistSession: false, autoRefreshToken: false },
});
