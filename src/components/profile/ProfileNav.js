"use client";

import { Divider, Flex } from "@chakra-ui/react";

export default function ProfileNav({ selected, setSelected }) {
  const buttonStyle = (value) => {
    return `
    border-b-[4px] hover:border-blue-300 hover:font-bold ${
      selected == value && "border-blue-300 font-bold"
    }
    `;
  };

  return (
    <Flex flexDir="column" gap={4}>
      <Divider />
      <Flex gap={4}>
        <button
          onClick={(e) => setSelected(e.target.value)}
          value="statistics"
          className={buttonStyle("statistics")}
        >
          Statistics
        </button>
        <button
          onClick={(e) => setSelected(e.target.value)}
          value="events"
          className={buttonStyle("events")}
        >
          Events Participated
        </button>
      </Flex>
      <Divider />
    </Flex>
  );
}
