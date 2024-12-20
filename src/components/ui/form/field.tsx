"use client";
import { Box, Text, TextField } from "@radix-ui/themes";
import { type FieldErrors } from "react-hook-form";

type FormFieldProps = {
  label: string;
  regLabel?: string | undefined;
  placeholder: string;
  type: "text" | "email";
  errors: FieldErrors;
  register: any;
  options?: any | undefined;
};

export default function FormField(props: FormFieldProps) {
  const label = props.regLabel
    ? props.regLabel
    : props.label.toLowerCase().replaceAll(" ", "_");
  const error = props.errors?.[label]?.message as string | undefined;
  return (
    <Box>
      <Text size="2">{props.label}</Text>
      <TextField.Root
        size="3"
        placeholder={props.placeholder}
        type={props.type}
        {...props.register(label, props.options ?? props.options)}
        required>
        <TextField.Slot />
      </TextField.Root>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </Box>
  );
}
