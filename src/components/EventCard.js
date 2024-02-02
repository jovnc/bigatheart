import {
	Card,
	CardBody,
	CardFooter,
	Heading,
	Stack,
	Image,
	Text,
} from "@chakra-ui/react";
import Link from "next/link";

export default function EventCard() {
	return (
		<>
			<Card
				direction={{ base: "column", sm: "row" }}
				overflow="hidden"
				variant="elevated"
				mb="5"
			>
				<Image
					objectFit="cover"
					maxW={{ base: "100%", sm: "200px" }}
					src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
					alt="Caffe Latte"
				/>

				<Stack>
					<CardBody>
						<Text fontSize="sm" py="2">
							31 January 2024 | 1300-1400h
						</Text>
						<Heading size="lg">The perfect latte</Heading>
						<Text fontSize="sm" py="2">
							123 St Address Here S123456
						</Text>

						<Text py="2">
							Caffè latte is a coffee beverage of Italian origin made with
							espresso and steamed milk.
						</Text>
					</CardBody>

					<CardFooter>
						<Link href="/dashboard/events/1">
							<button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
								View Event
							</button>
						</Link>
					</CardFooter>
				</Stack>
			</Card>
		</>
	);
}
