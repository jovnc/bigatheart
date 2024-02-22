import { Spinner } from "@chakra-ui/react";

export default function loading() {
  return (
    <>
      <Spinner />
      <div className="flex-grow"></div>
    </>
  );
}
