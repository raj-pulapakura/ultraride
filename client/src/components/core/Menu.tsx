import React from "react";
import { Drawer, Box, Typography, Button, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store";
import {
  Close,
  LocalOffer,
  ShoppingCart,
  AccountCircle,
} from "@mui/icons-material";
import { setMenuOpen } from "../../store/design/designActions";
import { Link } from "react-router-dom";
import { useMeQuery } from "../../graphql/generated";
import { graphqlClient } from "../../graphql/client";
import { useMenuStyles } from "./Menu.styles";

const menuLinks: Array<{
  text: string;
  to: string;
  icon: JSX.Element;
}> = [
  {
    text: "Shop",
    to: "/",
    icon: <LocalOffer color="primary" />,
  },
  {
    text: "Cart",
    to: "/cart",
    icon: <ShoppingCart color="primary" />,
  },
  {
    text: "Sign up",
    to: "/register",
    icon: <AccountCircle color="primary" />,
  },
];

interface MenuProps {}

export const Menu: React.FC<MenuProps> = ({}) => {
  const classes = useMenuStyles();
  const dispatch = useDispatch();

  const menuIsOpen = useSelector<StoreState>(
    (state) => state.design.menuIsOpen
  ) as StoreState["design"]["menuIsOpen"];

  const { data: meData, isLoading: meDataIsLoading } =
    useMeQuery(graphqlClient);

  const onCloseButtonClick = () => {
    dispatch(setMenuOpen(false));
  };

  return (
    <Box>
      <Drawer
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
        open={menuIsOpen}
        variant="temporary"
        anchor="left"
      >
        <Box className={classes.mainBox}>
          <Box className={classes.closeButton}>
            <IconButton onClick={onCloseButtonClick}>
              <Close htmlColor="black" />
            </IconButton>
          </Box>
          <Typography
            variant="h5"
            marginBottom="1rem"
            fontWeight="bold"
            sx={{ color: "black" }}
          >
            Browse
          </Typography>
          <Typography variant="h6">
            {meDataIsLoading
              ? "Loading..."
              : `Welcome, ${meData?.me?.account?.firstName} ${meData?.me?.account?.lastName}`}
          </Typography>
          <Typography variant="caption">
            {meDataIsLoading ? "Loading..." : `${meData?.me?.account?.email}`}
          </Typography>
        </Box>
        <Box className={classes.menuLinkContainer}>
          {menuLinks.map((menuLink) => (
            <Link
              to={menuLink.to}
              onClick={onCloseButtonClick}
              className={classes.menuLink}
            >
              <Box className={classes.menuLinkBox}>
                {menuLink.icon}
                <Typography variant="subtitle1" fontWeight="bold">
                  {menuLink.text}
                </Typography>
              </Box>
            </Link>
          ))}
        </Box>
      </Drawer>
    </Box>
  );
};
