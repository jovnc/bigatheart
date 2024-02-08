import { getEvents } from "@actions/eventActions";
import { Divider, Spinner } from "@chakra-ui/react";
import EventCard from "@components/events/EventCard";
import EventsFilterBar from "@components/events/EventsFilterBar";
import {
  convertToAMPM,
  convertDateFormat,
  sortByDateAlt,
} from "@utils/helpers";

const filterField = ["Current Events", "Past Events", "All"];
const options = ["current", "past", "all"];

export default async function page({ searchParams }) {
  const { getEventError, eventData } = await getEvents();

  if (getEventError) {
    return <div>Error retrieiving events. {getEventError.message}</div>;
  }

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

  // sort by date
  sortByDateAlt(filteredEventData);

  return (
    <>
      {!filteredEventData && <Spinner />}

      <EventsFilterBar filterField={filterField} options={options} />
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
              />
            );
          }
        )}
    </>
  );
}
