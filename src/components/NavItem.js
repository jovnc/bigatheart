import { Flex, Text, Icon, Link, Menu, MenuButton } from "@chakra-ui/react";

export default function NavItem({ icon, title, active, navSize, linkTo }) {
	return (
		<Flex
			mt={30}
			flexDir="column"
			w="100%"
			alignItems={navSize == "small" ? "center" : "flex-start"}
		>
			<Menu placement="right">
				<Link
					backgroundColor={active && "#FFB6C1"}
					p={3}
					borderRadius={8}
					_hover={{ textDecor: "none", backgroundColor: "#FFB6C1" }}
					w={navSize == "large" && "100%"}
					href={linkTo}
				>
					<MenuButton w="100%">
						<Flex>
							<Icon
								as={icon}
								fontSize="xl"
								color={active ? "#82AAAD" : "gray.500"}
							/>
							<Text ml={5} display={navSize == "small" ? "none" : "flex"}>
								{title}
							</Text>
						</Flex>
					</MenuButton>
				</Link>
			</Menu>
		</Flex>
	);
}
