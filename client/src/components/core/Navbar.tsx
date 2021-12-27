import React from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { theme } from "../../theme";
import { NavbarControls } from "./NavbarControls";
import { SearchBar } from "./SearchBar";

const useStyles = makeStyles({
  navbar: {
    background: theme.palette.primary.main,
    padding: "1rem 2rem",
  },
  navbarInner: {
    // background: "white",
  },
  brand: {
    color: "white",
  },
});

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const classes = useStyles();

  return (
    <Box className={classes.navbar}>
      <Box className={classes.navbarInner}>
        <NavbarControls />
        <SearchBar marginTop="0.5rem" />
      </Box>
    </Box>
  );
};
