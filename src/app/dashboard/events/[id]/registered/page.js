"use client";
import { getEventInfoById } from "@actions/eventActions";
import { Button, Flex, Spinner, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";

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
      <Flex justify="space-between">
        <Button size="sm">
          <Link href="/dashboard/events">
            <BiArrowBack className="inline scale-150 mr-2" />
            <Text className="inline" fontSize="sm">
              Back
            </Text>
          </Link>
        </Button>
        <Button
          className="px-2 py-1 border border-slate-400 rounded-lg"
          size="sm"
        >
          View all my Events
        </Button>
      </Flex>
      <Text align="center" fontWeight="bold" className="mt-5">
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
    </Flex>
  );
}
