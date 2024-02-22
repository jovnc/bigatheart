import { getUserDetails } from "@actions/authActions";
import { getAllEvents } from "@actions/eventActions";
import { getAllUserCategories } from "@actions/userActions";
import GraphPage from "@components/admin/GraphPage";
import PendingRequestCard from "@components/admin/PendingRequestCard";
import WelcomeAdminCard from "@components/admin/WelcomeAdminCard";
import { countInterests } from "@utils/helpers";

export default async function page() {
  // Getting user details
  const { displayName, avatar } = await getUserDetails();

  // get all user category details
  const { userData } = await getAllUserCategories();
  const userCleaned = countInterests(
    userData.map((skills) => JSON.parse(skills.skills))
  );

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
      <GraphPage completedEvents={completedEvents} userCleaned={userCleaned} />
    </div>
  );
}
