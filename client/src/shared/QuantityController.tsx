import { Add, Remove } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { Flex } from "./Flex";

interface QuantityControllerProps {
  value: number;
  onPlusButtonClick: () => void;
  onMinusButtonClick: () => void;
}

export const QuantityController: React.FC<QuantityControllerProps> = ({
  value,
  onPlusButtonClick,
  onMinusButtonClick,
}) => {
  return (
    <Flex style={{ gap: "1rem", justifyContent: "" }}>
      <IconButton onClick={onPlusButtonClick}>
        <Add />
      </IconButton>
      <Typography>{value}</Typography>
      <IconButton onClick={onMinusButtonClick}>
        <Remove />
      </IconButton>
    </Flex>
  );
};
