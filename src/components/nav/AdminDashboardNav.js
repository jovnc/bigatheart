"use client";

import { Divider, Flex } from "@chakra-ui/react";
import {
  FiMenu,
  FiHome,
  FiCalendar,
  FiBriefcase,
  FiSettings,
} from "react-icons/fi";
import { usePathname } from "next/navigation";
import NavItem from "./NavItem";

import UserProfileNav from "./UserProfileNav";

export default function AdminDashboardNav() {
  const pathname = usePathname();

  return (
    <Flex
      pos="sticky"
      h="700px"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius="30px"
      w="90%"
      flexDir="column"
      justifyContent="space-between"
      className="bg-stone-50 bg-opacity-50"
    >
      <Flex p="5%" flexDir="column" w="100%" alignItems="flex-start" as="nav">
        <NavItem icon={FiHome} title="Admin Dashboard" linkTo="/admin" />
        <NavItem
          icon={FiCalendar}
          title="Manage Events"
          linkTo="/admin/manage"
        />

        <NavItem
          icon={FiBriefcase}
          title="Create Event"
          linkTo="/admin/create"
        />
        <NavItem icon={FiSettings} title="Settings" linkTo="/admin/settings" />
      </Flex>

      <Flex p="5%" flexDir="column" w="100%" alignItems="flex-start" mb={4}>
        <Divider display="flex" />
        <UserProfileNav />
      </Flex>
    </Flex>
  );
}
