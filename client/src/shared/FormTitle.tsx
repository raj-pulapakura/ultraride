import { Typography } from "@mui/material";
import React from "react";

interface FormTitleProps {}

export const FormTitle: React.FC<FormTitleProps> = ({ children }) => {
  return (
    <Typography
      variant="h2"
      fontWeight="bold"
      marginBottom="1.25rem"
      sx={{ color: "#000" }}
      fontSize="clamp(2rem, 30px, 20rem)"
    >
      {children}
    </Typography>
  );
};
