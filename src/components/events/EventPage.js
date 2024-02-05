import { Button, Image, Text } from "@chakra-ui/react";
import { convertDateFormat, convertToAMPM } from "@utils/helpers";

import { CiClock1, CiLocationOn } from "react-icons/ci";
import { BiArrowBack, BiCategory, BiHome, BiHourglass } from "react-icons/bi";
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
  imageUrl,
  duration,
}) {
  return (
    <div className="shadow-md p-8 rounded-lg min-h-full bg-stone-50 bg-opacity-50">
      <div className="mb-5">
        <Button size="sm">
          <Link href="/dashboard/events">
            <BiArrowBack className="inline scale-150 mr-2" />
            <Text className="inline" fontSize="sm">
              Back
            </Text>
          </Link>
        </Button>
      </div>
      <div className="mb-5">
        <CiClock1 className="inline scale-150 mr-2" />
        <Text className="inline" fontSize="sm">
          {convertDateFormat(date)} {convertToAMPM(time)}
        </Text>

        <Text className="float-right" fontSize="sm">
          {duration} minutes
        </Text>
        <BiHourglass className="inline scale-150 mr-2 mt-1 float-right" />
      </div>
      <div className="mb-5">
        <BiHome className="inline scale-150 mr-2" />
        <Text className="inline" fontSize="sm">
          <span className="font-semibold">Organiser: </span>
          {organiser}
        </Text>

        <Text className="float-right" fontSize="sm">
          <span className="font-semibold">Category: </span>
          {category}
        </Text>
        <BiCategory className="inline scale-150 mr-2 mt-1 float-right" />
      </div>

      <Text textAlign="center" fontWeight="bold" fontSize="lg">
        {name}
      </Text>

      <Image
        src={imageUrl ? imageUrl : "/assets/images/poster4.jpeg"}
        alt="poster"
        className="rounded-lg pt-5"
      />

      <Text textAlign="left" fontSize="sm" className="mt-4">
        <CiLocationOn className="inline scale-150 mr-2" />
        <span className="font-semibold">Location:</span> {location}
      </Text>

      <Text textAlign="left" fontSize="sm" className="mt-4">
        {description}
      </Text>

      <Button className="w-full mt-10 font-medium font-size text-sm bg-gray-300 hover:bg-gray-400 hover:font-bold">
        <Link href={`/dashboard/event/${id}`}>Register Now!</Link>
      </Button>
    </div>
  );
}
