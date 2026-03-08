import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
if (!supabaseUrl) throw new Error('Error extracting env variables');
if (!supabaseServiceKey) throw new Error('Error extracting env variables');

export const supabase = createClient(supabaseUrl, supabaseServiceKey);
