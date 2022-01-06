import { Box, Typography, BoxProps } from "@mui/material";
import React from "react";

type FeatureBoxProps = {
  title: string;
  description: string;
} & BoxProps;

export const FeatureBox: React.FC<FeatureBoxProps> = ({
  title,
  description,
  ...props
}) => {
  return (
    <Box {...props}>
      <Typography
        color="secondary"
        sx={{ textTransform: "uppercase", letterSpacing: "2px" }}
        variant="subtitle1"
        gutterBottom
      >
        {title}
      </Typography>
      <Typography variant="h6" fontWeight="normal">
        {description}
      </Typography>
    </Box>
  );
};
