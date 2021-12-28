import {
  Typography,
  TextField,
  Button,
  BaseTextFieldProps,
  Box,
} from "@mui/material";
import React, { useEffect } from "react";
import { CenterContainer } from "./CenterContainer";
import { useMainFormStyles } from "./MainForm.styles";

interface MainFormProps {
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

export const MainForm: React.FC<MainFormProps> = ({
  onSubmit,
  fields,
  title,
  button,
  children,
}) => {
  const classes = useMainFormStyles();
  return (
    <CenterContainer marginTop="2rem">
      <form onSubmit={onSubmit}>
        <Typography
          className={classes.formTitle}
          variant="h2"
          fontWeight="bold"
          color="primary"
          marginBottom="1.25rem"
          fontSize="clamp(2rem, 30px, 20rem)"
        >
          {title}
        </Typography>
        {fields.map((field) => (
          <div key={field.label}>
            <TextField
              label={field.label}
              type={field.type || "text"}
              variant="outlined"
              value={field.value}
              onChange={field.onChange}
              error={!!field.error}
              fullWidth
              required
              sx={{ marginBottom: field.error ? "0.25rem" : "1rem" }}
            />
            <Box sx={{ marginBottom: field.error ? "1rem" : "0" }}>
              <Typography color="error" variant="caption">
                {field.error}
              </Typography>
            </Box>
          </div>
        ))}

        <Button type="submit" variant="contained" fullWidth>
          {button}
        </Button>
        {children}
      </form>
    </CenterContainer>
  );
};
