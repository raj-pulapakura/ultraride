import React from "react";
import { NavBar } from "./navigation/Navbar";
import { Box } from "@mui/material";
import { Menu } from "./Menu";
import { useLayoutStyles } from "./Layout.styles";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const classes = useLayoutStyles();

  return (
    <>
      <NavBar />
      <Menu />
      <Box className={classes.page}>{children}</Box>
    </>
  );
};
