"use client";
import { getEventById } from "@actions/eventActions";
import { Spinner } from "@chakra-ui/react";
import EventPage from "@components/events/EventPage";
import { useEffect, useState } from "react";

export default function page({ params }) {
  const [eventData, setEventData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getEventById(params.id);
      const { eventData: eventDataFetch, getEventError } = res;
      setEventData(eventDataFetch);
    };
    fetchData();
  }, []);

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
