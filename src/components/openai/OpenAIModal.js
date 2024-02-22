"use client";

import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import DescriptionHelper from "./DescriptionHelper";

export default function OpenAIModal({ setValue }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        className="border-[2px] border-black hover:text-white hover:bg-black"
        size="sm"
      >
        Generate
      </Button>

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        children
      >
        <ModalOverlay />
        <ModalContent minW="500px" maxW="700px">
          <DescriptionHelper setValue={setValue} onClose={onClose} />

          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
