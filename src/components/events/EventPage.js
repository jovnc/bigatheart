import { Button, Image, Text } from "@chakra-ui/react";
import { convertDateFormat, convertToAMPM } from "@utils/helpers";

import { CiClock1, CiHome, CiLocationOn } from "react-icons/ci";
import { BiCategory, BiHome } from "react-icons/bi";
import Link from "next/link";

export default function EventPage({
	name,
	category,
	organiser,
	date,
	time,
	description,
	location,
	id,
}) {
	return (
		<div className="shadow-md p-8 rounded-lg min-h-full">
			<div className="mb-5">
				<CiClock1 className="inline scale-150 mr-2" />
				<Text className="inline" fontSize="sm">
					{convertDateFormat(date)} {convertToAMPM(time)}
				</Text>

				<Text className="float-right" fontSize="sm">
					{location}
				</Text>
				<CiLocationOn className="inline scale-150 mr-2 mt-1 float-right" />
			</div>
			<div className="mb-5">
				<BiHome className="inline scale-150 mr-2" />
				<Text className="inline" fontSize="sm">
					{organiser}
				</Text>

				<Text className="float-right" fontSize="sm">
					{category}
				</Text>
				<BiCategory className="inline scale-150 mr-2 mt-1 float-right" />
			</div>

			<Text textAlign="center" fontWeight="bold" fontSize="lg">
				{name}
			</Text>

			<Image
				src="/assets/images/poster4.jpeg"
				alt="poster"
				className="rounded-lg pt-5"
			/>

			{/* <Text className="mt-5" fontSize="md">
				Event Description
			</Text> */}

			<Text textAlign="left" fontSize="md" className="mt-4">
				{description}
			</Text>

			<Button className="w-full mt-4 red_outline_btn">
				<Link href={`/dashboard/event/${id}`}>Register Now!</Link>
			</Button>
		</div>
	);
}
