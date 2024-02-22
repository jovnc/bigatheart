"use client";

import {
  Button,
  Flex,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import GeneratePINContent from "./GeneratePINContent";
import { useForm } from "react-hook-form";
import { generateEventPIN } from "@actions/eventActions";
import toast from "react-hot-toast";
import { useState } from "react";

export default function GeneratePINModal({ event }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    formState: { isLoading },
  } = useForm();
  const [pin, setPin] = useState();

  const eventid = event[0].event_id;

  const action = handleSubmit(async (data) => {
    const randomNum = Math.floor(Math.random() * 9000);
    try {
      generateEventPIN(randomNum, eventid);
      setPin(randomNum);
      onOpen();
    } catch (error) {
      toast.error("Failed to Generate PIN");
    }
  });

  return (
    <form action={action}>
      <Button
        type="submit"
        className="border-[2px] border-black hover:text-white hover:bg-black"
        size="xs"
      >
        {isLoading ? <Spinner /> : "Generate Attendance PIN"}
      </Button>

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        children
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <GeneratePINContent pin={pin} />

          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </form>
  );
}
