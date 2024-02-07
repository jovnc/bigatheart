"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const supabase = createServerActionClient({ cookies });

export async function registerAccount({
  firstName,
  lastName,
  gender,
  email,
  password,
}) {
  // check if email already exists in database
  const { data, error: readUserError } = await supabase
    .from("users")
    .select("email");

  if (readUserError) {
    throw new Error("Error reading from users database");
  }

  const emails = data.map((email) => email.email);

  if (emails.includes(email)) {
    throw new Error("Email already exists");
  }

  // sign up user
  const { data: user, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `/auth/callback`,
    },
  });

  if (signUpError) {
    throw new Error("Error signing up for account. Please try again later.");
  }

  // // update user in user database
  const user_id = user.user.id;

  const { error: updateUserError } = await supabase.from("users").insert({
    email,
    user_id,
    first_name: firstName,
    last_name: lastName,
    gender,
  });

  if (updateUserError) {
    throw new Error("Error updating user info in user details");
  }

  revalidatePath("/");

  return { user };
}

export async function getUserDetails() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;
  const userid = user.id;

  // fetch data from users table
  const { data: userData, error: readUserError } = await supabase
    .from("users")
    .select("first_name, last_name, role, avatar")
    .eq("user_id", userid);

  if (readUserError) {
    throw new Error("Error retrieving user information");
  }

  const userInfo = userData[0];
  const { role, first_name, last_name, avatar } = userInfo;
  const displayName = `${first_name} ${last_name}`;

  return { displayName, role, avatar };
}

export async function checkLoggedIn() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;
  return true;
}

export async function signUserOut() {
  const res = await supabase.auth.signOut();
  revalidatePath("/");
  return res;
}

export async function logUserIn({ email, password }) {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/");

  return error;
}
