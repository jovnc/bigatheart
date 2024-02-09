import { getUserDetails } from "@actions/authActions";
import { getMyEvents } from "@actions/eventActions";
import { Grid, GridItem } from "@chakra-ui/react";
import MyMinsPerMonthCard from "@components/dashboard/MyMinsPerMonthCard";
import EventRegisteredPerMonthCard from "@components/dashboard/MyMinsPerMonthCard";

import QuickStatsCard from "@components/dashboard/QuickStatsCard";
import TodayEventCard from "@components/dashboard/TodayEventCard";
import TopCategoriesCard from "@components/dashboard/TopCategoriesCard";
import WelcomeBackCard from "@components/dashboard/WelcomeBackCard";
import { getTodayDate } from "@utils/helpers";

export default async function page() {
  // Getting event details
  const res = await getMyEvents();
  if (!res) return null;

  const { data, error } = res;
  if (error) return <div>Error retrieiving events. {error.message}</div>;

  // Getting user details
  const { displayName, avatar } = await getUserDetails();

  // filter events by today's date
  const date = getTodayDate();
  const todayEvents = data.filter((event) => {
    return event.events.date === date;
  });
  const numberOfEventsToday = todayEvents.length;

  // filter events by attended
  const attendedEvents = data.filter((event) => event.attended);
  const numEventsAttended = attendedEvents.length;
  const minsVolunteered = attendedEvents.reduce(
    (a, b) => a + b.events.duration,
    0
  );
  const peopleImpacted = attendedEvents.reduce(
    (a, b) => a + b.events.peopleImpacted,
    0
  );

  // sort events by date
  // const sortedEvents = sortByDate(data);

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
            minsVolunteered={minsVolunteered}
            peopleImpacted={peopleImpacted}
          />
        </GridItem>
      </Grid>
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <GridItem>
          <MyMinsPerMonthCard events={data} />
        </GridItem>
        <GridItem>
          <TopCategoriesCard events={data} />
        </GridItem>
      </Grid>
    </div>
  );
}
