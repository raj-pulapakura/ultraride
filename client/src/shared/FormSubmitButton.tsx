import { Button, ButtonProps } from "@mui/material";
import React from "react";

type FormSubmitButtonProps = {} & ButtonProps;

export const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <Button {...props} type="submit" variant="contained" fullWidth>
      {children}
    </Button>
  );
};
