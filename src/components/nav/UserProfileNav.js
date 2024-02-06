"use client";
import { Avatar, Flex, Text } from "@chakra-ui/react";

import Link from "next/link";

export default function UserProfileNav({ displayName, role, avatar }) {
  return (
    <Link href={role === "Admin" ? "/admin/settings" : "/dashboard/settings"}>
      <Flex mt={4} align="center">
        <Avatar
          size="sm"
          src={avatar}
          alt="profile photo"
          className="avatar_logo"
        />
        <Flex flexDir="column" ml={4} display="flex">
          <Text size="md">{displayName}</Text>
          <Text color="gray" fontSize="sm">
            {role}
          </Text>
        </Flex>
      </Flex>
    </Link>
  );
}
