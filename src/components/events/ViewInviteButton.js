"use client";

import { Text } from "@chakra-ui/react";
import { FaEnvelope } from "react-icons/fa6";

export default function ViewInviteButton({ invitation }) {
  return (
    <button
      className="border border-pink-500 px-2 py-1 rounded-lg hover:bg-pink-500 hover:text-white"
      onClick={() => window.open(invitation)}
    >
      <Text fontSize="xs">
        <FaEnvelope className="inline mr-2" /> View Invitation
      </Text>
    </button>
  );
}
