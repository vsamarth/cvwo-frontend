import { Flex, Container, Heading, HStack, VStack } from "@chakra-ui/react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Tasks from "../components/TaskContainer";
import TaskCreate from "../components/TaskCreate";
import { useTypedSelector } from "../store";

function Home() {
  const user = useTypedSelector((state) => state.user);
  const loggedIn = !(user.token === "" || user.token === null);

  const location = useLocation();
  console.log(user, loggedIn);
  if (!loggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <Flex minHeight="100vh">
      <Sidebar />
      <Container maxW="container.md" py="4">
        <Heading textAlign="center" fontWeight="extrabold">
          Todo App
        </Heading>

        <HStack spacing={4}></HStack>
        {/* <InputTask /> */}
        <VStack align="stretch" spacing={8}>
          <Tasks />
          <TaskCreate />
        </VStack>
      </Container>
    </Flex>
  );
}

export default Home;
