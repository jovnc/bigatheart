"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAuthContext } from "@context/AuthContext";

export default function Nav() {
  const router = useRouter();

  const { session } = useAuthContext();
  const isUserLoggedIn = session?.user?.role === "authenticated";
  const pathname = usePathname();

  function handleSignOut() {
    const supabase = createClientComponentClient();
    const signout = async () => {
      await supabase.auth.signOut();
    };
    try {
      signout();
      router.push("/");
      toast.success("Successfully signed out");
    } catch (error) {
      toast.error("Failed to log out");
    }
  }

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.png"
          width={50}
          height={50}
          className="object-contain"
          alt="logo"
        />
      </Link>

      {/*  Desktop navigation */}
      <div className="sm:flex hidden">
        {isUserLoggedIn && pathname === "/dashboard" ? (
          <>
            <button
              type="button"
              className="red_outline_btn scale-75"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          </>
        ) : isUserLoggedIn ? (
          <>
            <Link href="/dashboard" className="red_btn scale-75">
              <p>To Dashboard</p>
            </Link>
            <button
              type="button"
              className="red_outline_btn scale-75"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/register" className="red_btn scale-75">
              <p>Register</p>
            </Link>
            <Link href="/auth/login" className="red_outline_btn scale-75">
              <p>Login</p>
            </Link>
          </>
        )}
      </div>

      {/* TODO: Mobile navigation */}
    </nav>
  );
}
