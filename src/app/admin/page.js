import { getUserDetails } from "@actions/authActions";
import { getPendingApprovalEvents } from "@actions/eventActions";
import {
  Box,
  Button,
  Card,
  CardBody,
  Grid,
  GridItem,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import AdminStatisticsCard from "@components/admin/AdminStatisticsCard";
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

      <Grid templateColumns="1fr 1fr" gap={4}>
        <GridItem>
          <PendingRequestCard numEventsPending={numEventsPending} />
        </GridItem>
        <GridItem>
          <AdminStatisticsCard />
        </GridItem>
      </Grid>

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
