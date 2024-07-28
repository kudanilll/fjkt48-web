"use client";
import { Box, IconButton, Text, TextField } from "@radix-ui/themes";
import { BiHide, BiShow } from "react-icons/bi";
import { useState } from "react";

type FormFieldPassProps = {
  label: string;
  regLabel?: string | undefined;
  placeholder: string;
  register: any;
  options?: any | undefined;
};

export default function FormFieldPassword(props: FormFieldPassProps) {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  return (
    <Box>
      <Text size="2">{props.label}</Text>
      <TextField.Root
        size="3"
        placeholder={props.placeholder}
        type={hidePassword ? "password" : "text"}
        {...props.register(
          props.regLabel
            ? props.regLabel
            : props.label.toLowerCase().replaceAll(" ", "_"),
          props.options ?? props.options
        )}
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
    </Box>
  );
}
