import { getAllEventsAndVolunteers } from "@actions/eventActions";
import { Divider, Flex, Spinner, Text } from "@chakra-ui/react";
import DownloadEventsButton from "@components/admin/DownloadEventsButton";
import ManageEventCard from "@components/admin/ManageEventCard";

export default async function page() {
  // need to fetch all data for all volunteers and all events
  const { eventData } = await getAllEventsAndVolunteers();

  if (eventData.length === 0)
    return (
      <Flex>
        <Text>There are no events yet</Text>
      </Flex>
    );

  // Group By Events
  const groupedEventsArray = Object.values(
    eventData.reduce(function (acc, obj) {
      var eventName = obj.events.name;
      if (!acc[eventName]) {
        acc[eventName] = [];
      }
      acc[eventName].push(obj);
      return acc;
    }, {})
  );

  if (!groupedEventsArray) return <Spinner />;

  return (
    <div className="w-full">
      <Flex flexDir="column" gap={4}>
        <Flex justify="space-between">
          <Text fontSize="sm" fontWeight="medium">
            Manage Events
          </Text>
          <DownloadEventsButton groupedEventsArray={groupedEventsArray} />
        </Flex>

        <Divider />

        {groupedEventsArray.map((event, i) => {
          return (
            <ManageEventCard
              key={i}
              eventName={event[0].events.name}
              event={event}
            />
          );
        })}
      </Flex>
    </div>
  );
}
