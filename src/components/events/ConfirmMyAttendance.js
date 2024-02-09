import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ConfirmMyAttendance({
  isOpen,
  onClose,
  eventid,
  volunteerid,
  updateMyAttendance,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const action = handleSubmit(async (data) => {
    try {
      if (data.confirmAttendance) {
        const { error } = await updateMyAttendance(
          eventid,
          volunteerid,
          data.reflection
        );
        toast.success(
          `Confirmed attendance for event, please wait for admin to approve your request`
        );
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
          Confirm Attendance
        </ModalHeader>
        <ModalCloseButton />
        <form action={action}>
          <ModalBody>
            <Text fontSize="sm">
              You can only confirm your attendance AFTER you have attended the
              event, and received approval from your supervisor to confirm your
              attendance for the event.
            </Text>
            <FormLabel fontSize="sm" mt={3}>
              Reflection
            </FormLabel>
            <FormControl isInvalid={errors.reflection} isRequired>
              <Textarea
                fontSize="sm"
                {...register("reflection", {
                  required: "Please do a short reflection on your experience",
                })}
              />

              <FormErrorMessage>
                {errors.reflection && errors.reflection.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.reflection} isRequired mt={3}>
              <Checkbox
                size="sm"
                {...register("confirmAttendance", {
                  required:
                    "Please confirm your attendance by checking the box",
                })}
              >
                I confirm that I have attended the event
              </Checkbox>

              <FormErrorMessage>
                {errors.confirmAttendance && errors.confirmAttendance.message}
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
