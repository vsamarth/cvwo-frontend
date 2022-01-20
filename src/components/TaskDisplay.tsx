import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { Box, Flex, HStack, Spacer, Text } from "@chakra-ui/layout";
import { ChangeEvent, ReactElement, ReactNode, useRef, useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  useDisclosure,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "../store/api/tasks";
import { selectFilter } from "../store/filter";
import { Filter, Task } from "../store/types";
import { HiTrash, HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";

function shouldDisplayTask(task: Task, filter: Filter) {
  return (
    filter === Filter.All ||
    (filter === Filter.Completed && task.completed) ||
    !task.completed
  );
}

function TaskDisplay({ task }: { task: Task }) {
  const [updateTask, { isLoading }] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  let { id, description, completed } = task;



  const actions: Action[] = [
    {
      icon: <HiOutlinePencil />,
      handler: () => alert("Editing"),
      label: "Edit the task",
    },
    {
      icon: <HiOutlineTrash />,
      handler: () => {
        deleteTask({ id });
      },
      label: "Delete the task",
    },
  ];

  return (
    <Flex role="group" justifyContent="center" alignItems="center">
      <Checkbox
        type="checkbox"
        // value={completed}
        size="lg"
        colorScheme={"red"}
        borderRadius="full"
        defaultChecked={completed}
        onChange={(event) => {
          updateTask({ id, completed: event.target.checked });
          // event.preventDefault
        }}
      />
      <Text
        p={2}
        color={completed ? "gray.500" : "gray.600"}
        cursor={"pointer"}
        textDecoration={completed ? "line-through" : undefined}
        onClick={() => {
          updateTask({ id, completed: !completed });
        }}
      >
        {description}
      </Text>
      <Spacer />
      <HStack>
        {actions.map((action, idx) => {
          return <ActionButton key={idx} {...action} />;
        })}
      </HStack>
      <DeleteConfirmation />
    </Flex>
  );
}

type Action = {
  icon: ReactElement<any, any>;
  handler: () => void;
  label: string;
};

function ActionButton(props: Action) {
  return (
    <IconButton
      aria-label={props.label}
      variant={"ghost"}
      size="lg"
      minWidth="fit-content"
      height="fit-content"
      p={1}
      color="gray.500"
      _hover={{ color: "gray.700" }}
      icon={props.icon}
      display={"none"}
      _groupHover={{ display: "inline" }}
      onClick={props.handler}
    />
  );
}

function DeleteConfirmation(props: {
  onConfirm?: () => void;
  onCancel?: () => void;
  isOpen?: boolean;
}) {
  const initialRef = useRef();
  const {isOpen,onClose, onOpen} = useDisclosure();
  return (
    <>

      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Task</ModalHeader>
          <ModalBody>
            Are you sure you want to delete <b>task</b>.
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="red" ref={initialRef}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default TaskDisplay;
