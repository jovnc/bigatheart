"use client";

import { sortByDateEarliestX, sortByDateLatestX } from "@utils/helpers";
import ManageEventCard from "./ManageEventCard";
import EventsSortBar from "@components/events/EventsSortBar";
import { Divider, Flex } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import EventsFilterBar from "@components/events/EventsFilterBar";

const sortField = ["By Date (earliest)", "By Date (latest)"];
const sortOptions = ["date-earliest", "date-latest"];

const filterField = ["Past Events", "Current Events", "All Events"];
const filterOptions = ["past", "current", "all"];

export default function ManageEventPage({ events }) {
  let sortedEventsArray;
  let filteredEventsArray;
  const searchParams = useSearchParams();

  const sort = searchParams.get("sort");
  const filter = searchParams.get("filter");

  if (filter == "current") {
    filteredEventsArray = events.filter((event) => {
      console.log(event);
      const currDate = new Date();
      const targetDate = new Date(event[0].events.date);
      return targetDate >= currDate;
    });
  } else if (filter == "all") {
    filteredEventsArray = events;
  } else {
    // default is all past events
    filteredEventsArray = events.filter((event) => {
      const currDate = new Date();
      const targetDate = new Date(event[0].events.date);
      return targetDate < currDate;
    });
  }

  if (sort == "date-latest") {
    sortedEventsArray = sortByDateLatestX(filteredEventsArray);
  } else {
    // default sort by earliest
    sortedEventsArray = sortByDateEarliestX(filteredEventsArray);
  }

  return (
    <>
      <Flex flexDir="column" gap={4}>
        <Flex justify="space-between">
          <EventsFilterBar filterField={filterField} options={filterOptions} />
          <EventsSortBar sortFields={sortField} options={sortOptions} />
        </Flex>
        <Divider />
        {sortedEventsArray.map((event, i) => {
          return (
            <ManageEventCard
              key={i}
              eventName={event[0].events.name}
              event={event}
            />
          );
        })}
      </Flex>
    </>
  );
}
