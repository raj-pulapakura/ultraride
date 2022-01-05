import { ChevronLeft } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

interface BackToLinkProps {
  to: string;
  label: string;
}

export const BackToLink: React.FC<BackToLinkProps> = ({ to, label }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
      <ChevronLeft />
      <Typography>
        <Link to={to} style={{ textDecoration: "none", color: "black" }}>
          {label}
        </Link>
      </Typography>
    </Box>
  );
};
