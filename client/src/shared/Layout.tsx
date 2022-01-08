import React from "react";
import { NavBar } from "./Navbar";
import { Box, Typography } from "@mui/material";
import { Menu } from "./Menu";
import { useMediaQuery } from "@mui/material";
import { theme } from "../theme";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const screenIsXSmall = useMediaQuery(theme.breakpoints.down("xs"));

  const layoutMargin = screenIsXSmall
    ? "5rem 1rem 1rem 1rem"
    : "7rem 2rem 1rem 2rem";

  return (
    <>
      <NavBar />
      <Menu />
      <Box sx={{ margin: layoutMargin }}>{children}</Box>
    </>
  );
};
