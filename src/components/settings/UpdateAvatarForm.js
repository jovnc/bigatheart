"use client";

import { getMyEvents } from "@actions/eventActions";
import { updateAvatar } from "@actions/userActions";
import {
  Box,
  Flex,
  Text,
  Image,
  Avatar,
  Tooltip,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UpdateAvatarForm() {
  const [currImage, setCurrImage] = useState();
  const [durations, setDurations] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getMyEvents();
      const durations = data.map((event) => {
        return event.attended ? event.events.duration : 0;
      });
      setDurations(durations.reduce((a, b) => a + b, 0));
    };
    fetchData();
  }, []);

  const avatarList = [
    {
      url: "/assets/images/bear1.jpg",
      cost: 0,
    },
    {
      url: "/assets/images/bear2.jpg",
      cost: 100,
    },
    {
      url: "/assets/images/bear3.jpg",
      cost: 500,
    },
    {
      url: "/assets/images/dog1.jpg",
      cost: 0,
    },
    {
      url: "/assets/images/dog2.jpg",
      cost: 100,
    },
    {
      url: "/assets/images/dog3.jpg",
      cost: 500,
    },
  ];

  function handleClick(avatar) {
    setCurrImage((curr) => avatar);
  }

  const action = async () => {
    const { data, updateAvatarError } = await updateAvatar(currImage);
    if (updateAvatarError) {
      toast.error("Failed to update Avatar");
    } else {
      toast.success("Successfully updated Avatar");
    }
  };

  return (
    <div>
      <form action={action}>
        <Flex flexDir="column" gap={3}>
          <Flex justify="space-between" gap={2}>
            <Text fontWeight="medium">User Profile Photo</Text>
            <Text fontSize="sm">Duration Volunteered: {durations} mins</Text>
          </Flex>
          <Flex gap={3} mt={2}>
            {avatarList.map((avatar, i) => {
              if (avatar.cost < durations) {
                return (
                  <Image
                    key={i}
                    src={avatar.url}
                    alt="profile photo"
                    value={avatar.url}
                    className="avatar_logo cursor-pointer"
                    onClick={() => handleClick(avatar.url)}
                  />
                );
              } else {
                return (
                  <Tooltip label={`Requires ${avatar.cost} mins to unlock`}>
                    <Image
                      key={i}
                      src={avatar.url}
                      alt="profile photo"
                      value={avatar.url}
                      className="avatar_logo cursor-not-allowed opacity-50"
                    />
                  </Tooltip>
                );
              }
            })}
          </Flex>

          <Text className="pt-5" fontWeight="medium" fontSize="sm">
            Preview
          </Text>
          <Flex justify="space-between" gap={5}>
            <Flex
              mt={4}
              align="center"
              className="shadow-lg p-5 rounded-lg w-1/2 hover:shadow-xl"
            >
              <Avatar
                size="sm"
                src={currImage}
                alt="profile photo"
                className="avatar_logo"
              />
              <Flex flexDir="column" ml={4} display="flex">
                <Text size="md">Name</Text>
                <Text color="gray" fontSize="sm">
                  Volunteer
                </Text>
              </Flex>
            </Flex>
            <Box className="flex flex-col-reverse w-1/2">
              <Button
                className="border border-green-500 hover:bg-green-300 px-2 py-1"
                type="submit"
                size="sm"
                fontWeight="semi-bold"
              >
                Update
              </Button>
            </Box>
          </Flex>
        </Flex>
      </form>
    </div>
  );
}
