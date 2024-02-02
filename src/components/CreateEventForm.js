"use client";
import { useForm } from "react-hook-form";
import {
	FormErrorMessage,
	FormLabel,
	FormControl,
	Input,
	Button,
	Grid,
	Textarea,
	Select,
} from "@chakra-ui/react";
import { createEventAction } from "@actions/eventActions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CreateEventForm() {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm();
	const router = useRouter();

	const action = handleSubmit(async (data) => {
		try {
			const res = await createEventAction(data);
			console.log(res);
			toast.success("Successfully created event");
			router.push("/dashboard/events");
		} catch (error) {
			toast.error(error.message);
		}
	});

	return (
		<form action={action}>
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

			<FormControl isInvalid={errors.organiser} isRequired className="mt-5">
				<FormLabel htmlFor="organiser">Organiser</FormLabel>
				<Input
					id="organiser"
					placeholder="Organiser"
					{...register("organiser", {
						required: "This is required",
						minLength: { value: 4, message: "Minimum length should be 4" },
					})}
				/>
				<FormErrorMessage>
					{errors.organiser && errors.organiser.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={errors.eventCategory} isRequired className="mt-5">
				<FormLabel htmlFor="eventCategory">Event Category</FormLabel>
				<Select
					placeholder="Select option"
					{...register("eventCategory", {
						required: "This is required",
						minLength: { value: 4, message: "Minimum length should be 4" },
					})}
				>
					{/* TODO: fetch options from database*/}
					<option value="Tutoring">Tutoring</option>
					<option value="Environment">Environment</option>
					<option value="Elderly Care">Elderly Care</option>
				</Select>

				<FormErrorMessage>
					{errors.eventCategory && errors.eventCategory.message}
				</FormErrorMessage>
			</FormControl>

			<Grid templateColumns="1fr 1fr" gap={8}>
				<FormControl isInvalid={errors.eventDate} isRequired className="mt-5">
					<FormLabel htmlFor="eventDate">Event Date</FormLabel>
					<Input
						id="eventDate"
						placeholder="Event Date"
						type="date"
						{...register("eventDate", {
							required: "This is required",
						})}
					/>
					<FormErrorMessage>
						{errors.eventDate && errors.eventDate.message}
					</FormErrorMessage>
				</FormControl>

				<FormControl isInvalid={errors.eventTime} isRequired className="mt-5">
					<FormLabel htmlFor="eventTime">Event Time</FormLabel>
					<Input
						id="eventTime"
						placeholder="Event Time"
						type="time"
						{...register("eventTime", {
							required: "This is required",
						})}
					/>
					<FormErrorMessage>
						{errors.eventTime && errors.eventTime.message}
					</FormErrorMessage>
				</FormControl>
			</Grid>

			<FormControl isInvalid={errors.eventDescription} className="mt-5">
				<FormLabel htmlFor="eventDescription">Event Description</FormLabel>
				<Textarea
					id="eventDescription"
					placeholder="Event Description"
					{...register("eventDescription", {
						required: "This is required",
					})}
				/>

				<FormErrorMessage>
					{errors.eventDescription && errors.eventDescription.message}
				</FormErrorMessage>
			</FormControl>

			{/* <FormControl isInvalid={errors.image} className="mt-5">
				<FormLabel htmlFor="image">Image</FormLabel>
				<Input
					id="image"
					placeholder="Image"
					type="file"
					{...register("image", {
						required: "This is required",
					})}
				/>
				<FormErrorMessage>
					{errors.image && errors.image.message}
				</FormErrorMessage>
			</FormControl> */}

			<Grid templateColumns="1fr 1fr" gap={8}>
				<Button mt={8} isLoading={isSubmitting} className="red_outline_btn">
					Preview
				</Button>
				<Button
					mt={8}
					isLoading={isSubmitting}
					type="submit"
					className="red_btn"
				>
					Submit
				</Button>
			</Grid>
		</form>
	);
}
