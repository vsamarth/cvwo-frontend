import {
  FormControl,
  Box,
  Button,
  FormLabel,
  Input,
  Text,
  Flex,
  chakra,
  Fade,
  InputProps,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik, useField, useFormikContext } from "formik";
import { Logo } from "./Logo";

type LoginValues = {
  email: string;
  password: string;
  remember: boolean;
};

const initialValues: LoginValues = {
  email: "",
  password: "",
  remember: true,
};
import * as Yup from "yup";
import { ChangeEvent, ReactNode, useState } from "react";
import { useAuthenticateMutation } from "../store/api/user";
import { User } from "../store/types";
import { useAppDispatch, useTypedSelector } from "../store";
import { setCredentials } from "../store/user";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please provide a valid email address")
    .required("Please enter your email address"),
  password: Yup.string().required("Please enter your password"),
});

type FieldProps = {
  isInvalid: boolean;
  children: ReactNode;
};

const Label = ({ isInvalid, children }: FieldProps) => (
  <FormLabel
    top={-3}
    left={2}
    zIndex={1000}
    px={2}
    bg="white"
    position={"absolute"}
    color={isInvalid ? "red.500" : "gray.500"}
  >
    {children}
  </FormLabel>
);

const Field = (props: InputProps) => {
  return (
    <Input
      size="lg"
      fontSize="md"
      py="6"
      rounded="sm"
      paddingInline="4"
      focusBorderColor={props.isInvalid ? "red.300" : undefined}
      errorBorderColor="red.300"
      {...props}
    />
  );
};
const ErrorMessage = (props: FieldProps) => {
  return (
    <Fade unmountOnExit={false} in={props.isInvalid}>
      <Text mt="1" color="red.400">
        {props.children}
      </Text>
    </Fade>
  );
};
const EmailField = () => {
  const [field, meta, helpers] = useField("email");
  const { setErrors } = useFormikContext();

  const isError = !!(meta.touched && meta.error);
  //   console.log(field, meta);
  return (
    <FormControl id="email">
      <Label isInvalid={!!isError}>Email</Label>
      <Field
        autoComplete="email"
        isInvalid={isError}
        {...field}
        onChange={(e: ChangeEvent<any>) => {
          field.onChange(e);
          setErrors({});
        }}
      />
      <ErrorMessage isInvalid={isError}>{meta.error}</ErrorMessage>
    </FormControl>
  );
};

const PassowrdField = () => {
  const [field, meta, helpers] = useField("password");
  const { errors, setErrors } = useFormikContext<LoginValues>();

  let isError = !!(meta.touched && meta.error);
  if (errors && errors.email) {
    isError = false;
  }

  return (
    <FormControl id="password">
      <Label isInvalid={isError}>Password</Label>
      <Field
        type="password"
        isInvalid={isError}
        {...field}
        onChange={(e: ChangeEvent<any>) => {
          field.onChange(e);
          setErrors({});
        }}
      />
      <ErrorMessage isInvalid={isError}>{meta.error}</ErrorMessage>
    </FormControl>
  );
};

function LoginForm() {
  const [authenticate, { isLoading, error }] = useAuthenticateMutation();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const user = useTypedSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          const result = await authenticate({
            email: values.email,
            password: values.password,
          }).unwrap();

          dispatch(setCredentials(result));
          navigate("/");
        } catch (err) {
          console.log(err);
          setErrors({ email: "Invalid email address or password" });
        }
      }}
      validationSchema={LoginSchema}
      validateOnChange={false}
      validateOnBlur={false}
      validateOnMount={false}
    >
      {({ isSubmitting, errors, setStatus, status }) => {
        return (
          <Form
            onChange={() => {
              console.log(status);
            }}
          >
            <Flex
              flexDir="column"
              gap={10}
              justifyContent={"center"}
              alignItems={"center"}
              p={4}
            >
              <Box>
                <Logo />
              </Box>

              <EmailField />
              <PassowrdField />
              <Button
                my={2}
                type="submit"
                colorScheme="red"
                width="100%"
                fontSize="lg"
                h="48px"
                disabled={isSubmitting}
              >
                {!isSubmitting ? "Sign In" : <Spinner />}
              </Button>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
}

export default LoginForm;
