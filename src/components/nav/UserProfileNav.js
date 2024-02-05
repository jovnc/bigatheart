"use client";
import { Avatar, Flex, Spinner, Text } from "@chakra-ui/react";
import { useUser } from "@hooks/useUser";

import Link from "next/link";

export default function UserProfileNav() {
  const { displayName, role, isLoading, avatar } = useUser();

  if (isLoading) return <Spinner />;

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
