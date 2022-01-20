import { Box, Heading, Text, Link, BoxProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import SignupForm from "../components/SignupForm";
import {Link as RouterLink} from 'react-router-dom'

function FormContainer(props: BoxProps) {
  return <Box
    bg="white"
    py="8"
    px={{ base: "4", md: "10" }}
    shadow="base"
    rounded='md'
{...props}
  />;
}

function Login() {
  return (
    <Box bg="gray.50" minHeight="100vh" py={12} px={8}>
      <Box maxWidth="md" mx="auto">
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
          Create a new account
        </Heading>
        <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
          <Text as="span">Already a user?</Text>
          <Link to='/login' as={RouterLink} ml={1} href="#" color="red.500" _hover={{ color: "red.600" }}>
            Sign in!
          </Link>
        </Text>
        <FormContainer>
            <SignupForm />
        </FormContainer>
      </Box>
    </Box>
  );
}

export default Login;
