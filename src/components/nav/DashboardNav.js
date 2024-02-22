"use client";
import { Divider, Flex } from "@chakra-ui/react";

import UserProfileNav from "./UserProfileNav";

import NavItem from "./NavItem";
import { FiHome, FiCalendar, FiBriefcase, FiSettings } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";

export default function DashboardNav({ displayName, role, avatar, user_id }) {
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
        <NavItem icon={FiHome} title="Dashboard" linkTo="/dashboard" />
        <NavItem
          icon={FiCalendar}
          title="Explore New Events"
          linkTo="/dashboard/events"
        />

        <NavItem
          icon={FiBriefcase}
          title="My Events"
          linkTo="/dashboard/manage"
        />
        <NavItem
          icon={FiSettings}
          title="Settings"
          linkTo="/dashboard/settings"
        />
        {role === "Admin" && (
          <NavItem
            icon={RiAdminLine}
            title="To Admin Dashboard"
            linkTo="/admin"
          />
        )}
      </Flex>

      <Flex p="5%" flexDir="column" w="100%" alignItems="flex-start" mb={4}>
        <Divider display="flex" />
        <UserProfileNav
          displayName={displayName}
          role={role}
          avatar={avatar}
          user_id={user_id}
        />
      </Flex>
    </Flex>
  );
}
