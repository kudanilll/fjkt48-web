"use client";
import { Box, Text, TextField } from "@radix-ui/themes";

type FormFieldProps = {
  label: string;
  regLabel?: string | undefined;
  placeholder: string;
  type: "text" | "email";
  register: any;
  options?: any | undefined;
};

export default function FormField(props: FormFieldProps) {
  return (
    <Box>
      <Text size="2">{props.label}</Text>
      <TextField.Root
        size="3"
        placeholder={props.placeholder}
        type={props.type}
        {...props.register(
          props.regLabel
            ? props.regLabel
            : props.label.toLowerCase().replaceAll(" ", "_"),
          props.options ?? props.options
        )}
        required>
        <TextField.Slot />
      </TextField.Root>
    </Box>
  );
}
