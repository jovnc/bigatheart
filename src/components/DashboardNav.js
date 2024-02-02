"use client";

import { Divider, Flex } from "@chakra-ui/react";
import { FiHome, FiCalendar, FiBriefcase, FiSettings } from "react-icons/fi";
import { usePathname } from "next/navigation";
import NavItem from "./NavItem";

import UserProfileNav from "./UserProfileNav";

export default function DashboardNav() {
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
		>
			<Flex p="5%" flexDir="column" w="100%" alignItems="flex-start" as="nav">
				<NavItem icon={FiHome} title="Dashboard" linkTo="/dashboard" />
				<NavItem
					icon={FiCalendar}
					title="New Events"
					linkTo="/dashboard/events"
				/>

				<NavItem
					icon={FiBriefcase}
					title="Manage Events"
					linkTo="/dashboard/manage"
				/>
				<NavItem
					icon={FiSettings}
					title="Settings"
					linkTo="/dashboard/settings"
				/>
			</Flex>

			<Flex p="5%" flexDir="column" w="100%" alignItems="flex-start" mb={4}>
				<Divider display="flex" />
				<UserProfileNav />
			</Flex>
		</Flex>
	);
}
