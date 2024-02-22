import { Flex } from "@chakra-ui/layout";
import EventCard from "@components/events/EventCard";
import {
  convertDateFormat,
  convertToAMPM,
  recommendEvent,
} from "@utils/helpers";

export default function RecommendedEvents({ events, skills }) {
  const cleanedEvents = recommendEvent(JSON.parse(skills), events).filter(
    (event) => event.recommended
  );

  const checkHasEventEnded = (date) => {
    const currDate = new Date();
    const targetDate = new Date(date);
    return targetDate < currDate;
  };

  return (
    <Flex flexDir="column" gap={8}>
      {cleanedEvents.map((event, i) => {
        return (
          <EventCard
            key={i}
            date={convertDateFormat(event.date)}
            time={convertToAMPM(event.time)}
            location={event.location}
            name={event.name}
            id={event.id}
            image_url={event.image}
            hasEnded={checkHasEventEnded(event.date)}
            recommended={event.recommended}
            category={event.category}
            description={event.description}
          />
        );
      })}
    </Flex>
  );
}
