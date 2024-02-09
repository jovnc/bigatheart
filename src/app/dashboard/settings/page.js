import { Flex } from "@chakra-ui/react";
import Container from "@components/Container";
import UpdateAvatarForm from "@components/settings/UpdateAvatarForm";
import UpdateUserFormPage from "@components/settings/UpdateUserFormPage";

export default async function page() {
  return (
    <Flex flexDir="column" gap={8}>
      <Container>
        <UpdateAvatarForm />
      </Container>
      <Container>
        <UpdateUserFormPage />
      </Container>
    </Flex>
  );
}
