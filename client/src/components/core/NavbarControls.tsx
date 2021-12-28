import React from "react";
import { IconButton, Typography } from "@mui/material";
import { Flex } from "../helper/Flex";
import { Menu, ShoppingCart } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { setMenuOpen } from "../../store/design/designActions";
import { useNavigate } from "react-router-dom";
import { useNavbarControlsStyles } from "./NavbarControls.styles";

interface NavbarControlsProps {}

export const NavbarControls: React.FC<NavbarControlsProps> = ({}) => {
  const classes = useNavbarControlsStyles();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onMenuButtonClick = () => {
    dispatch(setMenuOpen(true));
  };

  const onCartButtonClick = () => {
    navigate("/cart");
  };

  return (
    <Flex className={classes.controls}>
      <IconButton onClick={onMenuButtonClick}>
        <Menu htmlColor="white" />
      </IconButton>
      <Typography className={classes.brand} variant="h5" fontWeight="bold">
        Ecom-Express
      </Typography>
      <IconButton onClick={onCartButtonClick}>
        <ShoppingCart htmlColor="white" />
      </IconButton>
    </Flex>
  );
};
