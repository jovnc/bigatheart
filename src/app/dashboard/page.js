import { getUserDetails } from "@actions/authActions";
import { getMyEvents } from "@actions/eventActions";
import {
  Box,
  Button,
  Card,
  CardBody,
  Grid,
  GridItem,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import QuickStatsCard from "@components/dashboard/QuickStatsCard";
import TodayEventCard from "@components/dashboard/TodayEventCard";
import WelcomeBackCard from "@components/dashboard/WelcomeBackCard";
import { getTodayDate } from "@utils/helpers";

export default async function page() {
  // Getting event details
  const { data, error } = await getMyEvents();
  if (error) return <div>Error retrieiving events. {error.message}</div>;

  // Getting user details
  const { displayName, avatar } = await getUserDetails();

  // filter events by today's date
  const date = getTodayDate();
  const todayEvents = data.filter((event) => {
    return event.events.date !== date;
  });
  const numberOfEventsToday = todayEvents.length;

  // filter events by attended
  const attendedEvents = data.filter((event) => event.attended);
  const numEventsAttended = attendedEvents.length;
  const hoursVolunteered =
    attendedEvents.reduce((a, b) => a + b.events.duration, 0) / 60;
  const peopleImpacted = attendedEvents.reduce(
    (a, b) => a + b.events.peopleImpacted,
    0
  );

  return (
    <div className="flex-col flex gap-y-5 w-full">
      <WelcomeBackCard displayName={displayName} avatar={avatar} />

      <Grid templateColumns="1fr 1fr" gap={8}>
        <GridItem>
          <TodayEventCard
            numberOfEventsToday={numberOfEventsToday}
            todayEvents={todayEvents}
          />
        </GridItem>
        <GridItem>
          <QuickStatsCard
            numEventsAttended={numEventsAttended}
            hoursVolunteered={hoursVolunteered}
            peopleImpacted={peopleImpacted}
          />
        </GridItem>
      </Grid>

      <Card className="flex w-full mt-5 border-l-4 bg-opacity-50 border-blue-200 bg-stone-50">
        <CardBody>
          <Box>
            <Heading size="md">Your volunteering journey at a glance.</Heading>
            <Text fontSize="sm" className="mt-2">
              graphs
            </Text>
          </Box>
        </CardBody>
      </Card>
    </div>
  );
}
