import React from "react";
import { Button, Typography } from "@mui/material";
import { FloatContainer } from "./FloatContainer";

interface LoadingTextProps {
  actionText?: string;
  actionButton?: string;
  actionButtonOnClick?: () => void;
}

export const LoadingText: React.FC<LoadingTextProps> = ({
  children,
  actionText,
  actionButton,
  actionButtonOnClick,
}) => {
  return (
    <FloatContainer textCentered noBackground>
      {actionText && (
        <Typography variant="h5" fontWeight="bold">
          {actionText}
        </Typography>
      )}
      {actionButton && (
        <Button
          variant="contained"
          sx={{ marginTop: "1rem" }}
          onClick={actionButtonOnClick}
        >
          {actionButton}
        </Button>
      )}
      {children}
    </FloatContainer>
  );
};
