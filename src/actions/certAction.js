"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import PDFDocument from "pdfkit";
import BlobStream from "blob-stream";
import { initEdgeStoreClient } from "@edgestore/server/core";
import { initEdgeStore } from "@edgestore/server";

// initialise backend client for edgestore
const es = initEdgeStore.create();
const edgeStoreRouter = es.router({
  publicImages: es.imageBucket(),
  publicCertificates: es.fileBucket(),
  publicInvitations: es.fileBucket(),
});
const backendClient = initEdgeStoreClient({
  router: edgeStoreRouter,
});

// initialise supabase server action client
const supabase = createServerActionClient({ cookies });

export async function generateCertificate(eventid, volunteerid) {
  // check if user already generated certificate for the event
  const { data: checkData, error: checkError } = await supabase
    .from("eventinfo")
    .select(
      `certificate,
    events!inner(duration, name, date),
    users!inner(first_name, last_name)`
    )
    .eq("volunteer_id", volunteerid)
    .eq("event_id", eventid);

  if (checkError) throw new Error(checkError.message);
  if (checkData[0].certificate) return checkData[0].certificate;

  const {
    events: { date: eventDate, name: eventName, duration },
    users: { last_name, first_name },
  } = checkData[0];

  const name = `${first_name} ${last_name}`;
  const hours = `${duration / 60}`;

  // create new PDF document to write onto using pdfkit
  const doc = new PDFDocument({
    font: "/var/task/.next/assets/fonts/butler_regular.otf",
    layout: "landscape",
    size: "A4",
  });

  // write user data into the PDF certificate
  const stream = doc.pipe(BlobStream());
  doc.image("/var/task/.next/assets/images/certificate.jpg", 0, 0, {
    width: 842,
  });
  doc.font("/var/task/.next/assets/fonts/butler_regular.otf");
  doc.fontSize(60).text(name, 70, 265, {
    align: "center",
  });

  doc.fontSize(16).text(hours, 286, 359, {});

  doc.fontSize(20).text(eventName, 70, 412, {
    align: "center",
  });

  doc.fontSize(16).text(eventDate, 570, 470, {});

  doc.end();

  // upload BLOB into EdgeStore storage and return res
  return new Promise((resolve, reject) => {
    try {
      stream.on("finish", async function () {
        const blob = stream.toBlob("application/pdf");

        // upload blob to EdgeStore object store
        const res = await backendClient.publicCertificates.upload({
          content: {
            blob: blob,
            extension: "pdf",
          },
        });

        // upload res.url to Supabase EventInfo table to prevent reupload
        const { data: uploadData, error: uploadError } = await supabase
          .from("eventinfo")
          .update({ certificate: res.url })
          .eq("volunteer_id", volunteerid)
          .eq("event_id", eventid);

        if (uploadError) throw new Error(uploadError.message);

        // return url of the file
        resolve(res.url);
      });
    } catch (error) {
      reject(error);
    }

    stream.on("error", (error) => {
      reject(error);
    });
  });
}

export async function generateInvitation(
  name,
  eventName,
  eventDate,
  eventTime
) {
  // create new PDF document to write onto using pdfkit
  const doc = new PDFDocument({
    font: "butler_regular.otf",
    layout: "landscape",
    size: "A4",
  });

  // write user data into the PDF certificate
  const stream = doc.pipe(BlobStream());

  doc.image("invitation.jpg", 0, 0, {
    width: 842,
  });
  doc.font("butler_regular.otf");
  doc.fontSize(35).text(name, 95, 230, {});
  doc.fontSize(20).text(eventName, 95, 320, {});
  doc.fontSize(17).text(eventDate, 155, 385, {});
  doc.fontSize(17).text(eventTime, 152, 425, {});
  doc.end();

  // upload BLOB into EdgeStore storage and return res
  return new Promise((resolve, reject) => {
    try {
      stream.on("finish", async function () {
        const blob = stream.toBlob("application/pdf");

        // upload blob to EdgeStore object store
        const res = await backendClient.publicInvitations.upload({
          content: {
            blob: blob,
            extension: "pdf",
          },
        });

        // return url of the file
        resolve(res.url);
      });
    } catch (error) {
      reject(error);
    }

    stream.on("error", (error) => {
      reject(error);
    });
  });
}
