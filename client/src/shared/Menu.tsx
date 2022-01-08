import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  ButtonGroup,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../store";
import { Close } from "@mui/icons-material";
import { setMenuOpen } from "../store/menu/menuActions";
import { useMeQuery } from "../graphql/generated";
import { graphqlClient } from "../graphql/client";
import { useMenuStyles } from "./Menu.styles";
import { useNavigate } from "react-router-dom";
import { brandFont } from "../theme";

interface MenuProps {}

export const Menu: React.FC<MenuProps> = ({}) => {
  const classes = useMenuStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuIsOpen = useSelector<StoreState>(
    (state) => state.menu.menuIsOpen
  ) as StoreState["menu"]["menuIsOpen"];

  const { data: meData, isLoading: meDataIsLoading } = useMeQuery(
    graphqlClient,
    {},
    { refetchInterval: 1000 }
  );

  const onCloseButtonClick = () => {
    dispatch(setMenuOpen(false));
  };

  const onMenuLinkClicked = (path: string) => {
    navigate(path);
    onCloseButtonClick();
  };

  const menuLinks: { text: string; to: string }[] = [
    {
      text: "Home",
      to: "/",
    },
    {
      text: "Shoes",
      to: "/products",
    },
    {
      text: "Cart",
      to: "/cart",
    },
    {
      text: "Account",
      to: "/account",
    },
  ];

  return (
    <Box>
      <Drawer
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
        open={menuIsOpen}
        variant="temporary"
        anchor="left"
      >
        <Box className={classes.mainBox} sx={{ backgroundColor: "black" }}>
          <Box className={classes.closeButton}>
            <IconButton onClick={onCloseButtonClick}>
              <Close htmlColor="white" />
            </IconButton>
          </Box>

          <Typography
            variant="h4"
            sx={{ color: "white" }}
            fontFamily={brandFont}
            fontWeight="bold"
          >
            Browse
          </Typography>
        </Box>
        <Box sx={{ padding: "2rem" }}>
          {!meData?.me?.account && (
            <ButtonGroup sx={{ marginBottom: "2rem" }}>
              <Button onClick={() => onMenuLinkClicked("/account/sign-up")}>
                Sign Up
              </Button>
              <Button onClick={() => onMenuLinkClicked("/account/sign-in")}>
                Sign In
              </Button>
            </ButtonGroup>
          )}
          <Box>
            {menuLinks.map((menuLink) => (
              <Typography
                key={menuLink.text}
                onClick={() => onMenuLinkClicked(menuLink.to)}
                sx={{
                  marginBottom: "1rem",
                  "&:hover": {
                    textDecoration: "underline",
                    cursor: "pointer",
                  },
                }}
              >
                {menuLink.text}
              </Typography>
            ))}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
