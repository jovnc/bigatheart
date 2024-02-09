import { getUserDetails } from "@actions/authActions";
import { getAllEvents } from "@actions/eventActions";
import { Grid, GridItem } from "@chakra-ui/react";
import AdminMinsByMonthCard from "@components/admin/AdminMinsByMonthCard";
import PendingRequestCard from "@components/admin/PendingRequestCard";
import WelcomeAdminCard from "@components/admin/WelcomeAdminCard";

export default async function page() {
  // Getting user details
  const { displayName, avatar } = await getUserDetails();

  // Get requests that are marked as attended by user and require admin approval
  const { data: allEvents, error: allError } = await getAllEvents();

  // pending events
  const pendingEvents = allEvents.filter((event) => {
    return event.finished && !event.attended;
  });
  const numEventsPending = pendingEvents.length;

  // completed events
  const completedEvents = allEvents.filter((event) => {
    return event.finished && event.attended;
  });

  return (
    <div className="flex-col flex w-full gap-y-5">
      <WelcomeAdminCard displayName={displayName} avatar={avatar} />
      <PendingRequestCard numEventsPending={numEventsPending} />

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <GridItem>
          <AdminMinsByMonthCard events={completedEvents} />
        </GridItem>
        <GridItem>
          <AdminMinsByMonthCard events={completedEvents} />
        </GridItem>
      </Grid>
    </div>
  );
}
