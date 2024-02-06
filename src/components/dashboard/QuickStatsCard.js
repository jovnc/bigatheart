import {
  Box,
  Card,
  CardBody,
  Grid,
  GridItem,
  Heading,
  Icon,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { FaCalendar, FaRegClock } from "react-icons/fa";

export default function QuickStatsCard({
  numEventsAttended,
  hoursVolunteered,
  peopleImpacted,
}) {
  return (
    <Card className="border-l-4 bg-stone-50 bg-opacity-50 border-green-300">
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Grid templateColumns="2fr 1fr" gap={4}>
            <GridItem>
              <Text fontSize="xs">Lives Changed</Text>
              <Heading size="md">{peopleImpacted}</Heading>
            </GridItem>
            <GridItem
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MdOutlinePeopleAlt size="2rem" />
            </GridItem>
          </Grid>
          <Grid templateColumns="2fr 1fr" gap={4}>
            <GridItem>
              <Text fontSize="xs">Hours Volunteered</Text>
              <Heading size="md">{hoursVolunteered}</Heading>
            </GridItem>
            <GridItem
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaRegClock size="2rem" />
            </GridItem>
          </Grid>
          <Grid templateColumns="2fr 1fr" gap={4}>
            <GridItem>
              <Text fontSize="xs">Events Attended</Text>
              <Heading size="md">{numEventsAttended}</Heading>
            </GridItem>
            <GridItem
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaCalendar size="2rem" />
            </GridItem>
          </Grid>
        </Stack>
      </CardBody>
    </Card>
  );
}
