"use client";

import { adminDeleteEvent } from "@actions/eventActions";
import { Tooltip } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaDeleteLeft } from "react-icons/fa6";

export default function AdminUnregisterEvent({ eventid, volunteerid }) {
  const { handleSubmit } = useForm();

  const action = handleSubmit(async (data) => {
    try {
      const res = await adminDeleteEvent(eventid, volunteerid);
      toast.success("Successfully removed user from event");
    } catch (error) {
      toast.error(error.message);
    }
  });
  return (
    <form action={action}>
      <Tooltip label="Remove user from event">
        <button type="submit">
          <FaDeleteLeft />
        </button>
      </Tooltip>
    </form>
  );
}
