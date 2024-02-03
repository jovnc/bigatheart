"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function createEventAction({
	eventCategory,
	eventDate,
	eventDescription,
	eventName,
	eventTime,
	organiser,
	eventLocation,
}) {
	const supabase = createServerActionClient({ cookies });
	const {
		data: {
			user: { id },
		},
	} = await supabase.auth.getUser();
	const { error: userDataError, data: userData } = await supabase
		.from("users")
		.select("first_name, last_name")
		.eq("user_id", id);

	if (userDataError) {
		throw new Error("Error retrieving user data");
	}

	const displayName = `${userData[0].first_name} ${userData[0].last_name}`;

	const { data: eventData, error: eventCreationError } = await supabase
		.from("events")
		.insert({
			creator: displayName,
			time: eventTime,
			name: eventName,
			description: eventDescription,
			date: eventDate,
			category: eventCategory,
			organiser: organiser,
			creator_id: id,
			location: eventLocation,
		})
		.select();

	if (eventCreationError) {
		throw new Error(eventCreationError.message);
	}

	return eventData;
}

export async function getEvents() {
	const supabase = createServerActionClient({ cookies });
	const { data: eventData, error: getEventError } = await supabase
		.from("events")
		.select();

	if (getEventError) {
		throw new Error("Failed to retrieve event information");
	}

	return eventData;
}

export async function getEventById(id) {
	const supabase = createServerActionClient({ cookies });
	const { data: eventData, error: getEventError } = await supabase
		.from("events")
		.select()
		.eq("id", id);

	return { eventData, getEventError };
}
