import React from "react";
import { IconButton, Typography } from "@mui/material";
import { Flex } from "../helper/Flex";
import { Menu, ShoppingCart } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setMenuOpen } from "../../store/menu/menuActions";
import { useNavigate } from "react-router-dom";
import { useNavbarControlsStyles } from "./NavbarControls.styles";
import { brandName } from "../../App";

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
        {brandName.toUpperCase()}
      </Typography>
      <IconButton onClick={onCartButtonClick}>
        <ShoppingCart htmlColor="white" />
      </IconButton>
    </Flex>
  );
};
