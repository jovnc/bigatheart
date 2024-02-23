"use client";

import {
  Button,
  MenuItem,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

export default function EditEventModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <MenuItem>
        <Text>Edit Event</Text>
      </MenuItem>

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        children
        isCentered
      >
        <ModalOverlay />
        <ModalContent minW="500px" maxW="700px">
          <Text>test</Text>

          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
