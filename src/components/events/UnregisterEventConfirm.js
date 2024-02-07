import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function UnregisterEventConfirm({
  onClose,
  isOpen,
  volunteerid,
  eventid,
  unregisterEvent,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const action = handleSubmit(async (data) => {
    try {
      if (data.confirmUnregister) {
        const { error } = await unregisterEvent(eventid, volunteerid);
        toast.success(`Successfully unregistered for event`);
        onClose();
      }
    } catch (error) {
      onClose();
      toast.error(error.message);
    }
  });

  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader mr={10} fontSize="md">
          Confirm Unregistration
        </ModalHeader>
        <ModalCloseButton />
        <form action={action}>
          <ModalBody>
            <Text fontSize="sm">
              You will be unregistering for the event, this action is
              irreversible.
            </Text>
            <FormControl isInvalid={errors.confirmUnregister} isRequired mt={3}>
              <Checkbox
                size="sm"
                {...register("confirmUnregister", {
                  required: "Please check the box to confirm unregistration",
                })}
              >
                I confirm that I want to unregister from the event
              </Checkbox>

              <FormErrorMessage>
                {errors.confirmUnregister && errors.confirmUnregister.message}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose} isLoading={isSubmitting} size="sm">
              Close
            </Button>
            <Button type="submit" isLoading={isSubmitting} size="sm">
              Confirm
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
