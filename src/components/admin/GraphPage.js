"use client";

import { Grid, GridItem, Text } from "@chakra-ui/react";
import AdminMinsByMonthCard from "@components/admin/AdminMinsByMonthCard";
import DashboardFilter from "@components/admin/DashboardFilter";
import GenderPieChart from "@components/admin/GenderPieChart";
import ImmigrationPieChart from "@components/admin/ImmigrationPieChart";
import OccupationPieChart from "@components/admin/OccupationPieChart";
import { useState } from "react";

const OPTIONS = [
  { label: "Total Mins Volunteered By Month", value: "month" },
  { label: "Proportion of Gender by Volunteering Minutes", value: "gender" },
  {
    label: "Proportion of Occupation by Volunteering Minutes",
    value: "occupation",
  },
  {
    label: "Proporiton of Immigration Status by Volunteering Minutes",
    value: "immigration",
  },
];

export default function GraphPage({ completedEvents }) {
  const [show, setShow] = useState(OPTIONS);

  const arrayOfShow = show.map((option) => option.value);

  return (
    <>
      <DashboardFilter options={OPTIONS} show={show} setShow={setShow} />

      {arrayOfShow.length == 0 && (
        <Text textAlign="center">Select Graphs to display</Text>
      )}

      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={4}>
        {arrayOfShow.includes("month") && (
          <GridItem>
            <AdminMinsByMonthCard events={completedEvents} />
          </GridItem>
        )}
        {arrayOfShow.includes("gender") && (
          <GridItem>
            <GenderPieChart events={completedEvents} />
          </GridItem>
        )}

        {arrayOfShow.includes("occupation") && (
          <GridItem>
            <OccupationPieChart events={completedEvents} />
          </GridItem>
        )}
        {arrayOfShow.includes("immigration") && (
          <GridItem>
            <ImmigrationPieChart events={completedEvents} />
          </GridItem>
        )}
      </Grid>
    </>
  );
}
