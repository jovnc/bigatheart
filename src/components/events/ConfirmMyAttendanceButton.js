"use client";
import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import ConfirmMyAttendance from "./ConfirmMyAttendance";
import { FcCheckmark } from "react-icons/fc";

export default function ConfirmMyAttendanceButton({
  eventid,
  volunteerid,
  updateMyAttendance,
  pin,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <button
        onClick={onOpen}
        className="border border-green-500 px-2 py-1 rounded-lg hover:bg-green-500 hover:text-white"
      >
        <Flex gap={2}>
          <FcCheckmark size={14} />
          <Text fontSize="xs">Attend</Text>
        </Flex>
      </button>
      <ConfirmMyAttendance
        isOpen={isOpen}
        onClose={onClose}
        eventid={eventid}
        volunteerid={volunteerid}
        updateMyAttendance={updateMyAttendance}
        pin={pin}
      />
    </>
  );
}
