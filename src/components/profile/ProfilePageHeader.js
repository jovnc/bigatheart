import { Avatar, Badge, Flex, Text } from "@chakra-ui/react";
import { FaFemale, FaMale } from "react-icons/fa";
import { FaCalendar, FaGenderless } from "react-icons/fa6";

const COLORS = [
  "green",
  "red",
  "orange",
  "yellow",
  "teal",
  "pink",
  "twitter",
  "instagram",
];

export default function ProfilePageHeader({ userProfile }) {
  const { created_at, avatar, first_name, last_name, gender, role, skills } =
    userProfile;

  return (
    <Flex flexDir="column" gap={4}>
      <Flex className="w-full">
        <Flex gap={4}>
          <Avatar size="lg" src={avatar} />
          <Flex gap={1} flexDir="column">
            <Text fontWeight="bold" fontSize="2xl">
              {`${first_name} ${last_name}`}
            </Text>
            <Text fontSize="sm">{role}</Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex gap={2} flexWrap="wrap">
        {skills &&
          JSON.parse(skills).map((skill, i) => {
            return (
              <Badge
                colorScheme={COLORS[i % 8]}
                className="p-1 h-[24px] rounded-lg border border-black"
                fontSize="0.6em"
                key={i}
                variant="subtle"
              >
                {skill}
              </Badge>
            );
          })}
      </Flex>
      <Flex gap={2}>
        <FaCalendar />
        <Text fontSize="sm" fontWeight="medium">
          Account Created:
        </Text>
        <Text fontSize="sm">{new Date(created_at).toString()}</Text>
      </Flex>
      <Flex gap={2}>
        {gender == "Male" && <FaMale />}
        {gender == "Female" && <FaFemale />}
        {!gender || (gender == "Others" && <FaGenderless />)}
        <Text fontSize="sm" fontWeight="medium">
          Gender:
        </Text>
        <Text fontSize="sm">{gender}</Text>
      </Flex>
    </Flex>
  );
}
