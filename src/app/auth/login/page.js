"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
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
	const supabase = createClientComponentClient();

	const onSubmit = async ({ email, password }) => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
			options: {
				emailRedirectTo: `${location.origin}/auth/callback`,
			},
		});
		if (error) {
			toast.error(error.message);
		} else {
			router.push("/dashboard");
			toast.success("Successfully logged in!");
		}
	};

	return (
		<form
			className="max-w-sm mx-auto mt-8 glassmorphism"
			onSubmit={handleSubmit(onSubmit)}
		>
			<h3 className="orange_gradient text-center font-bold p-5 page_header">
				Login
			</h3>
			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2">
					Email:
				</label>
				<input
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					type="email"
					{...register("email", { required: "Email is required" })}
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
					{...register("password", { required: "Password is required" })}
				/>
				{errors.password && (
					<p className="text-red-500 text-xs italic">
						{errors.password.message}
					</p>
				)}
			</div>

			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				type="submit"
			>
				Login
			</button>
		</form>
	);
}
