import { TextField, Box, Typography } from "@mui/material";
import React from "react";

interface SimpleFormControlProps {
  label: string;
  type?: string;
  value: any;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  error: string;
}

export const SimpleFormControl: React.FC<SimpleFormControlProps> = ({
  label,
  type,
  value,
  onChange,
  error,
}) => {
  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        label={label}
        type={type || "text"}
        variant="outlined"
        value={value}
        onChange={onChange}
        error={!!error}
        required
        sx={{ marginBottom: error ? "0.25rem" : "1rem", width: "100%" }}
      />
      <Box sx={{ marginBottom: error ? "1rem" : "0" }}>
        <Typography color="error" variant="caption">
          {error}
        </Typography>
      </Box>
    </Box>
  );
};
