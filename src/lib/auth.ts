import { createClient } from "@/lib/supabase/server";

export async function getUser() {
  const supabase = await createClient();
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    // İsim bilgisi metadata'dan veya email'den alınabilir
    const name = user.user_metadata?.full_name || user.email?.split('@')[0] || "Yatırımcı";
    
    return {
      email: user.email,
      name: name,
      avatar: user.user_metadata?.avatar_url
    };
  } catch (error) {
    return null;
  }
}

