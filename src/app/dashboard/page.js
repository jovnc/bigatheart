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
          <Box>
            <Heading size="md">You have 0 Event(s) today.</Heading>
            <Button size="xs" className="mt-5 bg-red-100 hover:bg-red-400">
              Manage Your Events
            </Button>
          </Box>
        </CardBody>
      </Card>
      <div className="flex gap-5">
        <Card className="basis-1/4 border-l-4 border-violet-300">
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="lg">300</Heading>
                <Text fontSize="sm" className="">
                  Lives Changed
                </Text>
              </Box>

              <Box>
                <Heading size="lg" textTransform="uppercase">
                  30
                </Heading>
                <Text fontSize="sm">Hours Volunteered</Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>

        <Card className="basis-3/4 bg-stone-50 border-l-4 border-violet-200">
          <CardBody>
            <Box>
              <Text fontSize="md" className="">
                Welcome back,
              </Text>
              <Heading size="xl">User's Name</Heading>
              <Text fontSize="sm" className="pt-2">
                Wish to do more for our community?
              </Text>
            </Box>

            <Button size="xs" className="mt-5 bg-red-100 hover:bg-red-400">
              Discover Events
            </Button>
          </CardBody>
        </Card>
      </div>

      <Card className="flex w-full mt-5 border-l-4 border-blue-200">
        <CardBody>
          <Box>
            <Heading size="md">Your volunteering journey at a glance.</Heading>
            <Text fontSize="sm" className="mt-2">
              graphs
            </Text>
          </Box>
        </CardBody>
      </Card>
    </div>
  );
}
