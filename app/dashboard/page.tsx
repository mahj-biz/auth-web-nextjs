// app/dashboard/page.tsx
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export default async function Dashboard() {
  const supabase = createClient();

  // Check if user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch the user's profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user.id)
    .single();

  const handleLogout = async () => {
    'use server'; // This is a Server Action
    const supabase = createClient();
    await supabase.auth.signOut();
    revalidatePath('/', 'layout'); // Re-render the layout to update nav
    redirect('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold">Welcome, {profile?.username || user.email}!</h1>
      <p className="mt-4">You are now on a protected page.</p>
      <form action={handleLogout}>
        <button
          type="submit"
          className="mt-6 p-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </form>
    </div>
  );
}