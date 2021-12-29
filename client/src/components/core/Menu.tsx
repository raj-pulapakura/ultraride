import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store";
import { Close } from "@mui/icons-material";
import { setMenuOpen } from "../../store/menu/menuActions";
import { useGetMeQuery } from "../../graphql/generated";
import { graphqlClient } from "../../graphql/client";
import { useMenuStyles } from "./Menu.styles";
import { useNavigate } from "react-router-dom";
import { MenuLink } from "../../store/menu/menuTypes";
import { brandName } from "../../App";
import { brandFont } from "../../theme";

interface MenuProps {}

export const Menu: React.FC<MenuProps> = ({}) => {
  const classes = useMenuStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuIsOpen = useSelector<StoreState>(
    (state) => state.menu.menuIsOpen
  ) as StoreState["menu"]["menuIsOpen"];

  const menuLinks = useSelector<StoreState>(
    (state) => state.menu.menuLinks
  ) as StoreState["menu"]["menuLinks"];

  const { data: meData, isLoading: meDataIsLoading } = useGetMeQuery(
    graphqlClient,
    {},
    { refetchInterval: 1000 }
  );

  const onCloseButtonClick = () => {
    dispatch(setMenuOpen(false));
  };

  const onMenuLinkClicked = (path: MenuLink["to"]) => {
    navigate(path);
    setTimeout(onCloseButtonClick, 250);
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
              <Close htmlColor="white" />
            </IconButton>
          </Box>

          {meData?.getMe?.account ? (
            <>
              <Typography variant="h6">
                {meDataIsLoading
                  ? "Loading..."
                  : `Welcome, ${meData?.getMe?.account?.firstName} ${meData?.getMe?.account?.lastName}`}
              </Typography>
              <Typography
                variant="subtitle2"
                marginTop="0.5rem"
                sx={{ color: "grey" }}
              >
                {meDataIsLoading
                  ? "Loading..."
                  : `${meData?.getMe?.account?.email}`}
              </Typography>
            </>
          ) : (
            <>
              <Typography
                variant="h4"
                sx={{ color: "white" }}
                fontFamily={brandFont}
                // fontWeight="bold"
              >
                Browse
              </Typography>
            </>
          )}
        </Box>
        <Box>
          <List>
            {menuLinks.map((menuLink) => (
              <ListItem
                button
                key={menuLink.text}
                onClick={() => onMenuLinkClicked(menuLink.to)}
              >
                <ListItemIcon>{menuLink.iconPrimary}</ListItemIcon>
                <ListItemText primary={menuLink.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};
