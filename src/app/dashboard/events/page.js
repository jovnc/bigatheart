import { getEvents } from "@actions/eventActions";
import EventCard from "@components/EventCard";
import EventCardTest from "@components/EventCardTest";

export default async function page() {
	// TODO: implement error handling for getEvents
	const res = await getEvents();

	return (
		<div>
			{res &&
				res.map(({ name, date, time, description, location }) => {
					return (
						<EventCardTest
							name={name}
							date={date}
							time={time}
							description={description}
							location={location}
						/>
					);
				})}
			<EventCard />
			<EventCard />
		</div>
	);
}
