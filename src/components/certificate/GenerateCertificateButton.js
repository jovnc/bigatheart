"use client";

import { generateCertificate } from "@actions/certAction";
import { Flex, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaDownload } from "react-icons/fa6";

export default function GenerateCertificateButton({ eventid, volunteerid }) {
  const { handleSubmit } = useForm();

  const action = handleSubmit(async (data) => {
    try {
      const url = await generateCertificate(eventid, volunteerid);
      window.open(url, "_blank");
      toast.success("Successfully downloaded certificate");
    } catch (error) {
      toast.error(error.message);
    }
  });

  return (
    <form action={action}>
      <button className="border border-blue-400 px-2 py-1 rounded-lg hover:bg-blue-300">
        <Flex gap={2}>
          <FaDownload size={14} />
          <Text fontSize="sm">Certificate</Text>
        </Flex>
      </button>
    </form>
  );
}
