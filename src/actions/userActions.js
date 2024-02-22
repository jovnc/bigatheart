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

  const cleanedSkills = skills.map((skill) => skill.value);

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
      skills: cleanedSkills,
    })
    .eq("user_id", userid);

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/settings");

  return error;
}

export async function getAllUsers() {
  const supabase = createServerActionClient({ cookies });
  const { data: users, error } = await supabase.from("users").select();
  if (error) throw new Error(error.message);
  return { users };
}

export async function getUserProfile(id) {
  const supabase = createServerActionClient({ cookies });

  const { data: userProfile, error } = await supabase
    .from("users")
    .select(
      "created_at, first_name, last_name, gender, role, avatar, skills, eventinfo(attended, finished, events!inner(name, category, date, time, duration, peopleImpacted))"
    )
    .eq("user_id", id);

  if (error) throw new Error("No such user exists");

  return { userProfile };
}

export async function getAllUserDetailsLeaderboard() {
  const supabase = createServerActionClient({ cookies });

  const { data: userData, error } = await supabase
    .from("users")
    .select(
      "first_name, last_name, avatar, user_id, eventinfo(events!inner(duration, peopleImpacted))"
    )
    .eq("eventinfo.attended", true)
    .eq("eventinfo.finished", true);

  if (error) throw new Error(error.message);

  return { userData };
}
