import { Avatar, Box, Flex, Spacer, Text } from "@chakra-ui/react";
import ApproveButton from "./ApproveButton";

export default function VolunteerAttendanceRow({ volunteer }) {
  const {
    volunteer_id,
    event_id,
    reflection,
    users: { last_name, first_name, avatar },
  } = volunteer;
  return (
    <Flex>
      <Box p="4">
        <Flex gap={4}>
          <Box pr={3}>
            <Avatar size="sm" src={avatar} />
          </Box>

          <Box>
            <Text fontSize="sm">{`${first_name} ${last_name}`}</Text>
          </Box>
          <Text fontSize="sm">{reflection}</Text>
        </Flex>
      </Box>
      <Spacer />
      <Box p="4">
        <ApproveButton volunteer_id={volunteer_id} event_id={event_id} />
      </Box>
    </Flex>
  );
}
