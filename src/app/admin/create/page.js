import { Text } from "@chakra-ui/react";
import CreateEventForm from "@components/events/CreateEventForm";

export default function page() {
  return (
    <div className="container shadow-md rounded-xl mx-auto p-7 bg-stone-50 bg-opacity-50">
      <Text className="mb-6 text-center" fontWeight="bold" fontSize="2xl">
        Create New Event
      </Text>
      <CreateEventForm />
    </div>
  );
}
