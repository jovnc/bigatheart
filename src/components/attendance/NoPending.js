import { Text } from "@chakra-ui/react";
import { FcApproval } from "react-icons/fc";

export default function NoPending() {
  const currDate = new Date();
  return (
    <div className="bg-stone-100 bg-opacity-50 w-full p-5 shadow-md border-[1px] border-green-400 rounded-lg">
      <FcApproval className="inline mr-2" />
      <Text className="inline">No Pending Events requiring approval!</Text>
      <Text fontSize="sm" className="mt-3">
        Last Updated: {currDate.toString()}
      </Text>
    </div>
  );
}
