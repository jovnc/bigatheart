import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Image,
  Text,
  Divider,
  Flex,
  Tooltip,
} from "@chakra-ui/react";
import Link from "next/link";
import { BiCategory, BiError } from "react-icons/bi";
import { CiClock1, CiLocationOn } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

export default function EventCard({
  date,
  time,
  location,
  name,
  id,
  image_url,
  hasEnded,
  recommended,
  category,
  description,
}) {
  return (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="elevated"
        mb="5"
        className={`hover:shadow-lg bg-stone-50 bg-opacity-50 ${
          hasEnded && "border-[0.5px] border-red-400 opacity-70"
        }`}
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={image_url}
          alt="Caffe Latte"
        />

        <Stack className="w-full">
          <CardBody className="flex-column">
            <Flex pb={4} className="w-full">
              {recommended && (
                <Tooltip label="Recommended based on your interests">
                  <Flex
                    gap={2}
                    className="bg-rose-400 p-1 bg-opacity-70 rounded-md shadow-md text-white w-full"
                  >
                    <FaStar className="mt-1" />
                    <Text fontWeight="bold">Recommended</Text>
                  </Flex>
                </Tooltip>
              )}
              {hasEnded && (
                <Flex
                  gap={2}
                  className="bg-red-400 p-1 bg-opacity-70 rounded-md shadow-md text-white w-full"
                >
                  <BiError className="mt-1" />
                  <Text fontWeight="bold">Event has Ended</Text>
                </Flex>
              )}
            </Flex>
            <Flex justify="space-between">
              <Flex gap={1} pb={2}>
                <CiClock1 />
                <Text fontSize="xs">
                  {date} | {time}
                </Text>
              </Flex>
              <Flex gap={1} pb={2}>
                <CiLocationOn />
                <Text fontSize="xs">Location: {location}</Text>
              </Flex>
            </Flex>
            <Flex justify="space-between">
              <Text fontSize="lg" fontWeight="bold">
                {name}
              </Text>
              <Flex gap={2} className=" p-1 rounded-lg">
                <Text fontSize="sm" fontWeight="medium">
                  <BiCategory className="mr-1 inline" />
                  {category}
                </Text>
              </Flex>
            </Flex>
            <Flex pt={4}>
              <Text fontSize="sm" className="line-clamp-1">
                {description}
              </Text>
            </Flex>
          </CardBody>
          <Divider />
          <CardFooter>
            <Flex className="w-full" justify="flex-end">
              <button
                className="border border-slate-800 hover:bg-slate-800 hover:text-white w-1/2 px-2 py-1 rounded-lg"
                size="sm"
              >
                <Link href={`/dashboard/events/${id}`}>
                  <Text fontSize="sm" fontWeight="semibold">
                    View Event Details
                  </Text>
                </Link>
              </button>
            </Flex>
          </CardFooter>
        </Stack>
      </Card>
    </>
  );
}
