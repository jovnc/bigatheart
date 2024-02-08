"use client";

import { updateAvatar } from "@actions/userActions";
import { Box, Flex, Text, Image, Avatar } from "@chakra-ui/react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function UpdateAvatarForm() {
  const [currImage, setCurrImage] = useState("");

  const avatarList = ["/assets/images/bear1.jpg", "/assets/images/dog1.jpg"];

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
        <Text fontWeight="medium">User Profile Photo</Text>
        <Flex>
          {avatarList.map((avatar, i) => {
            return (
              <Box py="3" pr="3" key={i}>
                <Image
                  src={avatar}
                  alt="profile photo"
                  value="/assets/images/bear1.jpg"
                  className="avatar_logo cursor-pointer"
                  onClick={() => handleClick(avatar)}
                />
              </Box>
            );
          })}
        </Flex>

        <Text className="pt-5" fontWeight="medium" fontSize="sm">
          Preview
        </Text>
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

        <Flex mt={4}>
          <button className="red_outline_btn" type="submit">
            Update Profile Image
          </button>
        </Flex>
      </form>
    </div>
  );
}
