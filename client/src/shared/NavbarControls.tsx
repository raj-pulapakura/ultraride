import React, { useEffect, useRef } from "react";
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  Badge,
} from "@mui/material";
import { Flex } from "./Flex";
import {
  AccountCircle,
  LocalOffer,
  Menu,
  ShoppingCart,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMenuOpen } from "../store/menu/menuActions";
import { Link, useNavigate } from "react-router-dom";
import { useNavbarControlsStyles } from "./NavbarControls.styles";
import { brandName } from "../App";
import { brandFont, theme } from "../theme";
import { SearchBarIcon } from "./SearchBarIcon";
import { StoreState } from "../store";
import ultrarideLogoWhite from "../assets/ultraride-logo-white.svg";

interface NavbarControlsProps {}

export const NavbarControls: React.FC<NavbarControlsProps> = ({}) => {
  const classes = useNavbarControlsStyles();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector<StoreState>(
    (state) => state.cart.items
  ) as StoreState["cart"]["items"];

  const totalItems = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const navbarLinks: { text: string; to: string; icon: JSX.Element }[] = [
    {
      text: "SHOP",
      to: "/products",
      icon: <LocalOffer htmlColor="white" />,
    },
    {
      text: "CART",
      to: "/cart",
      icon: (
        <Badge badgeContent={totalItems} color="secondary">
          <ShoppingCart htmlColor="white" />
        </Badge>
      ),
    },
    {
      text: "ACCOUNT",
      to: "/account",
      icon: <AccountCircle htmlColor="white" />,
    },
  ];

  const onMenuButtonClick = () => {
    dispatch(setMenuOpen(true));
  };

  const onLinkClick = (path: string) => {
    navigate(path);
  };

  const screenIsSmall = useMediaQuery(theme.breakpoints.up("sm"));
  const screenIsMedium = useMediaQuery(theme.breakpoints.up("md"));
  const logoRef = useRef<HTMLImageElement>(null);
  const brandRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const logo = logoRef.current;
    const brand = brandRef.current;
    if (logo && brand) {
      logo.style.height = brand.getBoundingClientRect().height + "px";
    }
  }, [logoRef, brandRef]);

  const Brand = (
    <Flex style={{ gap: "1rem" }}>
      <img src={ultrarideLogoWhite} ref={logoRef} />
      <Typography
        className={classes.brand}
        variant="h5"
        fontFamily={brandFont}
        fontWeight="bold"
        ref={brandRef}
      >
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          {brandName.toUpperCase()}
        </Link>
      </Typography>
    </Flex>
  );

  return (
    <>
      <Flex>
        <Box>{Brand}</Box>
        <Flex>
          {screenIsMedium ? (
            <Flex style={{ gap: "2rem" }}>
              {navbarLinks.map((navbarLink) => (
                <Link
                  key={navbarLink.text}
                  style={{ textDecoration: "none", color: "white" }}
                  to={navbarLink.to}
                >
                  <Flex style={{ gap: "0.5rem", alignItems: "center" }}>
                    {navbarLink.icon}
                    <Typography fontWeight="bold">{navbarLink.text}</Typography>
                  </Flex>
                </Link>
              ))}
              <SearchBarIcon />
            </Flex>
          ) : screenIsSmall ? (
            <Flex style={{ gap: "2rem" }}>
              {navbarLinks.map((navbarLink) => (
                <Badge
                  badgeContent={navbarLink.to === "/cart" ? totalItems : 0}
                  color="secondary"
                  key={navbarLink.text}
                >
                  <Typography fontWeight="bold">
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to={navbarLink.to}
                    >
                      {navbarLink.text}
                    </Link>
                  </Typography>
                </Badge>
              ))}
              <SearchBarIcon />
            </Flex>
          ) : (
            <>
              <SearchBarIcon />
              <IconButton onClick={() => onLinkClick("/cart")}>
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCart htmlColor="white" />
                </Badge>
              </IconButton>
              <IconButton onClick={onMenuButtonClick}>
                <Menu htmlColor="white" />
              </IconButton>
            </>
          )}
        </Flex>
      </Flex>
    </>
  );
};
