"use client";
import { useForm } from "react-hook-form";
import { auth } from "@firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const router = useRouter();

	const onSubmit = (data) => {
		const { email, password } = data;
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				router.push("/dashboard");
				toast.success(`Logged in to ${email}`);
			})
			.catch((error) => {
				toast.error("Invalid login credentials");
			});
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
};

export default Login;
