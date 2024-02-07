"use client";
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { convertDateFormat, convertToAMPM } from "@utils/helpers";

import { CiClock1, CiLocationOn } from "react-icons/ci";
import { BiArrowBack, BiCategory, BiHome, BiHourglass } from "react-icons/bi";
import Link from "next/link";
import EventRegistrationForm from "./EventRegistrationForm";

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
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="shadow-md p-8 rounded-lg min-h-full bg-stone-50 bg-opacity-50">
      <Flex className="mb-5" justify="space-between">
        <Box>
          <Button size="sm">
            <Link href="/dashboard/events">
              <BiArrowBack className="inline scale-150 mr-2" />
              <Text className="inline" fontSize="sm">
                Back
              </Text>
            </Link>
          </Button>
        </Box>
        <Box>
          <Button
            size="sm"
            className="border border-slate-400 font-medium"
            onClick={onOpen}
          >
            Register Now!
          </Button>

          <EventRegistrationForm
            isOpen={isOpen}
            onClose={onClose}
            name={name}
            id={id}
            datetime={`${convertDateFormat(date)} ${convertToAMPM(time)}`}
            duration={duration}
          />
        </Box>
      </Flex>

      <Flex className="mb-5" justify="space-between">
        <Flex gap={2}>
          <CiClock1 className="mt-1" />
          <Text fontSize="sm">
            {convertDateFormat(date)} {convertToAMPM(time)}
          </Text>
        </Flex>
        <Flex gap={2}>
          <BiHourglass className="mt-1" />
          <Text fontSize="sm">{duration} minutes</Text>
        </Flex>
      </Flex>

      <Flex className="mb-5" justify="space-between">
        <Flex gap={2}>
          <BiHome className="mt-1" />
          <Text fontSize="sm">
            <span className="font-semibold">Organiser: </span>
            {organiser}
          </Text>
        </Flex>
        <Flex gap={2}>
          <BiCategory className="mt-1" />
          <Text fontSize="sm">
            <span className="font-semibold">Category: </span>
            {category}
          </Text>
        </Flex>
      </Flex>

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

      <Button
        onClick={onOpen}
        className="w-full mt-10 font-medium font-size text-sm border border-slate-500"
      >
        Register Now!
      </Button>
    </div>
  );
}
