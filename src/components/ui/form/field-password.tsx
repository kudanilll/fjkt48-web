"use client";
import { Box, IconButton, Text, TextField } from "@radix-ui/themes";
import { BiHide, BiShow } from "react-icons/bi";
import { useState } from "react";
import { type FieldErrors } from "react-hook-form";

type FormFieldPassProps = {
  label: string;
  regLabel?: string | undefined;
  placeholder: string;
  errors: FieldErrors;
  register: any;
  options?: any | undefined;
};

export default function FormFieldPassword(props: FormFieldPassProps) {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
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
        type={hidePassword ? "password" : "text"}
        {...props.register(label, props.options ?? props.options)}
        required>
        <TextField.Slot />
        <TextField.Slot>
          <IconButton
            size="2"
            variant="ghost"
            type="button"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              setHidePassword(!hidePassword);
            }}>
            {hidePassword ? <BiHide /> : <BiShow />}
          </IconButton>
        </TextField.Slot>
      </TextField.Root>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </Box>
  );
}
