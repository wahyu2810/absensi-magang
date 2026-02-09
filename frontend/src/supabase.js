import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://moknxwxhukdkaxwkspbs.supabase.co";
const supabaseKey = "sb_publishable_1oRNbBV4nGb7cQcvYRVezQ_pqyCETUY";

export const supabase = createClient(supabaseUrl, supabaseKey);
