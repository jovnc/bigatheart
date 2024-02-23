import { getEventPin } from "@actions/eventActions";
import {
  Button,
  Checkbox,
  Flex,
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
  PinInput,
  PinInputField,
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
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const action = handleSubmit(async (data) => {
    try {
      if (data.confirmAttendance) {
        const PIN = await getEventPin(eventid);
        if (data.pin != PIN) {
          onClose();
          toast.error("Incorrect attendance PIN");
        } else {
          const { error } = await updateMyAttendance(
            eventid,
            volunteerid,
            data.reflection,
            data.pin
          );
          toast.success(
            `Confirmed attendance for event, please wait for admin to approve your request`
          );
          onClose();
        }
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

            <Flex flexDir="column" gap={2}>
              <FormLabel fontSize="sm" mt={3}>
                Attendance PIN
              </FormLabel>

              <FormControl isInvalid={errors.pin} isRequired pb={5}>
                <PinInput
                  {...register("pin", {
                    required: "Please enter attendance PIN",
                    minLength: {
                      value: 4,
                      message: "Please input PIN",
                    },
                  })}
                  onComplete={() => {}}
                  onChange={(e) => {
                    setValue("pin", e);
                  }}
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>

                <FormErrorMessage>
                  {errors.pin && errors.pin.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>

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
