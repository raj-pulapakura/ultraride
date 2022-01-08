import { Box, BoxProps } from "@mui/material";
import React from "react";
import { useSimpleContainerStyles } from "./SimpleContainer.styles";

type SimpleContainerProps = {
  centered?: boolean;
} & BoxProps;

export const SimpleContainer: React.FC<SimpleContainerProps> = ({
  children,
  centered,
  ...props
}) => {
  const classes = useSimpleContainerStyles();
  return (
    <Box
      {...props}
      className={classes.simpleContainer}
      sx={{ textAlign: centered ? "center" : "left", ...props.sx }}
    >
      {children}
    </Box>
  );
};
