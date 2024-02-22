"use client";

import {
  Avatar,
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

export default function UserInfoRow({ user }) {
  const [show, setShow] = useState(false);

  const skills = JSON.parse(user.skills);

  function handleShow() {
    setShow((curr) => !curr);
  }

  return (
    <>
      <Grid templateColumns="0.5fr 1fr 1fr 2fr 0.5fr" gap={2}>
        <GridItem>
          <Avatar src={user.avatar} size="sm" />
        </GridItem>
        <GridItem>
          <Text fontSize="sm">
            {user.first_name} {user.last_name}
          </Text>
        </GridItem>

        <GridItem>
          <Text fontSize="sm">{user.phone}</Text>
        </GridItem>

        <GridItem>
          <Text fontSize="sm">{user.email}</Text>
        </GridItem>
        <GridItem>
          <Flex justify="end">
            <button onClick={handleShow}>
              {!show && <MdExpandMore />}
              {show && <MdExpandLess />}
            </button>
          </Flex>
        </GridItem>
      </Grid>
      {show && (
        <Grid gap={2} className="w-full">
          <Divider />
          <Flex flexDir="column" gap={2}>
            <Flex justifyContent="space-between">
              <Text fontSize="sm" fontWeight="medium">
                Email
              </Text>
              <Text fontSize="sm">{user.email}</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text fontSize="sm" fontWeight="medium">
                Creation Date and Time
              </Text>
              <Text fontSize="sm">{user.created_at}</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text fontSize="sm" fontWeight="medium">
                Gender
              </Text>
              <Text fontSize="sm">{user.gender}</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text fontSize="sm" fontWeight="medium">
                Role
              </Text>
              <Text fontSize="sm">{user.role}</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text fontSize="sm" fontWeight="medium">
                Date of Birth
              </Text>
              <Text fontSize="sm">{user.dob}</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text fontSize="sm" fontWeight="medium">
                Education Background
              </Text>
              <Text fontSize="sm">{user.educationalBackground}</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text fontSize="sm" fontWeight="medium">
                Immigration Status
              </Text>
              <Text fontSize="sm">{user.immigration}</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text fontSize="sm" fontWeight="medium">
                Occupation
              </Text>
              <Text fontSize="sm">{user.occupation}</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text fontSize="sm" fontWeight="medium">
                School (if any)
              </Text>
              <Text fontSize="sm">{user.school || "NIL"}</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text fontSize="sm" fontWeight="medium">
                Skills
              </Text>
              <Flex gap={2}>
                {user.skills ? (
                  skills.map((skill) => {
                    return <Text fontSize="sm"> {skill}</Text>;
                  })
                ) : (
                  <Text fontSize="sm">"NIL"</Text>
                )}
              </Flex>
            </Flex>
          </Flex>
        </Grid>
      )}
    </>
  );
}
