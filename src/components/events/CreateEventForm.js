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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { createEventAction } from "@actions/eventActions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEdgeStore } from "@context/EdgeStoreContext";

export default function CreateEventForm() {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  const EVENT_CATEGORIES = [
    "Environment",
    "Tutoring",
    "Mental Health",
    "Migrant Workers",
    "Children",
    "Elderly Care",
    "Special Needs",
    "Underprivileged",
    "Food",
  ];

  const action = handleSubmit(async (data) => {
    try {
      if (!data) return;

      const {
        eventCategory,
        eventDate,
        eventDescription,
        eventName,
        eventTime,
        organiser,
        eventLocation,
        peopleImpacted,
        eventDuration,
      } = data;

      let url = "";

      // check if uploaded file is an image
      for (const file of data.image) {
        if (!file.type.startsWith("image")) {
          setError("image", {
            type: "manual",
            message: "Only image files (png, jpeg, jpg) are allowed",
          });
          return;
        }

        // upload file to edgestore
        const res = await edgestore.publicImages.upload({
          file,
        });

        // get url of the image
        url = res.url;
      }

      const res = await createEventAction({
        eventCategory,
        eventDate,
        eventDescription,
        eventName,
        eventTime,
        organiser,
        eventLocation,
        url,
        peopleImpacted,
        eventDuration,
      });

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

      <FormControl isInvalid={errors.eventLocation} isRequired className="mt-4">
        <FormLabel htmlFor="eventName">Location</FormLabel>
        <Input
          id="eventLocation"
          placeholder="Location"
          {...register("eventLocation", {
            required: "This is required",
            minLength: { value: 4, message: "Minimum length should be 4" },
          })}
        />
        <FormErrorMessage>
          {errors.eventLocation && errors.eventLocation.message}
        </FormErrorMessage>
      </FormControl>

      <Grid templateColumns="1fr 1fr" gap={8}>
        <FormControl
          isInvalid={errors.eventDuration}
          isRequired
          className="mt-5"
        >
          <FormLabel htmlFor="eventDuration">Event Duration (min)</FormLabel>

          <NumberInput defaultValue={0}>
            <NumberInputField
              id="eventDuration"
              step={1}
              {...register("eventDuration", {
                required: "This is required",
                pattern: {
                  value: /^\d+$/,
                  message: "Please enter a valid integer.",
                },
              })}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>

          <FormErrorMessage>
            {errors.eventDuration && errors.eventDuration.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={errors.peopleImpacted}
          isRequired
          className="mt-5"
        >
          <FormLabel htmlFor="peopleImpacted"># People Impacted</FormLabel>
          <NumberInput defaultValue={0}>
            <NumberInputField
              id="peopleImpacted"
              step={1}
              {...register("peopleImpacted", {
                required: "This is required",
                pattern: {
                  value: /^\d+$/,
                  message: "Please enter a valid integer.",
                },
              })}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>

          <FormErrorMessage>
            {errors.peopleImpacted && errors.peopleImpacted.message}
          </FormErrorMessage>
        </FormControl>
      </Grid>

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
          {EVENT_CATEGORIES.map((category, i) => {
            return (
              <option key={i} value={category}>
                {category}
              </option>
            );
          })}
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
          {...register("eventDescription")}
          size="sm"
        />

        <FormErrorMessage>
          {errors.eventDescription && errors.eventDescription.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.image} className="mt-5" isRequired>
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
      </FormControl>

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
