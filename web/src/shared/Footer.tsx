import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { grey } from "@mui/material/colors";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  const [footerIsVisible, setFooterIsVisible] = useState(false);

  return (
    <Box
      sx={{
        width: "100%",
        background: grey[900],
        position: "fixed",
        bottom: "0",
        padding: "1rem",
      }}
    >
      <Typography sx={{ color: "white" }}>
        ULTRARIDEULTRARIDEULTRARIDE ULTRARIDE
        ULTRARIDEULTRARIDEULTRARIDEULTRARIDEULTRARIDEULTRARIDEULTRARIDEULTRARIDEULTRARIDEULTRARIDEULTRARIDEULTRARIDEULTRARIDEULTRARIDEULTRARIDEULTRARIDEULTRARIDEULTRARIDEULTRARIDEULTRARIDE
      </Typography>
    </Box>
  );
};
