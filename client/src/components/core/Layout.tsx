import React from "react";
import { NavBar } from "./Navbar";
import { Box } from "@mui/material";
import { Menu } from "./Menu";
import { useLayoutStyles } from "./Layout.styles";
import { Footer } from "./Footer";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const classes = useLayoutStyles();

  return (
    <>
      <NavBar />
      <Menu />
      <Box className={classes.page}>{children}</Box>
      {/* <Footer`  `  /> */}
    </>
  );
};
