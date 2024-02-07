import {
  Box,
  Card,
  CardBody,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { MdEventAvailable, MdOutlinePeople } from "react-icons/md";

export default function AdminStatisticsCard() {
  return (
    <Card className="border-l-4 border-yellow-300 bg-stone-100 bg-opacity-50">
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Text fontSize="md" fontWeight="bold">
            Daily Statistics
          </Text>
          <Box>
            <MdEventAvailable className="inline mr-2" />
            <Text fontSize="sm" className="inline">
              Event Signups
            </Text>
          </Box>

          <Box>
            <MdOutlinePeople className="inline mr-2" />
            <Text fontSize="sm" className="inline">
              New Volunteers
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}
