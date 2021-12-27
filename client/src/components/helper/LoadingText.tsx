import React from "react";
import { Typography } from "@mui/material";

interface LoadingTextProps {}

export const LoadingText: React.FC<LoadingTextProps> = ({ children }) => {
  return (
    <Typography variant="h3" color="primary" fontWeight="bold">
      {children}
    </Typography>
  );
};
