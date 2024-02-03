import { getEvents } from "@actions/eventActions";
import { Spinner } from "@chakra-ui/react";
import EventCard from "@components/events/EventCard";
import { convertToAMPM, convertDateFormat } from "@utils/helpers";

export default async function page() {
	// TODO: implement error handling for getEvents
	const res = await getEvents();

	return (
		<div>
			{!res && <Spinner />}
			{res &&
				res.map(({ name, date, time, description, location, id }) => {
					return (
						<EventCard
							name={name}
							date={convertDateFormat(date)}
							time={convertToAMPM(time)}
							description={description}
							location={location}
							id={id}
						/>
					);
				})}
		</div>
	);
}
