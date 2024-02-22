"use client";
import { getEventById } from "@actions/eventActions";
import { Spinner, Text } from "@chakra-ui/react";
import EventPage from "@components/events/EventPage";
import { useEffect, useState } from "react";

export default function page({ params }) {
  const [eventData, setEventData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getEventById(params.id);
      const { eventData: eventDataFetch, getEventError } = res;
      if (getEventError) {
        setError(getEventError.message);
      }
      setEventData(eventDataFetch);
    };
    fetchData();
  }, []);

  if (error) return <Text> No Event Found</Text>;
  if (!eventData) return <Spinner />;

  const {
    name,
    category,
    organiser,
    date,
    time,
    description,
    location,
    image,
    duration,
  } = eventData[0];

  return (
    <>
      <EventPage
        name={name}
        category={category}
        organiser={organiser}
        date={date}
        time={time}
        description={description}
        location={location}
        id={params.id}
        imageUrl={image}
        duration={duration}
      />
    </>
  );
}
