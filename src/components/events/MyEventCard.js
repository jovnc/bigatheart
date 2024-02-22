import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Image,
  Text,
  Flex,
} from "@chakra-ui/react";
import ConfirmMyAttendanceButton from "./ConfirmMyAttendanceButton";
import UnregisterEventButton from "./UnregisterEventButton";
import { unregisterEvent, updateMyAttendance } from "@actions/eventActions";
import GenerateCertificateButton from "@components/certificate/GenerateCertificateButton";
import PendingSign from "./PendingSign";
import { CiClock1, CiLocationOn } from "react-icons/ci";

export default function MyEventCard({
  date,
  time,
  location,
  name,
  remarks,
  attended,
  image_url,
  finished,
  eventid,
  volunteerid,
  pin,
}) {
  return (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="elevated"
        mb="5"
        className={
          "bg-stone-50 bg-opacity-50 hover:shadow-lg" +
          (attended && " border-2 border-green-200")
        }
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={
            image_url
              ? image_url
              : "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          }
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

            <Text fontSize="xl" fontWeight="bold">
              {name}
            </Text>

            <Text fontSize="xs" py="2">
              {remarks ? `Remarks: ${remarks}` : "Remarks: NIL"}
            </Text>
          </CardBody>
          <CardFooter>
            <Flex justify="end" className="w-full" gap={2}>
              {finished && attended && (
                <GenerateCertificateButton
                  eventid={eventid}
                  volunteerid={volunteerid}
                />
              )}
              {finished && !attended && <PendingSign />}
              {!finished && !attended && (
                <ConfirmMyAttendanceButton
                  eventid={eventid}
                  volunteerid={volunteerid}
                  updateMyAttendance={updateMyAttendance}
                  pin={pin}
                />
              )}
              {!finished && !attended && (
                <UnregisterEventButton
                  eventid={eventid}
                  volunteerid={volunteerid}
                  unregisterEvent={unregisterEvent}
                />
              )}
            </Flex>
          </CardFooter>
        </Stack>
      </Card>
    </>
  );
}
