import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// Same note about the Database generic applies here.
// type Database = { ... }

export const createClient = () =>
  createServerComponentClient(
    // You can optionally pass the generic here: createServerComponentClient<Database>(...)
    {
      cookies: cookies,
    },
    {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    }
  )