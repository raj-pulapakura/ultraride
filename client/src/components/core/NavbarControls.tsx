import React, { useEffect, useRef } from "react";
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  Badge,
  Tooltip,
} from "@mui/material";
import { Flex } from "../wrappers/Flex";
import { LocalOffer, Menu } from "@mui/icons-material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { setMenuOpen } from "../../store/menu/menuActions";
import { Link, useNavigate } from "react-router-dom";
import { useNavbarControlsStyles } from "./NavbarControls.styles";
import { BRAND_NAME } from "../../constants";
import { brandFont, theme } from "../../theme";
import { SearchBarIcon } from "./SearchBarIcon";
import { StoreState } from "../../store";
import { AccountDetailsIcon } from "./AccountDetailsIcon";

interface NavbarControlsProps {}

export const NavbarControls: React.FC<NavbarControlsProps> = ({}) => {
  const classes = useNavbarControlsStyles();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector<StoreState>(
    (state) => state.cart.items
  ) as StoreState["cart"]["items"];

  const totalItems = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const onMenuButtonClick = () => {
    dispatch(setMenuOpen(true));
  };

  const onLinkClick = (path: string) => {
    navigate(path);
  };

  const screenIsSmall = useMediaQuery(theme.breakpoints.up("sm"));
  const screenIsMedium = useMediaQuery(theme.breakpoints.up("md"));

  const Brand = (
    <Flex style={{ gap: "1rem" }}>
      <Typography
        className={classes.brand}
        variant="h5"
        fontFamily={brandFont}
        fontWeight="bold"
      >
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          {BRAND_NAME.toUpperCase()}
        </Link>
      </Typography>
    </Flex>
  );

  return (
    <>
      <Flex>
        {screenIsMedium ? (
          <>
            <Flex style={{ gap: "0.5rem" }}>
              <AccountDetailsIcon />
              <IconButton onClick={() => onLinkClick("/products")}>
                <LocalOffer htmlColor="white" />
              </IconButton>
            </Flex>
            {Brand}
            <Flex style={{ gap: "0.5rem" }}>
              <IconButton onClick={() => onLinkClick("/cart")}>
                <ShoppingCart htmlColor="white" />
              </IconButton>
              <SearchBarIcon />
            </Flex>
          </>
        ) : screenIsSmall ? (
          <>
            <Flex style={{ gap: "0.5rem" }}>
              <AccountDetailsIcon />
              <IconButton onClick={() => onLinkClick("/products")}>
                <LocalOffer htmlColor="white" />
              </IconButton>
            </Flex>
            {Brand}
            <Flex style={{ gap: "0.5rem" }}>
              <IconButton onClick={() => onLinkClick("/cart")}>
                <ShoppingCart htmlColor="white" />
              </IconButton>
              <SearchBarIcon />
            </Flex>
          </>
        ) : (
          <>
            <IconButton onClick={onMenuButtonClick}>
              <Menu htmlColor="white" />
            </IconButton>
            {Brand}
            <SearchBarIcon />
          </>
        )}
      </Flex>
    </>
  );
};
