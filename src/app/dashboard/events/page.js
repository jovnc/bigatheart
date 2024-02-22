import { getEvents } from "@actions/eventActions";
import { Divider, Flex, Spinner } from "@chakra-ui/react";
import EventCard from "@components/events/EventCard";
import EventsFilterBar from "@components/events/EventsFilterBar";
import EventsSortBar from "@components/events/EventsSortBar";
import {
  convertToAMPM,
  convertDateFormat,
  sortByDateAlt,
  sortByDateEarliest,
} from "@utils/helpers";

const filterField = ["Current Events", "Past Events", "All Events"];
const filterOptions = ["current", "past", "all"];

const sortField = ["By Date (latest)", "By Date (earliest)"];
const sortOptions = ["date-latest", "date-earliest"];

export default async function page({ searchParams }) {
  const { getEventError, eventData } = await getEvents();

  if (getEventError) {
    return <div>Error retrieiving events. {getEventError.message}</div>;
  }

  const checkHasEventEnded = (date) => {
    const currDate = new Date();
    const targetDate = new Date(date);
    return targetDate < currDate;
  };

  let filteredEventData = eventData;

  if (searchParams.filter == "past") {
    filteredEventData = filteredEventData.filter((event) => {
      const currDate = new Date();
      const targetDate = new Date(event.date);
      return targetDate < currDate;
    });
  } else if (searchParams.filter == "all") {
    // do nothing
  } else {
    // filter to get only events that hasn't passed
    filteredEventData = filteredEventData.filter((event) => {
      const currDate = new Date();
      const targetDate = new Date(event.date);
      return targetDate >= currDate;
    });
  }

  // sort filter fields
  if (searchParams.sort == "date-earliest") {
    sortByDateEarliest(filteredEventData);
  } else {
    sortByDateAlt(filteredEventData);
  }

  return (
    <>
      {!filteredEventData && <Spinner />}

      <Flex justify="space-between">
        <EventsFilterBar filterField={filterField} options={filterOptions} />
        <EventsSortBar sortFields={sortField} options={sortOptions} />
      </Flex>
      <Divider className="border-black mb-5" />

      {filteredEventData.length === 0 && <p>No event matching filter</p>}

      {filteredEventData &&
        filteredEventData.map(
          ({ name, date, time, description, location, id, image }) => {
            return (
              <EventCard
                key={id}
                name={name}
                date={convertDateFormat(date)}
                time={convertToAMPM(time)}
                description={description}
                location={location}
                id={id}
                image_url={image}
                hasEnded={checkHasEventEnded(date)}
              />
            );
          }
        )}
    </>
  );
}
