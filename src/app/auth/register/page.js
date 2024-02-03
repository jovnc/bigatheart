"use client";

import { registerAccount } from "@actions/authActions";
import {
	Flex,
	Grid,
	GridItem,
	HStack,
	Image,
	Link,
	Radio,
	RadioGroup,
	Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaMale, FaFemale, FaGenderless } from "react-icons/fa";

export default function page() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();
	const password = watch("password", "");
	const router = useRouter();

	const action = handleSubmit(async (data) => {
		try {
			const res = await registerAccount(data);
			router.push("/auth/verification");
			toast.success("Please verify your email to complete registration");
		} catch (error) {
			toast.error(error.message);
		}
	});

	return (
		<Grid
			className="w-full"
			templateColumns={{ base: "0fr 1fr", md: "1fr 1fr" }}
			gap={8}
		>
			<GridItem className="invisible md:visible">
				<Image
					src="/assets/images/poster4.jpeg"
					alt="poster"
					className="min-h-full"
				/>
			</GridItem>
			<GridItem>
				<form className="w-full mx-auto glassmorphism" action={action}>
					<Text fontSize="2xl" className=" text-center font-bold p-5">
						Sign up with us now!
					</Text>
					<div className="mb-4">
						<Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
							<GridItem>
								<label className="block text-gray-700 text-sm mb-2">
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
							</GridItem>
							<GridItem>
								<label className="block text-gray-700 text-sm mb-2">
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
							</GridItem>
						</Grid>
					</div>
					<div className="mb-4">
						<RadioGroup>
							<label className="block text-gray-700 text-sm mb-2">Gender</label>
							<HStack>
								<Radio
									{...register("gender", {
										required: "This field is required",
									})}
									value={"Male"}
									size="lg"
								>
									<Flex>
										<FaMale />
										<Text fontSize="sm" className="text-gray-700">
											Male
										</Text>
									</Flex>
								</Radio>
								<Radio
									{...register("gender", {
										required: "This field is required",
									})}
									value={"Female"}
									size="lg"
								>
									<Flex>
										<FaFemale />
										<Text fontSize="sm" className="text-gray-700">
											Female
										</Text>
									</Flex>
								</Radio>
								<Radio
									{...register("gender", {
										required: "This field is required",
									})}
									value={"Others"}
									size="lg"
								>
									<Flex>
										<FaGenderless />
										<Text fontSize="sm" className="text-gray-700">
											Others
										</Text>
									</Flex>
								</Radio>
							</HStack>
						</RadioGroup>
						{errors.gender && (
							<p className="text-red-500 text-xs italic">
								{errors.gender.message}
							</p>
						)}
					</div>

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
						<label className="block text-gray-700 text-sm mb-2">Password</label>
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
						<label className="block text-gray-700 text-sm mb-2">
							Confirm Password
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="password"
							{...register("confirmPassword", {
								required: "This field is required",
								validate: (value) =>
									value === password || "Passwords do not match",
							})}
						/>
						{errors.confirmPassword && (
							<p className="text-red-500 text-xs italic">
								{errors.confirmPassword.message}
							</p>
						)}
					</div>

					<button
						className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
						type="submit"
					>
						Create account
					</button>
					<div className="mt-4">
						<Text fontSize="sm" as="i">
							Already a member?{" "}
							<Link href="/auth/login" className="text-blue-700">
								Log In
							</Link>
						</Text>
					</div>
				</form>
			</GridItem>
		</Grid>
	);
}
