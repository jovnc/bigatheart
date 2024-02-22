import { getAllUserDetails } from "@actions/userActions";
import { Flex } from "@chakra-ui/react";
import Container from "@components/Container";
import UpdateAvatarForm from "@components/settings/UpdateAvatarForm";
import UpdateUserFormPage from "@components/settings/UpdateUserFormPage";

export default async function page() {
  const { userData } = await getAllUserDetails();
  return (
    <Flex flexDir="column" gap={8}>
      <Container>
        <UpdateAvatarForm data={userData[0]} />
      </Container>
      <Container>
        <UpdateUserFormPage data={userData[0]} />
      </Container>
    </Flex>
  );
}
