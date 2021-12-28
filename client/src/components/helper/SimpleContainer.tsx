import { Box } from "@mui/material";
import React from "react";
import { useSimpleContainerStyles } from "./SimpleContainer.styles";

interface SimpleContainerProps {
  centered?: boolean;
}

export const SimpleContainer: React.FC<SimpleContainerProps> = ({
  children,
  centered,
}) => {
  const classes = useSimpleContainerStyles();
  return (
    <Box
      className={classes.simpleContainer}
      sx={{ textAlign: centered ? "center" : "left" }}
    >
      {children}
    </Box>
  );
};
