import React from "react";
import { Box } from "@mui/material";
import { NavbarControls } from "./NavbarControls";
import { SearchBar } from "./SearchBar";
import { useNavbarStyles } from "./Navbar.styles";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const classes = useNavbarStyles();

  return (
    <Box className={classes.navbar}>
      <Box className={classes.navbarInner}>
        <NavbarControls />
        <SearchBar marginTop="0.5rem" />
      </Box>
    </Box>
  );
};
