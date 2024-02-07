"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const supabase = createServerActionClient({ cookies });

export async function generateCertificate() {
  const fs = require("fs");
  const PDFDocument = require("pdfkit");

  const doc = new PDFDocument({
    layout: "landscape",
    size: "A4",
  });

  const name = "Name Here";
  const hours = "178";
  const eventName = "Event Name Here";
  const eventDate = "01-01-24";

  doc.pipe(fs.createWriteStream(`${name}.pdf`));
  doc.image("certificate.png", 0, 0, { width: 842 });
  doc.font("Times-Roman");
  doc.fontSize(60).text(name, 70, 265, {
    align: "center",
  });

  if (hours >= 100) {
    doc.fontSize(16).text(hours, 280, 359, {});
  } else {
    doc.fontSize(16).text(hours, 286, 359, {});
  }

  doc.fontSize(20).text(eventName, 70, 412, {
    align: "center",
  });

  doc.fontSize(16).text(eventDate, 570, 470, {});

  doc.end();
}
