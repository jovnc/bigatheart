import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Image,
  Text,
  Divider,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";
import { CiClock1, CiLocationOn } from "react-icons/ci";

export default function EventCard({
  date,
  time,
  location,
  name,
  id,
  image_url,
  hasEnded,
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
          <CardBody>
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
            <Text fontSize="lg" fontWeight="bold">
              {name}
            </Text>
          </CardBody>
          <Divider />
          <CardFooter>
            <Flex className="w-full" justify="flex-end">
              {!hasEnded && (
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
              )}
              {hasEnded && (
                <button
                  className="cursor-not-allowed bg-red-400 text-white w-1/2 px-2 py-1 rounded-lg"
                  size="sm"
                >
                  <Text fontSize="sm" fontWeight="semibold">
                    Event Registration Closed
                  </Text>
                </button>
              )}
            </Flex>
          </CardFooter>
        </Stack>
      </Card>
    </>
  );
}
