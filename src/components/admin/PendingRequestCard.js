import { Box, Button, Card, CardBody, Flex, Text } from "@chakra-ui/react";
import { FcCheckmark, FcHighPriority } from "react-icons/fc";

export default function PendingRequestCard({ numEventsPending }) {
  const hasPending = numEventsPending > 0;
  const buttonStyle = hasPending
    ? "border-red-400 hover:bg-red-500 hover:text-white"
    : "border-green-400 hover:bg-green-500 hover:text-white";

  const cardStyle = hasPending ? "border-red-300" : "border-green-300";

  return (
    <Card
      className={
        "flex w-full bg-stone-100 bg-opacity-50 border-l-4  min-h-full " +
        cardStyle
      }
    >
      <CardBody>
        <Flex justify="space-between">
          <Box>
            <Text fontSize="sm">Pending Approval</Text>
            <Flex gap={1}>
              {hasPending ? (
                <FcHighPriority size={18} />
              ) : (
                <FcCheckmark size={18} />
              )}
              <Text fontWeight="bold">{numEventsPending}</Text>
            </Flex>
          </Box>
          <Box>
            <Button className={"text-xs border " + buttonStyle}>View</Button>
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
}
