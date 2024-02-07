"use client";
import { Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import ConfirmMyAttendance from "./ConfirmMyAttendance";
import { FcCheckmark } from "react-icons/fc";

export default function ConfirmMyAttendanceButton({
  eventid,
  volunteerid,
  updateMyAttendance,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <button
        onClick={onOpen}
        className="border border-green-500 p-2 rounded-lg hover:bg-green-200"
      >
        <FcCheckmark size={20} className="inline mr-1" />
        <Text fontSize="sm" className="inline">
          Confirm Attendance
        </Text>
      </button>
      <ConfirmMyAttendance
        isOpen={isOpen}
        onClose={onClose}
        eventid={eventid}
        volunteerid={volunteerid}
        updateMyAttendance={updateMyAttendance}
      />
    </>
  );
}
