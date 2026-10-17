import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://vjyjaodmgtabehtjpzrd.supabase.co'
const supabaseKey = 'sb_publishable_qHweJYiaShApRPEFosXDfw_ggc49ejw'
export const supabase = createClient(supabaseUrl, supabaseKey)