import {
  Flex,
  Text,
  Box,
  Grid,
  Divider,
  Avatar,
  GridItem,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaCalendar, FaTrophy } from "react-icons/fa6";

export default function VolunteerLeaderboard({ userData }) {
  // fetch all eventinfo data

  const userDataClean = userData.map((user) => {
    const duration = user.eventinfo.reduce(
      (prev, curr) => prev + curr.events.duration,
      0
    );
    const peopleImpacted = user.eventinfo.reduce(
      (prev, curr) => prev + curr.events.peopleImpacted,
      0
    );
    return {
      first_name: user.first_name,
      last_name: user.last_name,
      avatar: user.avatar,
      user_id: user.user_id,
      duration,
      peopleImpacted,
    };
  });

  const sortedUsers = userDataClean.sort((a, b) => {
    return b.duration - a.duration;
  });

  const firstThreeUsers = sortedUsers.slice(0, 3);

  const nextTenUsers = sortedUsers.slice(3, 13);

  return (
    <Flex flexDir="column" className="w-full shadow-lg rounded-md pb-5" gap={4}>
      <Flex className="w-full my-3 bg-rose-400 rounded-md p-4 opacity-50">
        <Text fontWeight="bold" fontSize="xl" className="text-white mx-auto">
          Volunteer Leaderboard
        </Text>
      </Flex>
      <Grid templateColumns="1fr 1fr 1fr" gap={2}>
        <Flex flexDir="column" gap={2} align="center" mt={4}>
          <div className="relative ">
            <div className="absolute blur -inset-1 bg-gradient-to-r from-yellow-400 via-transparent to-yellow-400 rounded-full mix-blend-overlay w-16 h-16" />

            <Avatar
              src={firstThreeUsers[1].avatar}
              className="avatar_logo_lg"
              zIndex="1"
            />
          </div>
          <Text>{`${firstThreeUsers[1].first_name} ${firstThreeUsers[1].last_name}`}</Text>

          <Divider className="w-1/2" />
          <Box className="flex" gap={2}>
            <FaCalendar />
            <Text fontSize="sm">
              Duration: {firstThreeUsers[1].duration} mins
            </Text>
          </Box>
          <Button
            className="border-[2px] border-black hover:text-white hover:bg-black"
            size="sm"
          >
            <Link href={`/users/${firstThreeUsers[1].user_id}`}>
              View Profile
            </Link>
          </Button>
          <Box className="bg-neutral-300 p-2 rounded-lg w-8">
            <FaTrophy />
          </Box>
        </Flex>

        <Flex flexDir="column" gap={2} align="center">
          <div className="relative ">
            <div className="absolute blur -inset-1 bg-gradient-to-r from-yellow-400 via-transparent to-yellow-400 rounded-full mix-blend-overlay w-16 h-16" />

            <Avatar
              src={firstThreeUsers[0].avatar}
              className="avatar_logo_lg"
              zIndex="1"
            />
          </div>
          <Text>{`${firstThreeUsers[0].first_name} ${firstThreeUsers[0].last_name}`}</Text>

          <Divider className="w-1/2" />
          <Box className="flex" gap={2}>
            <FaCalendar />
            <Text fontSize="sm">
              Duration: {firstThreeUsers[0].duration} mins
            </Text>
          </Box>

          <Button
            className="border-[2px] border-black hover:text-white hover:bg-black"
            size="sm"
          >
            <Link href={`/users/${firstThreeUsers[0].user_id}`}>
              View Profile
            </Link>
          </Button>

          <Box className="bg-amber-300 p-2 rounded-lg w-8">
            <FaTrophy />
          </Box>
        </Flex>

        <Flex flexDir="column" gap={2} align="center" mt={8}>
          <div className="relative ">
            <div className="absolute blur -inset-1 bg-gradient-to-r from-yellow-400 via-transparent to-yellow-400 rounded-full mix-blend-overlay w-16 h-16" />

            <Avatar
              src={firstThreeUsers[2].avatar}
              className="avatar_logo_lg"
              zIndex="1"
            />
          </div>
          <Text>{`${firstThreeUsers[2].first_name} ${firstThreeUsers[2].last_name}`}</Text>

          <Divider className="w-1/2" />
          <Box className="flex" gap={2}>
            <FaCalendar />
            <Text fontSize="sm">
              Duration: {firstThreeUsers[2].duration} mins
            </Text>
          </Box>
          <Button
            className="border-[2px] border-black hover:text-white hover:bg-black"
            size="sm"
          >
            <Link href={`/users/${firstThreeUsers[2].user_id}`}>
              View Profile
            </Link>
          </Button>
          <Box className="bg-amber-600 p-2 rounded-lg w-8">
            <FaTrophy />
          </Box>
        </Flex>
      </Grid>

      <Grid
        templateColumns="1fr 1fr 1fr"
        gap={1}
        className="translate-y-[-40px]"
      >
        <Box
          className="bg-rose-300 p-2 rounded-lg w-full h-[100px] mx-auto opacity-50 hover:shadow-lg"
          alignSelf="flex-end"
        ></Box>

        <Box
          className="bg-rose-300 p-2 rounded-lg w-full h-[150px] mx-auto opacity-50 hover:shadow-lg"
          alignSelf="flex-end"
        />

        <Box
          className="bg-rose-300 p-2 rounded-lg w-full h-[50px] mx-auto opacity-50 hover:shadow-lg"
          alignSelf="flex-end"
        />
      </Grid>

      <Divider mt={4} />
      <Grid templateColumns="0.5fr 2fr 1fr 1fr" px={4}>
        <Text fontWeight="bold">Place</Text>
        <Text fontWeight="bold">Name</Text>
        <Text fontWeight="bold">Duration</Text>
        <GridItem />
      </Grid>
      {nextTenUsers.map((user, i) => {
        return (
          <Grid
            key={i}
            templateColumns="0.5fr 2fr 1fr 1fr"
            px={4}
            className="bg-slate-100 bg-opacity-50 py-1 mx-2 rounded-lg"
          >
            <GridItem className="flex gap-2 items-center">
              <FaTrophy className="opacity-50" />
              <Text>{i + 4}</Text>
            </GridItem>
            <GridItem className="flex gap-5 items-center">
              <Avatar src={user.avatar} className="avatar_logo" />
              <Text>{`${user.first_name} ${user.last_name}`}</Text>
            </GridItem>
            <GridItem className="flex gap-5 items-center">
              <Text>{user.duration} mins</Text>
            </GridItem>
            <GridItem className="flex gap-5 items-center">
              <Button
                className="border-[2px] border-black hover:text-white hover:bg-black"
                size="sm"
              >
                <Link href={`/users/${user.user_id}`}>View Profile</Link>
              </Button>
            </GridItem>
          </Grid>
        );
      })}
    </Flex>
  );
}
