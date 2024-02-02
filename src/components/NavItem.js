import { Flex, Text, Icon, Link, Menu, MenuButton } from "@chakra-ui/react";

export default function NavItem({ icon, title, active, linkTo }) {
	return (
		<Flex mt={30} flexDir="column" w="100%" alignItems="flex-start">
			<Menu placement="right">
				<Link
					backgroundColor={active && "#FFB6C1"}
					p={3}
					borderRadius={8}
					_hover={{ textDecor: "none", backgroundColor: "#FFB6C1" }}
					w="100%"
					href={linkTo}
				>
					<MenuButton w="100%">
						<Flex>
							<Icon
								as={icon}
								fontSize="xl"
								color={active ? "#82AAAD" : "gray.500"}
							/>
							<Text ml={3}>{title}</Text>
						</Flex>
					</MenuButton>
				</Link>
			</Menu>
		</Flex>
	);
}
