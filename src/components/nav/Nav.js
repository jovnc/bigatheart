"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { signUserOut } from "@actions/authActions";
import { Box, Flex, Text } from "@chakra-ui/react";

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
    <nav className="w-screen mb-16  px-10 py-3">
      <Flex justify="space-between" className="w-full">
        <Link href="/" className="flex gap-2 flex-center">
          <Image
            src="/assets/images/logo.png"
            width={50}
            height={50}
            className="object-contain"
            alt="logo"
          />
        </Link>

        <Box>
          <Flex gap={4}>
            {isUserLoggedIn && pathname !== "/dashboard" && (
              <Link href="/dashboard">
                <Text className="border border-black p-2 rounded-lg text-xs font-bold hover:bg-black hover:text-white">
                  To Dashboard
                </Text>
              </Link>
            )}

            {isUserLoggedIn && (
              <form action={action}>
                <button
                  type="submit"
                  className="bg-black text-white p-2 rounded-lg text-xs font-bold hover:bg-white hover:text-black"
                >
                  Sign out
                </button>
              </form>
            )}
            {!isUserLoggedIn && (
              <>
                <Link href="/auth/register">
                  <Text className="border border-black p-2 rounded-lg text-xs font-bold hover:bg-black hover:text-white">
                    Register
                  </Text>
                </Link>
                <Link href="/auth/login">
                  <Text className="bg-black text-white p-2 rounded-lg text-xs font-bold hover:bg-white hover:text-black">
                    Login
                  </Text>
                </Link>
              </>
            )}
          </Flex>
        </Box>
      </Flex>
    </nav>
  );
}
