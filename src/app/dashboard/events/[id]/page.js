import { getEventById } from "@actions/eventActions";
import EventPage from "@components/events/EventPage";

export default async function page({ params }) {
	const res = await getEventById(params.id);

	const { eventData, getEventError } = res;

	if (getEventError) {
		return <div>Error fetching data</div>;
	}

	if (eventData.length === 0) {
		return <div>No such event found</div>;
	}

	const { name, category, organiser, date, time, description, location } =
		eventData[0];

	return (
		<>
			<EventPage
				name={name}
				category={category}
				organiser={organiser}
				date={date}
				time={time}
				description={description}
				location={location}
				id={params.id}
			/>
		</>
	);
}
