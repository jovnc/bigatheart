import { getPendingApprovalEvents } from "@actions/eventActions";
import EventAttendanceList from "@components/attendance/EventAttendanceList";
import NoPending from "@components/attendance/NoPending";

export default async function page() {
  const { data: pendingEvents, error: pendingEventsError } =
    await getPendingApprovalEvents();

  if (pendingEvents.length === 0) return <NoPending />;

  // Group By Events
  const groupedEventsArray = Object.values(
    pendingEvents.reduce(function (acc, obj) {
      var eventName = obj.events.name;
      if (!acc[eventName]) {
        acc[eventName] = [];
      }
      acc[eventName].push(obj);
      return acc;
    }, {})
  );

  return (
    <div className="w-full">
      {groupedEventsArray.map((event, i) => {
        return <EventAttendanceList key={i} event={event} />;
      })}
    </div>
  );
}
