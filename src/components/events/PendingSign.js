import { Flex, Spinner, Text } from "@chakra-ui/react";

export default function PendingSign() {
  return (
    <div className="border border-red-400 px-3 py-1 rounded-lg ">
      <Flex gap={3}>
        <Spinner size={14} />
        <Text fontSize="xs">Pending Admin Approval...</Text>
      </Flex>
    </div>
  );
}
