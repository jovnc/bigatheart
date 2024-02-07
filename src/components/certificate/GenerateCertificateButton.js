"use client";

import { useForm } from "react-hook-form";

export default function GenerateCertificateButton({ eventid, volunteerid }) {
  const { handleSubmit } = useForm();

  const action = handleSubmit(async (data) => {
    console.log(data);
  });
  return (
    <form action={action}>
      <button> Download Certificate</button>
    </form>
  );
}
