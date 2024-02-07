"use client";

import { Text, useDisclosure } from "@chakra-ui/react";
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
        className="border border-red-500 p-2 mx-5 rounded-lg hover:bg-red-200"
      >
        <IoCloseCircle className="inline mr-1" size={20} />
        <Text className="inline" fontSize="sm" font>
          Unregister
        </Text>
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
