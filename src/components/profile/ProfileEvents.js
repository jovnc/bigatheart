"use client";

import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { FcCancel, FcCheckmark } from "react-icons/fc";

export default function ProfileEvents({ userProfile }) {
  if (userProfile.eventinfo.length == 0) {
    return <Text>User has not participated or registered for any event</Text>;
  }

  return (
    <Flex flexDir="column" gap={4}>
      <Grid templateColumns="2fr 1fr 0.5fr 0.5fr" gap={4}>
        <Text fontSize="sm" fontWeight="bold">
          Event
        </Text>
        <Text fontSize="sm" fontWeight="bold">
          Date
        </Text>
        <Text fontSize="sm" fontWeight="bold">
          Finished
        </Text>
        <Text fontSize="sm" fontWeight="bold">
          Attended
        </Text>
      </Grid>
      {userProfile.eventinfo.map((event) => {
        return (
          <Grid templateColumns="2fr 1fr 0.5fr 0.5fr" gap={4}>
            <Text fontSize="sm">{event.events.name}</Text>
            <Text fontSize="sm">{event.events.date}</Text>
            <Box>{event.finished ? <FcCheckmark /> : <FcCancel />}</Box>
            <Box>{event.attended ? <FcCheckmark /> : <FcCancel />}</Box>
          </Grid>
        );
      })}
    </Flex>
  );
}
