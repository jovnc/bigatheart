import { Flex, Spinner, Text } from "@chakra-ui/react";

export default function PendingSign() {
  return (
    <div className="bg-red-500 text-white px-3 py-1 rounded-lg ">
      <Flex gap={3}>
        <Spinner size="sm" />
        <Text fontSize="xs">Pending Admin Approval...</Text>
      </Flex>
    </div>
  );
}
