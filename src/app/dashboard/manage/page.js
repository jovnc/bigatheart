import { getMyEvents } from "@actions/eventActions";
import { Divider, Flex, Spinner } from "@chakra-ui/react";
import EventsFilterBar from "@components/events/EventsFilterBar";
import EventsSortBar from "@components/events/EventsSortBar";
import MyEventCard from "@components/events/MyEventCard";
import MyEventSummary from "@components/events/MyEventSummary";
import {
  convertDateFormat,
  convertToAMPM,
  sortByDate,
  sortByDateEarliestAlt,
} from "@utils/helpers";

const filterField = [
  "Current Events",
  "Events Ended",
  "Attended Events",
  "Pending Events",
  "All Events",
];
const filterOptions = ["current", "ended", "attended", "pending", "all"];

const sortField = ["By Date (latest)", "By Date (earliest)"];

const sortOptions = ["date-latest", "date-earliest"];

export default async function page({ searchParams }) {
  const res = await getMyEvents();
  if (!res) return <div>Error retrieiving information</div>;

  const { data, error } = res;
  if (error) return <div>Error retrieiving events. {error.message}</div>;

  const len = data.length;
  const attendedLen = data.filter((event) => event.attended).length;

  // filter data
  let filteredEvents = data;

  if (searchParams.filter == "ended") {
    filteredEvents = filteredEvents.filter((event) => {
      const today = new Date();
      const target = new Date(event.events.date);
      return target < today;
    });
  } else if (searchParams.filter == "attended") {
    filteredEvents = filteredEvents.filter((event) => {
      return event.attended && event.finished;
    });
  } else if (searchParams.filter == "pending") {
    filteredEvents = filteredEvents.filter((event) => {
      return !event.attended && event.finished;
    });
  } else if (searchParams.filter == "all") {
    // do nothing
  } else {
    // current events
    filteredEvents = filteredEvents.filter((event) => {
      const today = new Date();
      const target = new Date(event.events.date);
      return target >= today;
    });
  }

  // sort filter fields
  if (searchParams.sort == "date-earliest") {
    sortByDateEarliestAlt(filteredEvents);
  } else {
    sortByDate(filteredEvents);
  }

  return (
    <>
      <MyEventSummary totalEvents={len} attendedEvents={attendedLen} />
      {!filteredEvents && <Spinner />}

      <Flex justify="space-between">
        <EventsFilterBar filterField={filterField} options={filterOptions} />
        <EventsSortBar sortFields={sortField} options={sortOptions} />
      </Flex>

      <Divider className="border-black mb-5" />

      {filteredEvents.length === 0 && <p>No event matching filter</p>}

      {filteredEvents.map((event, i) => {
        return (
          <MyEventCard
            key={i}
            image_url={event.events.image}
            date={convertDateFormat(event.events.date)}
            time={convertToAMPM(event.events.time)}
            name={event.events.name}
            location={event.events.location}
            attended={event.attended}
            remarks={event.remarks}
            finished={event.finished}
            eventid={event.event_id}
            volunteerid={event.volunteer_id}
            pin={event.events.PIN}
          />
        );
      })}
    </>
  );
}
