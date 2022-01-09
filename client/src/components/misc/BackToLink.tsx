import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

interface BackToLinkProps {
  to: string;
  label: string;
  direction?: "left" | "right";
  side?: "left" | "right";
}

export const BackToLink: React.FC<BackToLinkProps> = ({
  to,
  label,
  direction,
  side,
}) => {
  const chevronDirection = direction || "left";
  const chevronSide = side || "left";

  console.log({ chevronSide });

  return (
    <Box sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
      {chevronSide === "left" &&
        (chevronDirection === "left" ? <ChevronLeft /> : <ChevronRight />)}
      <Typography>
        <Link to={to} style={{ textDecoration: "none", color: "black" }}>
          {label}
        </Link>
      </Typography>
      {chevronSide === "right" &&
        (chevronDirection === "left" ? <ChevronLeft /> : <ChevronRight />)}
    </Box>
  );
};
