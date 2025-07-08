import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// The database generic type argument is optional, but it helps with
// TypeScript type-safety. You can generate this using the Supabase CLI.
// See: https://supabase.com/docs/guides/api/generating-types
// type Database = { ... }

export const createClient = () =>
  createClientComponentClient(
    // You can optionally pass the generic here: createClientComponentClient<Database>(...)
    {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    }
  )