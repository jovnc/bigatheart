"use client";

import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import UpdateUserForm from "./UpdateUserForm";
import { getAllUserDetails } from "@actions/userActions";

export default function UpdateUserFormPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState();
  const [formReady, setFormReady] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { userData } = await getAllUserDetails();
      setData(userData[0]);
      setFormReady(true);
    };
    fetchData();
  }, []);

  function handleOpen() {
    setIsOpen((curr) => !curr);
  }
  return (
    <Flex flexDir="column" gap={4}>
      <Flex justifyContent="space-between">
        <Text fontWeight="medium">Update User Information</Text>
        <button
          className="text-sm border border-yellow-400 hover:bg-yellow-400 px-2 py-1 rounded-lg"
          onClick={handleOpen}
          disabled={!formReady}
        >
          {isOpen ? "Close" : "Update"}
        </button>
      </Flex>
      {isOpen && <UpdateUserForm data={data} />}
    </Flex>
  );
}
