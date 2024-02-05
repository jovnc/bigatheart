"use client";
import { registerForEvent } from "@actions/eventActions";
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

export default function EventRegistrationForm({
  isOpen,
  onClose,
  name,
  id,
  datetime,
  duration,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const action = handleSubmit(async (data) => {
    try {
      const res = await registerForEvent(data, id);
      toast.success(`Successfully registered for ${name}`);
      onClose();
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
        <ModalHeader mr={10}>Registration Form</ModalHeader>
        <ModalCloseButton />
        <form action={action}>
          <ModalBody>
            <FormControl isInvalid={errors.remarks} className="mt-5">
              <FormLabel htmlFor="remarks">Remarks</FormLabel>
              <Textarea
                id="remarks"
                placeholder="Additional notes for organiser"
                {...register("remarks")}
                size="sm"
              />

              <FormErrorMessage>
                {errors.remarks && errors.remarks.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={errors.confirmRegistration}
              className="mt-5"
              isRequired
            >
              <Checkbox
                {...register("confirmRegistration", {
                  required:
                    "Please agree to the terms to complete registration",
                })}
              >
                I confirm that I want to register for{" "}
                <span className="font-semibold">Event: {name}</span> on{" "}
                <span className="font-semibold">{datetime}</span> that will last
                for <span className="font-semibold">{duration} mins</span>.
              </Checkbox>

              <FormErrorMessage>
                {errors.confirmRegistration &&
                  errors.confirmRegistration.message}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose} isLoading={isSubmitting}>
              Close
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              Confirm Registration
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
