"use client";

import { Flex, Text } from "@chakra-ui/react";

export default function GeneratePINContent({ pin }) {
  return (
    <Flex flexDir="column" className="w-full p-5" gap={8}>
      <Text>
        Show the Attendance PIN to volunteers to allow them to mark their
        attendance
      </Text>
      <Text fontWeight="bold" fontSize="2xl" textAlign="center">
        {pin}
      </Text>
    </Flex>
  );
}
