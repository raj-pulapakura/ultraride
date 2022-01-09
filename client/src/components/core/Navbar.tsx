import React from "react";
import { Box } from "@mui/material";
import { NavbarControls } from "./NavbarControls";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <Box
      sx={{
        background: "#000",
        padding: "1rem 2rem",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 100,
        boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.5)",
      }}
    >
      <NavbarControls />
    </Box>
  );
};
