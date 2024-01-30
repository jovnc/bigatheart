"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function page() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const password = watch("password", "");

	const router = useRouter();
	const supabase = createClientComponentClient();

	const onSubmit = async ({
		firstName,
		lastName,
		email,
		password,
		confirmPassword,
	}) => {
		try {
			if (password !== confirmPassword) {
				toast.error("Passwords do not match");
			} else {
				// sign user account using email and password
				const { user, error: signUpError } = await supabase.auth.signUp({
					email,
					password,
					options: {
						emailRedirectTo: `${location.origin}/auth/callback`,
					},
				});

				// throws error if there is error contacting API
				if (signUpError) {
					throw new Error("Error signing up for account");
				}
				router.push("/auth/verification");
				toast.success("Signed up successfully");
			}
		} catch (error) {
			toast.error(error);
		}
	};

	return (
		<form
			className="max-w-sm mx-auto mt-8 glassmorphism"
			onSubmit={handleSubmit(onSubmit)}
		>
			<h3 className="orange_gradient text-center font-bold p-5 page_header">
				Register your account
			</h3>
			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2">
					First Name
				</label>
				<input
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					type="text"
					{...register("firstName", {
						required: "This field is required",
					})}
				/>
				{errors.firstName && (
					<p className="text-red-500 text-xs italic">
						{errors.firstName.message}
					</p>
				)}
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2">
					Last Name
				</label>
				<input
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					type="text"
					{...register("lastName", {
						required: "This field is required",
					})}
				/>
				{errors.lastName && (
					<p className="text-red-500 text-xs italic">
						{errors.lastName.message}
					</p>
				)}
			</div>

			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2">
					Email:
				</label>
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
					<p className="text-red-500 text-xs italic">{errors.email.message}</p>
				)}
			</div>

			<div className="mb-6">
				<label className="block text-gray-700 text-sm font-bold mb-2">
					Password:
				</label>
				<input
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					type="password"
					{...register("password", {
						required: "This field is required",
						minLength: {
							value: 6,
							message: "Password must be at least 6 characters long",
						},
					})}
				/>
				{errors.password && (
					<p className="text-red-500 text-xs italic">
						{errors.password.message}
					</p>
				)}
			</div>

			<div className="mb-6">
				<label className="block text-gray-700 text-sm font-bold mb-2">
					Confirm Password:
				</label>
				<input
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					type="password"
					{...register("confirmPassword", {
						required: "This field is required",
						validate: (value) => value === password || "Passwords do not match",
					})}
				/>
				{errors.confirmPassword && (
					<p className="text-red-500 text-xs italic">
						{errors.confirmPassword.message}
					</p>
				)}
			</div>

			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				type="submit"
			>
				Create account
			</button>
		</form>
	);
}
