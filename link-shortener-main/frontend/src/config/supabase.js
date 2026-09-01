import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const redirectUrl = import.meta.env.VITE_SUPABASE_REDIRECT_PROD || import.meta.env.VITE_SUPABASE_REDIRECT

export const supabase = createClient(supabaseUrl, supabaseKey)
export { redirectUrl }
