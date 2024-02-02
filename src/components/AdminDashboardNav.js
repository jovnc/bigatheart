"use client";

import {
	Avatar,
	Divider,
	Flex,
	Heading,
	IconButton,
	Text,
} from "@chakra-ui/react";
import {
	FiMenu,
	FiHome,
	FiCalendar,
	FiBriefcase,
	FiSettings,
} from "react-icons/fi";
import { usePathname } from "next/navigation";
import NavItem from "./NavItem";

import Link from "next/link";

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
		>
			<Flex p="5%" flexDir="column" w="100%" alignItems="flex-start" as="nav">
				<NavItem icon={FiHome} title="Admin Dashboard" linkTo="/admin" />
				<NavItem icon={FiCalendar} title="New Events" linkTo="/admin/events" />

				<NavItem
					icon={FiBriefcase}
					title="Create Event"
					linkTo="/admin/create"
				/>
				<NavItem icon={FiSettings} title="Settings" linkTo="/admin/settings" />
			</Flex>

			<Flex p="5%" flexDir="column" w="100%" alignItems="flex-start" mb={4}>
				<Divider display="flex" />
				<Link href="/admin/settings">
					<Flex mt={4} align="center">
						<Avatar size="sm" src="avatar-1.jpg" />
						<Flex flexDir="column" ml={4} display="flex">
							<Heading as="h3" size="sm">
								Username
							</Heading>
							<Text color="gray">Volunteer</Text>
						</Flex>
					</Flex>
				</Link>
			</Flex>
		</Flex>
	);
}
