import { Box, Card, CardBody, Grid, GridItem, Text } from "@chakra-ui/react";

export default function MyEventSummary({ totalEvents, attendedEvents }) {
  return (
    <Grid templateColumns="1fr 1fr" gap={8} mb={10}>
      <GridItem>
        <Card className="flex mt-5 bg-stone-50 bg-opacity-50 border-l-4 border-blue-300">
          <CardBody>
            <Box>
              <Text size="2xl" fontWeight="bold">
                Total
              </Text>
              <Text size="md">
                You registered for{" "}
                <span className="font-bold">{totalEvents}</span> Event(s)
              </Text>
            </Box>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem>
        <Card className="flex mt-5 bg-stone-50 bg-opacity-50 border-l-4 border-red-300">
          <CardBody>
            <Box>
              <Text size="2xl" fontWeight="bold">
                Attended
              </Text>
              <Text size="md">
                You have attended{" "}
                <span className="font-bold">{attendedEvents}</span> Event(s)
              </Text>
            </Box>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
}
