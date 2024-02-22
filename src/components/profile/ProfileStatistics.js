"use client";

import { Flex, Grid } from "@chakra-ui/react";
import MyMinsPerMonthCard from "@components/dashboard/MyMinsPerMonthCard";
import QuickStatsCard from "@components/dashboard/QuickStatsCard";
import TopCategoriesCard from "@components/dashboard/TopCategoriesCard";

export default function ProfileStatistics({ userProfile }) {
  const attendedEvents = userProfile.eventinfo.filter((event) => {
    return event.attended && event.finished;
  });

  const minsVolunteered = attendedEvents.reduce(
    (prev, curr) => prev + curr.events.duration,
    0
  );

  const peopleImpacted = attendedEvents.reduce(
    (prev, curr) => prev + curr.events.peopleImpacted,
    0
  );

  return (
    <Flex flexDir="column" gap={2}>
      <QuickStatsCard
        numEventsAttended={attendedEvents.length}
        minsVolunteered={minsVolunteered}
        peopleImpacted={peopleImpacted}
      />
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} className="w-full">
        <TopCategoriesCard events={userProfile.eventinfo} />
        <MyMinsPerMonthCard events={userProfile.eventinfo} />
      </Grid>
    </Flex>
  );
}
