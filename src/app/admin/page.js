import { getUserDetails } from "@actions/authActions";
import { getPendingApprovalEvents } from "@actions/eventActions";
import { Box, Card, CardBody, Heading, Text } from "@chakra-ui/react";
import PendingRequestCard from "@components/admin/PendingRequestCard";
import WelcomeAdminCard from "@components/admin/WelcomeAdminCard";

export default async function page() {
  // Getting user details
  const { displayName, avatar } = await getUserDetails();

  // Get requests that are marked as attended by user and require admin approval
  const { data: pendingEvents, error: getPendingError } =
    await getPendingApprovalEvents();

  const numEventsPending = pendingEvents.length;

  return (
    <div className="flex-col flex w-full gap-y-5">
      <WelcomeAdminCard displayName={displayName} avatar={avatar} />

      <PendingRequestCard numEventsPending={numEventsPending} />

      <Card className="flex w-full  border-l-4 border-blue-200">
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
