import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik, useFormikContext } from "formik";
import { useAddTagMutation } from "../store/api/tags";
type TaskCreateProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const initialValues = {
  description: "",
};

function TagCreate({ isOpen, onClose }: TaskCreateProps) {
  const [addTag, { isLoading, data }] = useAddTagMutation();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent px={6} py='4'>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(async () => {
              await addTag(values);
              onClose();
            }, 400);
          }}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <ModalHeader>Create a New Tag</ModalHeader>
              <ModalBody>
                <Field name="description" placeholder="Tag Name" as={Input} />
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button
                  colorScheme="red"
                  type="submit"
                  disabled={isSubmitting || values.description.trim() === ""}
                >
                  Create
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
}

export default TagCreate;
