"use client";

import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@firebase/config";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Registration = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const router = useRouter();

	const onSubmit = (data) => {
		if (data.password !== data.confirmPassword) {
			toast.error("Passwords do not match");
		} else {
			const { email, password } = data;
			createUserWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					const user = userCredential.user;
					console.log(user);
					router.push("/dashboard");
				})
				.catch((error) => {
					if (error.message == "Firebase: Error (auth/email-already-in-use).") {
						toast.error("Email already exists");
					}
					const errorCode = error.code;
					const errorMessage = error.message;
					console.log(errorMessage);
				});
		}
	};

	return (
		<form className="max-w-sm mx-auto mt-8" onSubmit={handleSubmit(onSubmit)}>
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

			<div className="mb-4">
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

			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2">
					Confirm Password:
				</label>
				<input
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					type="password"
					{...register("confirmPassword", {
						required: "Confirm Password is required",
						validate: (value) =>
							value === watch("password") || "Passwords do not match",
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
				Register
			</button>
		</form>
	);
};

export default Registration;
