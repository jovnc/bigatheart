"use client";
import { getEventInfoById } from "@actions/eventActions";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function page({ params }) {
  const [event, setEvent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getEventInfoById(params.id);
      setEvent(res);
    };
    fetchData();
  }, []);

  return (
    <Flex
      className="shadow-md bg-stone-50 bg-opacity-50 w-full  p-5 rounded-md"
      flexDir="column"
    >
      <Text align="center" fontWeight="bold">
        Thank you for registering for the event!
      </Text>
      {event?.invitation ? (
        <iframe
          src={`${event?.invitation}#toolbar=0&navpanes=0`}
          height={366}
          width={515}
          className="p-5 mx-auto"
        />
      ) : (
        <Flex height={366}>
          <Spinner className="mx-auto m-5" />
        </Flex>
      )}
      <button className="px-2 py-1 border border-slate-400 rounded-lg mx-auto">
        View all my Events
      </button>
    </Flex>
  );
}
