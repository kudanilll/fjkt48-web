import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://mkszsnfuynjajxlxtlyi.supabase.co";

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_IOTMWG73BudxnWxFS7UUrA__dJPaDyT";

export const createClient = () => createBrowserClient(supabaseUrl, supabaseKey);

export const supabase = createClient();
