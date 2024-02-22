"use client";

import { Flex } from "@chakra-ui/react";
import ProfileNav from "./ProfileNav";
import { useState } from "react";
import ProfileStatistics from "./ProfileStatistics";
import ProfileEvents from "./ProfileEvents";

export default function ProfilePageStatistics({ userProfile }) {
  const [selected, setSelected] = useState("statistics");
  return (
    <Flex flexDir="column" gap={4}>
      <ProfileNav selected={selected} setSelected={setSelected} />
      {selected == "statistics" && (
        <ProfileStatistics userProfile={userProfile} />
      )}
      {selected == "events" && <ProfileEvents userProfile={userProfile} />}
    </Flex>
  );
}
