import { getEvents } from "@actions/eventActions";
import { Spinner } from "@chakra-ui/react";
import EventCard from "@components/events/EventCard";
import { convertToAMPM, convertDateFormat } from "@utils/helpers";

export default async function page() {
  const { getEventError, eventData } = await getEvents();

  if (getEventError) {
    return <div>Error retrieiving events. {getEventError.message}</div>;
  }

  return (
    <>
      {!eventData && <Spinner />}
      {eventData &&
        eventData.map(
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
