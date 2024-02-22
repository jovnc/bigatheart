import { Card, CardBody, CardFooter, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function TodayEventCard({ numberOfEventsToday, todayEvents }) {
  let shortTodayEvents = todayEvents;
  if (numberOfEventsToday > 2) {
    shortTodayEvents = shortTodayEvents.slice(0, 2);
  }

  return (
    <Card className="flex w-full bg-opacity-50 bg-stone-50 border-l-4 border-rose-200 min-h-full">
      <CardBody>
        <Flex flexDir="column" gap={3}>
          <Text size="lg" fontWeight="bold">
            Events Today
          </Text>
          {numberOfEventsToday === 0 ? (
            <Text fontSize="sm">You have no events today!</Text>
          ) : (
            shortTodayEvents.map((event, i) => {
              return (
                <Text key={i} fontSize="sm">
                  {i + 1}. {event.events.name}
                </Text>
              );
            })
          )}
        </Flex>
      </CardBody>
      <CardFooter>
        {numberOfEventsToday > 2 && (
          <Flex className="w-full" flexDir="row-reverse">
            <Link href="/dashboard/manage">
              <Flex gap={2} className="hover:font-bold">
                <Text fontSize="sm">Show more</Text>
                <FaArrowRight size={14} className="mt-1" />
              </Flex>
            </Link>
          </Flex>
        )}
      </CardFooter>
    </Card>
  );
}
