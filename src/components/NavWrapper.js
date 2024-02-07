import Nav from "./nav/Nav";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function NavWrapper() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isLoggedIn = user ? true : false;
  return <Nav isLoggedIn={isLoggedIn} />;
}
