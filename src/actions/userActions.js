"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function updateAvatar(currImage) {
  const supabase = createServerActionClient({ cookies });
  const {
    data: {
      user: { id: userid },
    },
  } = await supabase.auth.getUser();

  const { data, error: updateAvatarError } = await supabase
    .from("users")
    .update({ avatar: currImage })
    .eq("user_id", userid)
    .select();

  if (updateAvatarError) throw new Error(updateAvatarError.message);

  return { data, updateAvatarError };
}
