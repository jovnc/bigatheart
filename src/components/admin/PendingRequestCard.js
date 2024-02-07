import { Box, Button, Card, CardBody, Text } from "@chakra-ui/react";
import { FcHighPriority } from "react-icons/fc";

export default function PendingRequestCard({ numEventsPending }) {
  return (
    <Card className="flex w-full bg-stone-100 bg-opacity-50 border-l-4 border-red-300 min-h-full">
      <CardBody>
        <Box>
          <Text fontSize="sm">Pending Approval</Text>
          <Text fontWeight="bold">
            <FcHighPriority className="inline mr-2" />
            {numEventsPending}
          </Text>
          <Button
            size="s"
            className="mt-3 text-xs hover:bg-red-400 px-4 py-1 border border-red-400"
          >
            View
          </Button>
        </Box>
      </CardBody>
    </Card>
  );
}
