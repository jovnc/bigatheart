"use client";

import { generateCertificate } from "@actions/certAction";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaDownload } from "react-icons/fa6";

export default function GenerateCertificateButton({ eventid, volunteerid }) {
  const { handleSubmit } = useForm();
  const [pending, setPending] = useState(false);

  const action = handleSubmit(async (data) => {
    try {
      setPending(true);
      const url = await generateCertificate(eventid, volunteerid);
      toast.success("Successfully downloaded certificate");
      setPending(false);
      window.open(url, "_blank");
    } catch (error) {
      toast.error(error.message);
    }
  });

  return (
    <form action={action}>
      <button className="border border-blue-500 px-2 py-1 rounded-lg hover:bg-blue-500 hover:text-white">
        <Flex gap={2}>
          {pending ? (
            <Spinner size="sm" />
          ) : (
            <>
              <FaDownload size={14} />
              <Text fontSize="xs">Certificate</Text>
            </>
          )}
        </Flex>
      </button>
    </form>
  );
}
