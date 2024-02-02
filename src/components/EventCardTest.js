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

export default function EventCardTest({
	date,
	time,
	location,
	name,
	description,
}) {
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
							{date} | {time}
						</Text>
						<Heading size="lg">{name}</Heading>
						<Text fontSize="sm" py="2">
							{location}
						</Text>

						<Text py="2">{description}</Text>
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
