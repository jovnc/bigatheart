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
import { useState } from "react";
import Link from "next/link";

export default function DashboardNav() {
	const pathname = usePathname();
	const [navSize, changeNavSize] = useState("large");

	return (
		<Flex
			pos="sticky"
			h="100%"
			boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
			borderRadius={navSize == "small" ? "15px" : "30px"}
			w={navSize == "small" ? "75px" : "90%"}
			flexDir="column"
			justifyContent="space-between"
		>
			<Flex
				p="5%"
				flexDir="column"
				w="100%"
				alignItems={navSize == "small" ? "center" : "flex-start"}
				as="nav"
			>
				<IconButton
					background="none"
					mt={5}
					_hover={{ background: "none" }}
					icon={<FiMenu />}
					onClick={() => {
						if (navSize == "small") changeNavSize("large");
						else changeNavSize("small");
					}}
				/>
				<NavItem
					navSize={navSize}
					icon={FiHome}
					title="Dashboard"
					description="This is the description for the dashboard."
					linkTo="/dashboard"
				/>
				<NavItem
					navSize={navSize}
					icon={FiCalendar}
					title="New Events"
					linkTo="/dashboard/events"
				/>

				<NavItem
					navSize={navSize}
					icon={FiBriefcase}
					title="Manage Events"
					linkTo="/dashboard/manage"
				/>
				<NavItem
					navSize={navSize}
					icon={FiSettings}
					title="Settings"
					linkTo="/dashboard/settings"
				/>
			</Flex>

			<Flex
				p="5%"
				flexDir="column"
				w="100%"
				alignItems={navSize == "small" ? "center" : "flex-start"}
				mb={4}
			>
				<Divider display={navSize == "small" ? "none" : "flex"} />
				<Link href="/dashboard/settings">
					<Flex mt={4} align="center">
						<Avatar size="sm" src="avatar-1.jpg" />
						<Flex
							flexDir="column"
							ml={4}
							display={navSize == "small" ? "none" : "flex"}
						>
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
