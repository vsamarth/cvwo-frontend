import { FormControl, FormLabel, Input, InputProps } from "@chakra-ui/react";
import { useField } from "formik";

function InputField({
  id,
  label,
  name,
  ...props
}: InputProps & { label: string; name: string; id: string }) {
  const [field, meta, helpers] = useField(name);
  const isInvalid = props.isInvalid || !!(meta.touched && meta.error);
  return (
    <FormControl id={id}>
      <FormLabel
        top={-3}
        left={2}
        zIndex={1000}
        px={2}
        bg="white"
        position={"absolute"}
        color={isInvalid ? "red.500" : "gray.500"}
      >
        {label}
      </FormLabel>
      <Input {...props} {...field} />
    </FormControl>
  );
}

export default InputField;
