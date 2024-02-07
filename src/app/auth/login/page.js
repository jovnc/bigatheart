"use client";

import { logUserIn } from "@actions/authActions";
import { Grid, GridItem, Link, Text, Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const action = handleSubmit(async (data) => {
    try {
      const res = logUserIn(data);
      toast.success("Successfully logged user in");
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  });

  return (
    <>
      <Grid
        className="w-full"
        templateColumns={{ base: "0fr 1fr", md: "1fr 1fr" }}
        gap={8}
      >
        <GridItem className="invisible md:visible">
          <Image
            src="/assets/images/poster4.jpeg"
            alt="poster"
            className="maxs-h-full"
          />
        </GridItem>
        <GridItem>
          <form className="w-full mx-auto glassmorphism" action={action}>
            <Text fontSize="2xl" className="text-center font-bold p-5">
              Log In
            </Text>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">Email</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm mb-2">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                {...register("password", {
                  required: "This field is required",
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Login
            </button>
            <div className="mt-4">
              <Text fontSize="sm" as="i">
                Don't have an account?{" "}
                <Link href="/auth/register" className="text-blue-700">
                  Sign Up Now
                </Link>
              </Text>
            </div>
          </form>
        </GridItem>
      </Grid>
    </>
  );
}
