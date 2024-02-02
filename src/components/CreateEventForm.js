"use client";
import { useForm } from "react-hook-form";
import {
	FormErrorMessage,
	FormLabel,
	FormControl,
	Input,
	Button,
} from "@chakra-ui/react";

export default function CreateEventForm() {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm();
	const onSubmit = (data) => console.log(data);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormControl isInvalid={errors.eventName} isRequired>
				<FormLabel htmlFor="eventName">Event Name</FormLabel>
				<Input
					id="eventName"
					placeholder="Event Name"
					{...register("eventName", {
						required: "This is required",
						minLength: { value: 4, message: "Minimum length should be 4" },
					})}
				/>
				<FormErrorMessage>
					{errors.eventName && errors.eventName.message}
				</FormErrorMessage>
			</FormControl>
			<FormControl isInvalid={errors.eventDate} isRequired className="mt-5">
				<FormLabel htmlFor="eventDate">Event Date</FormLabel>
				<Input
					id="eventDate"
					placeholder="Event Date"
					{...register("eventDate", {
						required: "This is required",
					})}
				/>
				<FormErrorMessage>
					{errors.eventDate && errors.eventDate.message}
				</FormErrorMessage>
			</FormControl>
			<Button mt={4} isLoading={isSubmitting} type="submit">
				Submit
			</Button>
		</form>
	);
}
