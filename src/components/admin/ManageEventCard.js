"use client";
import { Divider, Flex, Grid, Text } from "@chakra-ui/react";
import VolunteerRow from "./VolunteerRow";
import { FaCalendarAlt } from "react-icons/fa";
import { useState } from "react";
import { convertDateFormat, convertToAMPM } from "@utils/helpers";
import { FcApproval, FcClock, FcHighPriority } from "react-icons/fc";
import GeneratePINModal from "./GeneratePINModal";

export default function ManageEventCard({ eventName, event }) {
  const [show, setShow] = useState();

  function handleClick() {
    setShow((curr) => !curr);
  }

  const isFull = event.length >= event[0].events.capacity;

  return (
    <div className="w-full bg-stone-100 bg-opacity-50 rounded-lg shadow-lg p-5">
      <Flex flexDir="column" gap={2}>
        <Flex gap={2} justify="space-between">
          <Flex gap={2}>
            <FaCalendarAlt />
            <Text fontWeight="semibold">{eventName}</Text>
          </Flex>
          <button onClick={handleClick}>
            <Text fontSize="sm">{show ? "Hide" : "Show"}</Text>
          </button>
        </Flex>
        <Flex gap={2}>
          <FcClock />
          <Text fontSize="xs">
            {convertDateFormat(event[0].events.date)}{" "}
            {convertToAMPM(event[0].events.time)}
          </Text>
        </Flex>
        <Flex gap={2} justify="space-between">
          <Flex gap={2}>
            {isFull ? <FcHighPriority /> : <FcApproval />}
            <Text fontSize="xs">
              Capacity: {event.length} / {event[0].events.capacity}
            </Text>
          </Flex>
          <GeneratePINModal event={event} />
        </Flex>

        {show && (
          <>
            <Divider />
            <Grid templateColumns="1fr 1fr 0.5fr 0.5fr 0.25fr">
              <Text fontSize="sm" fontWeight="bold">
                Name
              </Text>
              <Text fontSize="sm" fontWeight="bold">
                Remarks
              </Text>
              <Text fontSize="sm" fontWeight="bold">
                Attended
              </Text>
              <Text fontSize="sm" fontWeight="bold">
                Approved
              </Text>
            </Grid>
            {event.map((volunteer, i) => {
              return <VolunteerRow key={i} volunteer={volunteer} />;
            })}
          </>
        )}
      </Flex>
    </div>
  );
}
