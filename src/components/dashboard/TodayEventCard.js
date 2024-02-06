import { Box, Card, CardBody, CardFooter, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function TodayEventCard({ numberOfEventsToday, todayEvents }) {
  let shortTodayEvents = todayEvents;
  if (numberOfEventsToday > 2) {
    shortTodayEvents = shortTodayEvents.slice(0, 2);
  }

  return (
    <Card className="flex w-full bg-opacity-50 bg-stone-50 border-l-4 border-red-300 min-h-full">
      <CardBody>
        <Box>
          <Text size="lg" fontWeight="bold" className="mb-3">
            Events Today
          </Text>
          {numberOfEventsToday === 0 ? (
            <Text fontSize="sm">You have no events today!</Text>
          ) : (
            shortTodayEvents.map((event) => {
              return <Text fontSize="sm">{event.events.name}</Text>;
            })
          )}
        </Box>
      </CardBody>
      <CardFooter>
        {numberOfEventsToday > 2 && (
          <Link href="/dashboard/manage">
            <Text fontSize="sm">Show more...</Text>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
