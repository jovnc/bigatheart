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

export default function CarouselEventCard({
  date,
  time,
  location,
  name,
  image_url,
}) {
  return (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        height="300px"
        overflow="hidden"
        variant="elevated"
        mb="10"
        className="hover:shadow-lg bg-stone-50 bg-opacity-50 mr-5"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "50%", sm: "150px" }}
          src={image_url}
          alt="Poster"
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
              <button
                className="border border-slate-800 hover:bg-slate-800 hover:text-white w-1/2 px-2 py-1 rounded-lg"
                size="sm"
              >
                <Link href={`/auth/login`}>
                  <Text fontSize="sm" fontWeight="semibold">
                    View
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
