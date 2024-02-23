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
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UpdateAvatarForm({ data }) {
  const [currImage, setCurrImage] = useState(data.avatar);
  const [durations, setDurations] = useState();
  const [isLoading, setIsLoading] = useState(false);

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
      label: "Bear",
      cost: 0,
    },
    {
      url: "/assets/images/bear2.jpg",
      label: "Bear with Hat",
      cost: 100,
    },
    {
      url: "/assets/images/bear4.jpg",
      label: "Bear with bow",
      cost: 500,
    },
    {
      url: "/assets/images/bear5.jpg",
      label: "Bear with duck",
      cost: 700,
    },
    {
      url: "/assets/images/bear3.jpg",
      label: "Bear with Noogler Hat",
      cost: 1000,
    },
    {
      url: "/assets/images/dog1.jpg",
      label: "Dog",
      cost: 0,
    },
    {
      url: "/assets/images/dog2.jpg",
      label: "Dog with Hat",
      cost: 100,
    },
    {
      url: "/assets/images/dog4.jpg",
      label: "Dog with bow",
      cost: 500,
    },
    {
      url: "/assets/images/dog5.jpg",
      label: "Dog with duck",
      cost: 700,
    },
    {
      url: "/assets/images/dog3.jpg",
      label: "Dog with Noogler Hat",
      cost: 1000,
    },
  ];

  function handleClick(avatar) {
    setCurrImage((curr) => avatar);
  }

  const action = async () => {
    setIsLoading(true);
    const { data, updateAvatarError } = await updateAvatar(currImage);
    if (updateAvatarError) {
      toast.error("Failed to update Avatar");
    } else {
      toast.success("Successfully updated Avatar");
    }
    setIsLoading(false);
  };

  return (
    <div>
      <form action={action}>
        <Flex flexDir="column" gap={3}>
          <Flex justify="space-between" gap={2}>
            <Text fontWeight="medium">User Profile Photo</Text>
            <Text fontSize="sm">Duration Volunteered: {durations} mins</Text>
          </Flex>
          <Flex gap={3} mt={2} flexWrap="wrap">
            {avatarList.map((avatar, i) => {
              if (avatar.cost < durations || avatar.cost == 0) {
                return (
                  <Tooltip key={i} label={avatar.label}>
                    <Image
                      src={avatar.url}
                      alt="profile photo"
                      value={avatar.url}
                      className="avatar_logo_lg cursor-pointer"
                      onClick={() => handleClick(avatar.url)}
                    />
                  </Tooltip>
                );
              } else {
                return (
                  <Tooltip
                    label={`${avatar.label} |  \n
                    Requires ${avatar.cost} mins to unlock`}
                    key={i}
                  >
                    <Image
                      src={avatar.url}
                      alt="profile photo"
                      value={avatar.url}
                      className="avatar_logo_lg cursor-not-allowed opacity-50"
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
                <Text size="md">{`${data.first_name} ${data.last_name}`}</Text>
                <Text color="gray" fontSize="sm">
                  {data.role}
                </Text>
              </Flex>
            </Flex>
            <Box className="flex flex-col-reverse w-1/2">
              <Button
                className="border border-green-500 hover:bg-green-500 hover:text-white px-2 py-1"
                type="submit"
                size="sm"
                fontWeight="semi-bold"
              >
                {isLoading ? <Spinner /> : "Update"}
              </Button>
            </Box>
          </Flex>
        </Flex>
      </form>
    </div>
  );
}
