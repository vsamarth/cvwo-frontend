import { StackDivider, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useTypedSelector } from "../store";
import { useGetTasksQuery } from "../store/api/tasks";
import { Filter, Task } from "../store/types";
import TaskDisplay from "./TaskDisplay";

function Tasks() {
  const filter = useTypedSelector((state) => state.filter);
  let { data: tasks, isLoading, isError, error } = useGetTasksQuery();
  // tasks = tasks.sort((a,b) => 0)
  if (isLoading) {
    return <div>Loading...</div>;
  }
  tasks = tasks.filter((t: Task) => {
    if (filter === Filter.All) {
      return true;
    } else if (filter === Filter.Pending) {
      return t.completed;
    } else {
      return !t.completed;
    }
  });

  return (
    <VStack
      divider={<StackDivider borderColor="gray.100" />}
      spacing={1}
      align="stretch"
    >
      {tasks.map((task: Task) => (
        <TaskDisplay
          task={task}
          key={task.id + 100 * (task.completed ? 1 : 0)}
        />
      ))}
    </VStack>
  );
}

export default Tasks;
