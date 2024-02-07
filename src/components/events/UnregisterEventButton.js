"use client";

import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import UnregisterEventConfirm from "./UnregisterEventConfirm";
import { IoClose, IoCloseCircle } from "react-icons/io5";

export default function UnregisterEventButton({
  volunteerid,
  eventid,
  unregisterEvent,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <button
        onClick={onOpen}
        className="border border-red-500 px-2 py-1 rounded-lg hover:bg-red-300"
      >
        <Flex gap="2">
          <IoCloseCircle size={14} />
          <Text fontSize="xs">Unregister</Text>
        </Flex>
      </button>
      <UnregisterEventConfirm
        isOpen={isOpen}
        onClose={onClose}
        eventid={eventid}
        volunteerid={volunteerid}
        unregisterEvent={unregisterEvent}
      />
    </>
  );
}
