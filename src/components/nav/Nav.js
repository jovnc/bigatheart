"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { signUserOut } from "@actions/authActions";

export default function Nav({ isLoggedIn: isUserLoggedIn }) {
  const router = useRouter();

  const pathname = usePathname();

  const { handleSubmit } = useForm();

  const action = handleSubmit(async () => {
    const res = await signUserOut();
    router.push("/");
    toast.success("Successfully signed out");
  });

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
            <form action={action}>
              <button type="submit" className="red_outline_btn scale-75">
                Sign out
              </button>
            </form>
          </>
        ) : isUserLoggedIn ? (
          <>
            <Link href="/dashboard" className="red_btn scale-75">
              <p>To Dashboard</p>
            </Link>
            <form action={action}>
              <button type="submit" className="red_outline_btn scale-75">
                Sign out
              </button>
            </form>
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
