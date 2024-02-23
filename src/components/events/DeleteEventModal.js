"use client";

import { deleteEvent } from "@actions/eventActions";
import {
  Button,
  Flex,
  MenuItem,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import toast from "react-hot-toast";

export default function DeleteEventModal({ event_id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const action = async () => {
    try {
      const res = await deleteEvent(event_id);
      toast.success("Successfully deleted event");
    } catch (error) {
      toast.error("Failed to delete event");
    }
  };

  return (
    <>
      <MenuItem onClick={onOpen}>
        <Text>Delete Event</Text>
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
          <Flex className="p-5" flexDir="column" gap={4}>
            <Text textAlign="center" fontWeight="bold" fontSize="lg">
              Delete Event
            </Text>
            <Text textAlign="center">
              Are you sure you want to delete the event? This action is
              irreversible and all event participants and event information will
              be deleted permanently
            </Text>
          </Flex>

          <ModalFooter className="flex gap-3">
            <Button className="bg-red-500 text-white " onClick={action}>
              Confirm Delete
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
