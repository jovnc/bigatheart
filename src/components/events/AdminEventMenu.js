"use client";

import { Menu, MenuButton, MenuItem, MenuList, Button } from "@chakra-ui/react";
import EditEventModal from "./EditEventModal";
import { FaCog } from "react-icons/fa";
import DeleteEventModal from "./DeleteEventModal";

export default function AdminEventMenu({ event }) {
  console.log(event);
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<FaCog />} size="xs">
        Settings
      </MenuButton>
      <MenuList>
        <EditEventModal />
        <DeleteEventModal event_id={event[0].event_id} />
      </MenuList>
    </Menu>
  );
}
