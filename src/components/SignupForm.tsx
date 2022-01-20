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
} from "@chakra-ui/react";
import { Form, Formik, useField, useFormikContext } from "formik";
import { Logo } from "./Logo";
import * as Yup from "yup";
import { ChangeEvent, ReactNode, useState } from "react";
type SignupValues = {
  email: String;
  password: String;
  name: String;
};

const initialValues: SignupValues = {
  email: "",
  password: "",
  name: "",
};

const SignupSchema = Yup.object().shape({
  name: Yup.string().trim().required("Please enter your name"),
  email: Yup.string()
    .trim()
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
const NameField = () => {
  const [field, meta, helpers] = useField("name");
  const { setErrors } = useFormikContext();

  const isError = !!(meta.touched && meta.error);
  return (
    <FormControl id="name">
      <Label isInvalid={!!isError}>Name</Label>
      <Field
        autoComplete="name"
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
const EmailField = () => {
  const [field, meta, helpers] = useField("email");
  const { setErrors, errors } = useFormikContext<SignupValues>();

  let isError = !!(meta.touched && meta.error);
  if (errors && errors.name) {
    isError = false;
  }

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
  const { errors, setErrors } = useFormikContext<SignupValues>();

  let isError = !!(meta.touched && meta.error);
  if (errors && (errors.email || errors.name)) {
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
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
      validationSchema={SignupSchema}
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
              <NameField />
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
                {!isSubmitting ? "Create Account" : <Spinner />}
              </Button>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
}

export default LoginForm;
