"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

export default function error({ error, reset }) {
  useEffect(() => {
    console.log(error);
    toast.error(error.message);
  }, [error]);
  return (
    <div>
      <h2>Someting went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
