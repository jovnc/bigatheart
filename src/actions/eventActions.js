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
  url,
  peopleImpacted,
  eventDuration,
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
      image: url,
      duration: eventDuration,
      peopleImpacted: peopleImpacted,
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

  return { eventData, getEventError };
}

export async function getEventById(id) {
  const supabase = createServerActionClient({ cookies });
  const { data: eventData, error: getEventError } = await supabase
    .from("events")
    .select()
    .eq("id", id);

  return { eventData, getEventError };
}

export async function registerForEvent(data, id) {
  const supabase = createServerActionClient({ cookies });
  const {
    data: {
      user: { id: userid },
    },
  } = await supabase.auth.getUser();

  // check eventinfo table if user is already signed up
  const { data: checkRegistration, error: checkingError } = await supabase
    .from("eventinfo")
    .select("volunteer_id, event_id")
    .eq("volunteer_id", userid)
    .eq("event_id", id);

  if (checkRegistration.length > 0)
    throw new Error("Already registered for Event");

  // insert data into eventinfo table
  const { data: eventData, error: registerEventError } = await supabase
    .from("eventinfo")
    .insert({
      volunteer_id: userid,
      event_id: id,
      remarks: data.remarks,
    })
    .select();

  if (registerEventError) throw new Error(registerEventError.message);

  return;
}

export async function getMyEvents() {
  const supabase = createServerActionClient({ cookies });
  const {
    data: {
      user: { id: userid },
    },
  } = await supabase.auth.getUser();

  // get events from event table using data from eventinfo table
  const { data, error } = await supabase
    .from("eventinfo")
    .select(
      `
      remarks,
      attended,
    events!inner (
      name, category, organiser, date, time, image, location, duration, peopleImpacted
    )
  `
    )
    .eq("volunteer_id", userid);

  return { data, error };
}
