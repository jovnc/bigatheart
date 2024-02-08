import {
  Box,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { TiTickOutline } from "react-icons/ti";
import { FaCalendarDays } from "react-icons/fa6";

export default function MyEventSummary({ totalEvents, attendedEvents }) {
  return (
    <Grid templateColumns="1fr 1fr" gap={8} mb={10}>
      <GridItem>
        <Card className="flex mt-5 bg-stone-50 bg-opacity-50 border-l-4 border-blue-300">
          <CardBody>
            <Flex justify="space-between">
              <Flex gap={1}>
                <FaCalendarDays size={16} />
                <Text fontSize="sm">Registered Events</Text>
              </Flex>
              <Text fontSize="sm" fontWeight="bold">
                {totalEvents}
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem>
        <Card className="flex mt-5 bg-stone-50 bg-opacity-50 border-l-4 border-green-300">
          <CardBody>
            <Flex justify="space-between">
              <Flex gap={1}>
                <TiTickOutline size={18} />
                <Text fontSize="sm">Attended Events</Text>
              </Flex>
              <Text fontSize="sm" fontWeight="bold">
                {attendedEvents}
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
}
