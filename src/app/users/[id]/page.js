import { getUserProfile } from "@actions/userActions";
import { Flex, Text } from "@chakra-ui/react";
import Container from "@components/Container";
import ProfilePageHeader from "@components/profile/ProfilePageHeader";
import ProfilePageStatistics from "@components/profile/ProfilePageStatistics";

export default async function page({ params }) {
  // fetch data from server
  const { userProfile } = await getUserProfile(params.id);

  return (
    <Container>
      <Flex gap={8} flexDir="column">
        <ProfilePageHeader userProfile={userProfile[0]} />
        <ProfilePageStatistics userProfile={userProfile[0]} />
      </Flex>
    </Container>
  );
}
