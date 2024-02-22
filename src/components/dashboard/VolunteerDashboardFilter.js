"use client";

import { Grid, GridItem } from "@chakra-ui/layout";
import MyMinsPerMonthCard from "./MyMinsPerMonthCard";
import TopCategoriesCard from "./TopCategoriesCard";
import VolunteerLeaderboard from "./VolunteerLeaderboard";
import { useState } from "react";
import DashboardPageNav from "./DashboardPageNav";
import RecommendedEvents from "./RecommendedEvents";

export default function VolunteerDashboardFilter({
  attendedEvents,
  userData,
  events,
  skills,
}) {
  const [selected, setSelected] = useState("events");

  return (
    <>
      <DashboardPageNav selected={selected} setSelected={setSelected} />
      {selected == "events" && (
        <RecommendedEvents events={events} skills={skills} />
      )}
      {selected == "statistics" && (
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
          <GridItem>
            <MyMinsPerMonthCard events={attendedEvents} />
          </GridItem>
          <GridItem>
            <TopCategoriesCard events={attendedEvents} />
          </GridItem>
        </Grid>
      )}
      {selected == "leaderboard" && (
        <VolunteerLeaderboard userData={userData} />
      )}
    </>
  );
}
