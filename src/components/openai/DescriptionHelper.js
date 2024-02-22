"use client";
import { sendMessageToOpenAI } from "@actions/openai";
import {
  Box,
  Divider,
  Flex,
  Image,
  Spinner,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowUpRightFromSquare, FaCopy } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";

export default function DescriptionHelper({ setValue, onClose }) {
  const { register, handleSubmit, reset } = useForm();
  const [output, setOutput] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const action = handleSubmit(async (data) => {
    setIsSubmitting(true);
    const res = await sendMessageToOpenAI(data.query);
    setOutput((out) => [
      ...out,
      { message: res.message.content, user_input: data.query },
    ]);
    reset();
    setIsSubmitting(false);
  });

  return (
    <Flex pt={8} flexDir="column" gap={8} className="w-full p-8 h-[700px]">
      <Box className="w-full flex">
        <Text className="mx-auto" fontWeight="bold" fontSize="xl">
          Poster Description Helper
        </Text>
      </Box>
      <Divider />

      <Flex className="overflow-auto" flexDir="column">
        {output.length == 0 && (
          <Flex flexDir="column" gap={3}>
            <Text textAlign="center">
              Welcome to the Poster Description Helper powered by ChatGPT
              Turbo-3.5! Please provide the chatbot with details about the
              event: such as what the event is about, category, date, time, etc.
            </Text>
            <Text textAlign="center">
              You can copy your desired event description to your clipboard by
              clicking the <FaCopy className="inline mx-2" /> icon{" "}
            </Text>
            <Text textAlign="center">
              You can directly copy it to the event description input field by
              clicking on the{" "}
              <FaArrowUpRightFromSquare className="inline mx-2" /> icon
            </Text>
          </Flex>
        )}
        {output &&
          output.map((out) => {
            return (
              <Flex flexDir="column" gap={4} mt={2}>
                <Text fontWeight="bold">User</Text>
                <Text>{out.user_input}</Text>

                <Divider />

                <Flex gap={8} justify="space-between">
                  <Text fontWeight="bold">ChatGPT</Text>
                  <Flex gap={4}>
                    <Tooltip label="Copy to Clipboard">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(out.message);
                          toast({
                            position: "top",
                            description: "Copied to Clipboard",
                            colorScheme: "green",
                          });
                        }}
                      >
                        <FaCopy />
                      </button>
                    </Tooltip>
                    <Tooltip label="Output to Input Field">
                      <button
                        onClick={() => {
                          setValue("eventDescription", out.message);
                          toast({
                            position: "top",
                            description: "Added to Event Description",
                            colorScheme: "green",
                          });
                          onClose();
                        }}
                      >
                        <FaArrowUpRightFromSquare />
                      </button>
                    </Tooltip>
                  </Flex>
                </Flex>
                <Text>{out.message}</Text>
                <Divider />
              </Flex>
            );
          })}
      </Flex>

      <Box className="mt-auto w-full">
        <form action={action}>
          <Image
            src="/assets/images/openaibadge.svg"
            pb={3}
            h={10}
            className="opacity-70 mx-auto"
          />
          <Flex
            className="w-100 w-full border-[0.5px] border-black p-1 rounded-md"
            justify="space-between"
          >
            <input
              type="text"
              placeholder="Message ChatGPT..."
              className="w-full"
              {...register("query")}
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Spinner /> : <IoMdSend />}
            </button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
}
