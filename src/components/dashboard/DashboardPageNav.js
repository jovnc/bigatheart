"use client";

import { Divider, Flex } from "@chakra-ui/react";

export default function DashboardPageNav({ selected, setSelected }) {
  const buttonStyle = (value) => {
    return `
    border-b-[4px] hover:border-rose-300 hover:font-bold ${
      selected == value && "border-rose-300 font-bold"
    }
    `;
  };

  return (
    <Flex flexDir="column" gap={4}>
      <Divider />
      <Flex gap={4}>
        <button
          onClick={(e) => setSelected(e.target.value)}
          value="events"
          className={buttonStyle("events")}
        >
          Recommended Events
        </button>
        <button
          onClick={(e) => setSelected(e.target.value)}
          value="statistics"
          className={buttonStyle("statistics")}
        >
          Statistics
        </button>
        <button
          onClick={(e) => setSelected(e.target.value)}
          value="leaderboard"
          className={buttonStyle("leaderboard")}
        >
          Volunteer Leaderboard
        </button>
      </Flex>
      <Divider />
    </Flex>
  );
}
