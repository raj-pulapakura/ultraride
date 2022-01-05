import { BaseTextFieldProps } from "@mui/material";
import React, { useEffect } from "react";
import { FormContainer } from "./FormContainer";
import { FormSubmitButton } from "./FormSubmitButton";
import { FormTitle } from "./FormTitle";
import { SimpleFormControl } from "./SimpleFormControl";

interface SimpleFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  fields: Array<{
    label: string;
    type?: string;
    value: BaseTextFieldProps["value"];
    error?: string | null;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  }>;
  title: string;
  button: string;
}

export const SimpleForm: React.FC<SimpleFormProps> = ({
  onSubmit,
  fields,
  title,
  button,
  children,
}) => {
  return (
    <FormContainer>
      <form onSubmit={onSubmit}>
        <FormTitle>{title}</FormTitle>
        {fields.map((field) => (
          <SimpleFormControl
            key={field.label}
            label={field.label}
            type={field.type}
            value={field.value}
            onChange={field.onChange}
            error={field.error || ""}
          />
        ))}
        <FormSubmitButton>{button}</FormSubmitButton>
        {children}
      </form>
    </FormContainer>
  );
};
