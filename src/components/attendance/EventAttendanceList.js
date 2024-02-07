import {
  AbsoluteCenter,
  Avatar,
  Box,
  Card,
  Divider,
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react";
import VolunteerAttendanceRow from "./VolunteerAttendanceRow";

export default function EventAttendanceList({ event }) {
  const eventTitle = event[0].events.name;
  return (
    <Card className="p-5" mb={5}>
      <Text fontSize="sm" fontWeight="bold">
        {eventTitle}
      </Text>
      <Box position="relative" className="my-4">
        <Divider />
        <AbsoluteCenter bg="white" px="4" fontSize="sm">
          Volunteers
        </AbsoluteCenter>
      </Box>
      {event.map((volunteer, i) => {
        return <VolunteerAttendanceRow key={i} volunteer={volunteer} />;
      })}
    </Card>
  );
}
