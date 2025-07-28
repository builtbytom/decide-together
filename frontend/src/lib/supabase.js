import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Create a mock client if no credentials
const mockSupabase = {
  from: () => ({
    insert: async () => ({ error: null }),
    select: async () => ({ data: [], error: null })
  })
}

export const supabase = (supabaseUrl === 'https://placeholder.supabase.co') 
  ? mockSupabase 
  : createClient(supabaseUrl, supabaseAnonKey)