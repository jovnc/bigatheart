import { getMyEvents } from "@actions/eventActions";
import { Spinner } from "@chakra-ui/react";
import MyEventCard from "@components/events/MyEventCard";
import MyEventSummary from "@components/events/MyEventSummary";
import { convertDateFormat, convertToAMPM } from "@utils/helpers";

export default async function page() {
  // TODO: implement error handling for getMyEvents
  const { data, error } = await getMyEvents();

  const len = data.length;
  const attendedLen = data.filter((event) => event.attended).length;

  if (error) return <div>Error retrieiving events. {error.message}</div>;

  return (
    <>
      <MyEventSummary totalEvents={len} attendedEvents={attendedLen} />
      {!data && <Spinner />}
      {data.map((event, i) => {
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
          />
        );
      })}
    </>
  );
}
