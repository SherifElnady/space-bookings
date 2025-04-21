import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://vrwhxhvtbxicroomearp.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyd2h4aHZ0YnhpY3Jvb21lYXJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxNzIzMzIsImV4cCI6MjA2MDc0ODMzMn0.enwFT8q03_gYCa6NyxP0IMFglNS0z9AsTpYrhvHjdWQ";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
