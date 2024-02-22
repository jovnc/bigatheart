"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { generateInvitation } from "./certAction";

const supabase = createServerActionClient({ cookies });

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
  capacity,
}) {
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
      capacity,
    })
    .select();

  if (eventCreationError) {
    throw new Error(eventCreationError.message);
  }

  return eventData;
}

export async function getEvents() {
  const { data: eventData, error: getEventError } = await supabase
    .from("events")
    .select();

  return { eventData, getEventError };
}

export async function getEventById(id) {
  const { data: eventData, error: getEventError } = await supabase
    .from("events")
    .select()
    .eq("id", id);

  return { eventData, getEventError };
}

export async function registerForEvent(data, id) {
  const {
    data: {
      user: { id: userid },
    },
  } = await supabase.auth.getUser();

  // check eventinfo table if user is already signed up
  const { data: checkRegistration, error: checkingError } = await supabase
    .from("eventinfo")
    .select(
      "volunteer_id, event_id, users!inner(first_name, last_name), events!inner(name, date, time)"
    )
    .eq("volunteer_id", userid)
    .eq("event_id", id);

  if (checkingError) throw new Error(checkingError.message);

  if (checkRegistration.length > 0)
    throw new Error("Already registered for Event");

  const { data: getUsername, error: checkUserError } = await supabase
    .from("users")
    .select("first_name, last_name")
    .eq("user_id", userid);

  if (checkUserError) throw new Error(checkUserError.message);

  const { data: getEvent, error: checkEventError } = await supabase
    .from("events")
    .select("name, date, time")
    .eq("id", id);

  if (checkEventError) throw new Error(checkEventError.message);

  // destructure data
  const { first_name, last_name } = getUsername[0];
  const displayName = `${first_name} ${last_name}`;
  const { name, date, time } = getEvent[0];

  // generate invitation
  const url = await generateInvitation(displayName, name, date, time);

  // insert data into eventinfo table
  const { data: eventData, error: registerEventError } = await supabase
    .from("eventinfo")
    .insert({
      volunteer_id: userid,
      event_id: id,
      remarks: data.remarks,
      invitation: url,
    })
    .select();

  if (registerEventError) throw new Error(registerEventError.message);

  return;
}

export async function getMyEvents() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { id: userid } = user;

  // get events from event table using data from eventinfo table
  const { data, error } = await supabase
    .from("eventinfo")
    .select(
      `
      remarks,
      attended,
      finished,
      event_id, 
      volunteer_id,
    events!inner (
      name, category, organiser, date, time, image, location, duration, peopleImpacted, PIN
    )
  `
    )
    .eq("volunteer_id", userid);

  return { data, error };
}

export async function updateMyAttendance(eventid, volunteerid, reflection) {
  // check eventinfo table if user already confirmed attendance
  const { data: checkFinished, error: checkingError } = await supabase
    .from("eventinfo")
    .select("finished")
    .eq("volunteer_id", volunteerid)
    .eq("event_id", eventid);

  if (checkingError) throw new Error(checkingError.message);
  if (checkFinished[0].finished)
    throw new Error(
      "Already confirmed attendance for event. Please wait for admin to confirm your attendance."
    );

  const { error } = await supabase
    .from("eventinfo")
    .update({ finished: true, reflection })
    .eq("volunteer_id", volunteerid)
    .eq("event_id", eventid);

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/manage");

  return { error };
}

export async function unregisterEvent(eventid, volunteerid) {
  const { data, error } = await supabase
    .from("eventinfo")
    .delete()
    .eq("volunteer_id", volunteerid)
    .eq("event_id", eventid);

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/manage");

  return { error };
}

export async function getAllEvents() {
  const { data, error } = await supabase.from("eventinfo").select(
    `
      volunteer_id, 
      event_id, 
      remarks,
      finished,
      attended,
      reflection,
      users!inner(first_name, last_name, avatar, gender, occupation, immigration),
      events!inner(name, date, time, duration)
    `
  );

  if (error) throw new Error(error.message);

  return { data, error };
}

export async function approveEvent(event_id, volunteer_id) {
  // check eventinfo table if user already confirmed attendance
  const { data: checkAttended, error: checkingError } = await supabase
    .from("eventinfo")
    .select("attended")
    .eq("volunteer_id", volunteer_id)
    .eq("event_id", event_id);

  if (checkingError) throw new Error(checkingError.message);
  if (checkAttended[0].attended)
    throw new Error("Already confirmed approved attendance");

  const { error } = await supabase
    .from("eventinfo")
    .update({ attended: true })
    .eq("volunteer_id", volunteer_id)
    .eq("event_id", event_id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/manage");

  return { error };
}

export async function getEventInfoById(id) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { id: userid } = user;

  const { data: getEventInfo, error: getEventInfoError } = await supabase
    .from("eventinfo")
    .select("invitation")
    .eq("volunteer_id", userid)
    .eq("event_id", id);

  if (getEventInfoError) throw new Error(getEventInfoError.message);

  return getEventInfo[0];
}

export async function getAllEventsAndVolunteers() {
  const { data: eventData, error: getDataError } = await supabase
    .from("eventinfo")
    .select(
      `remarks, attended, finished, volunteer_id, event_id, events!inner(name, date, time, capacity), users!inner(first_name, last_name)`
    );

  if (getDataError) throw new Error(getDataError.message);

  return { eventData };
}

export async function adminDeleteEvent(eventid, volunteerid) {
  const { data, error } = await supabase
    .from("eventinfo")
    .delete()
    .eq("volunteer_id", volunteerid)
    .eq("event_id", eventid);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/manage");

  return { error };
}

export async function generateEventPIN(PIN, eventid) {
  const { error } = await supabase
    .from("events")
    .update({ PIN: PIN })
    .eq("id", eventid);

  if (error) throw new Error(error.message);
}
