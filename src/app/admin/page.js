import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";

export default function page() {
  return (
    <div className="flex-col flex gap-y-5 w-full">
      <Card className="flex w-full mt-5 bg-red-50 border-l-4 border-red-300">
        <CardBody>
          <Box className="flex">
            <Heading size="md">There are 5 pending requests.</Heading>
            <Button
              size="s"
              className="ml-5 bg-red-100 text-xs hover:bg-red-400"
            >
              <Text fontSize="sm" className="px-2 py-2">
                View
              </Text>
            </Button>
          </Box>
        </CardBody>
      </Card>
      <div className="flex gap-5">
        <Card className="basis-1/4 border-l-4 border-yellow-300">
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="lg">300</Heading>
                <Text fontSize="sm" className="">
                  Event Signups Today
                </Text>
                <Button
                  size="xs"
                  className="bg-red-100 mt-2 text-xs hover:bg-red-400"
                >
                  <Text fontSize="sm" className="px-2 py-2">
                    View Events
                  </Text>
                </Button>
              </Box>

              <Box>
                <Heading size="lg" textTransform="uppercase">
                  12
                </Heading>
                <Text fontSize="sm">New Volunteers Today</Text>
                <Button
                  size="xs"
                  className="bg-red-100 mt-2 text-xs hover:bg-red-400"
                >
                  <Text fontSize="sm" className="px-2 py-2">
                    View Profiles
                  </Text>
                </Button>
              </Box>
            </Stack>
          </CardBody>
        </Card>

        <Card className="basis-3/4 bg-stone-50 border-l-4 border-yellow-200">
          <CardBody>
            <Box>
              <Text fontSize="md" className="">
                Welcome back,
              </Text>
              <Heading size="xl">Admin's Name</Heading>
              <Text fontSize="sm" className="pt-2">
                There are 4 Event(s) today.
              </Text>
            </Box>

            <Button size="md" className="mt-5 bg-red-100 hover:bg-red-400">
              Add New Events
            </Button>
          </CardBody>
        </Card>
      </div>

      <Card className="flex w-full mt-5 border-l-4 border-blue-200">
        <CardBody>
          <Box>
            <Heading size="md">Analytics</Heading>
            <Text fontSize="sm" className="mt-2">
              graphs: signups/month, volunteers/month
            </Text>
          </Box>
        </CardBody>
      </Card>
    </div>
  );
}
