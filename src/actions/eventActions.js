"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

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
      name, category, organiser, date, time, image, location, duration, peopleImpacted
    )
  `
    )
    .eq("volunteer_id", userid);

  return { data, error };
}

export async function updateMyAttendance(eventid, volunteerid) {
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
    .update({ finished: true })
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

export async function getPendingApprovalEvents() {
  const { data, error } = await supabase
    .from("eventinfo")
    .select(
      `
      volunteer_id, 
      event_id, 
      remarks,
      users!inner(first_name, last_name, avatar),
      events!inner(name, date, time)
    `
    )
    .eq("attended", false)
    .eq("finished", true);

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
