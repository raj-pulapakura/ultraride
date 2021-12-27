import React from "react";
import { NavBar } from "./Navbar";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Menu } from "./Menu";

const useStyles = makeStyles({
  page: {
    margin: "1rem 1rem 1rem 1rem",
  },
});

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <NavBar />
      <Menu />
      <Box className={classes.page}>{children}</Box>
    </>
  );
};
