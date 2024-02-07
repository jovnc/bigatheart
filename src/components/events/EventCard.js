import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Image,
  Text,
  Button,
  Divider,
} from "@chakra-ui/react";
import Link from "next/link";

export default function EventCard({
  date,
  time,
  location,
  name,
  description,
  id,
  image_url,
}) {
  return (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="elevated"
        mb="5"
        className="hover:bg-red-100 hover:bg-opacity-40 bg-stone-50 bg-opacity-50"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={
            image_url
              ? image_url
              : "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          }
          alt="Caffe Latte"
        />

        <Stack className="w-full">
          <CardBody>
            <Text fontSize="xs" py="2">
              {date} | {time}
            </Text>
            <Text fontSize="xl" fontWeight="bold">
              {name}
            </Text>
            <Text fontSize="xs" py="2">
              Location: {location}
            </Text>
          </CardBody>
          <Divider />
          <CardFooter>
            <Button
              className="border border-red-500 hover:bg-red-400 w-full"
              size="sm"
            >
              <Link href={`/dashboard/events/${id}`}>View Event</Link>
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </>
  );
}
