"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
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

  revalidatePath("/dashboard/settings");

  return { data, updateAvatarError };
}

export async function getAllUserDetails() {
  const supabase = createServerActionClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;
  const userid = user.id;

  // fetch data from users table
  const { data: userData, error: readUserError } = await supabase
    .from("users")
    .select()
    .eq("user_id", userid);

  if (readUserError) {
    throw new Error("Error retrieving user information");
  }

  return { userData };
}

export async function updateUserInfo({
  dob,
  educationalBackground,
  firstName,
  immigration,
  lastName,
  occupation,
  phone,
  school,
  skills,
}) {
  const supabase = createServerActionClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;
  const userid = user.id;

  const { error } = await supabase
    .from("users")
    .update({
      dob,
      educationalBackground,
      first_name: firstName,
      immigration,
      last_name: lastName,
      occupation,
      phone,
      school,
      skills,
    })
    .eq("user_id", userid);

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/settings");

  return error;
}
