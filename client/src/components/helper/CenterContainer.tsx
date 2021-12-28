import { Box, BoxProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useCenterContainerStyles } from "./CenterContainer.styles";

type CenterContainerProps = BoxProps;

export const CenterContainer: React.FC<CenterContainerProps> = ({
  children,
  ...props
}) => {
  const classes = useCenterContainerStyles();

  return (
    <Box {...props} className={classes.centerContainer}>
      {children}
    </Box>
  );
};
