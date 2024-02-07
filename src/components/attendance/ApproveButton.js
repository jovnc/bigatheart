"use client";
import { approveEvent } from "@actions/eventActions";
import { Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ApproveButton({ event_id, volunteer_id }) {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const action = handleSubmit(async (data) => {
    try {
      console.log("test");
      const { error } = await approveEvent(event_id, volunteer_id);
      toast.success("Successfully updated event");
    } catch (error) {
      toast.error(error.message);
    }
  });

  return (
    <form action={action}>
      <button
        className="border-2 border-green-300 hover:bg-green-300 px-2 py-1 rounded-lg"
        type="submit"
      >
        <Text fontSize="sm">Approve</Text>
      </button>
    </form>
  );
}
