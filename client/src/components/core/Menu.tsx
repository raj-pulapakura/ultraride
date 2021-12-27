import React from "react";
import { Drawer, Box, Typography, Button, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store";
import { Close, List, ShoppingCart } from "@mui/icons-material";
import { setMenuOpen } from "../../store/design/designActions";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  drawer: {
    width: "70vw",
    background: "white",
  },
  drawerPaper: {
    width: "70vw",
    background: "white",
    position: "relative",
    padding: "2rem",
  },
  closeButton: {
    position: "absolute",
    width: "fit-content",
    top: 10,
    right: 10,
  },
  menuSubHeader: {},
  menuLink: {
    textDecoration: "none",
    color: "black",
    marginBottom: "0.25rem",
  },
  menuLinkFlex: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
});

const menuLinks: Array<{
  text: string;
  to: string;
  icon: React.FC;
}> = [
  {
    text: "All Products",
    to: "/",
    icon: List,
  },
  {
    text: "Cart",
    to: "/cart",
    icon: ShoppingCart,
  },
];

interface MenuProps {}

export const Menu: React.FC<MenuProps> = ({}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const menuIsOpen = useSelector<StoreState>(
    (state) => state.design.menuIsOpen
  ) as StoreState["design"]["menuIsOpen"];

  const onCloseButtonClick = () => {
    dispatch(setMenuOpen(false));
  };

  return (
    <Box>
      <Drawer
        open={menuIsOpen}
        variant="temporary"
        anchor="left"
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
      >
        <Box className={classes.closeButton}>
          <IconButton onClick={onCloseButtonClick}>
            <Close htmlColor="black" />
          </IconButton>
        </Box>
        <Typography
          variant="subtitle1"
          color="primary"
          className={classes.menuSubHeader}
          marginBottom="1rem"
        >
          Menu
        </Typography>
        {menuLinks.map((menuLink) => (
          <Link
            to={menuLink.to}
            onClick={onCloseButtonClick}
            className={classes.menuLink}
          >
            <Box className={classes.menuLinkFlex}>
              <menuLink.icon />
              <Typography variant="h6">{menuLink.text}</Typography>
            </Box>
          </Link>
        ))}
      </Drawer>
    </Box>
  );
};
