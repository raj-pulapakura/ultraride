import React from "react";
import {
  Drawer,
  Box,
  Typography,
  Button,
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
import { useMeQuery } from "../../graphql/generated";
import { graphqlClient } from "../../graphql/client";
import { useMenuStyles } from "./Menu.styles";
import { useNavigate } from "react-router-dom";
import { MenuLink } from "../../store/menu/menuTypes";

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

  const { data: meData, isLoading: meDataIsLoading } = useMeQuery(
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
              <Close htmlColor="black" />
            </IconButton>
          </Box>
          <Typography
            variant="h5"
            marginBottom="0.5rem"
            fontWeight="bold"
            sx={{ color: "black" }}
          >
            Browse
          </Typography>
          {meData?.me?.account ? (
            <>
              <Typography variant="h6">
                {meDataIsLoading
                  ? "Loading..."
                  : `Welcome, ${meData?.me?.account?.firstName} ${meData?.me?.account?.lastName}`}
              </Typography>
              <Typography variant="caption">
                {meDataIsLoading
                  ? "Loading..."
                  : `${meData?.me?.account?.email}`}
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h6">Welcome to EcomExpress</Typography>
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
                <ListItemIcon>{menuLink.icon}</ListItemIcon>
                <ListItemText primary={menuLink.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};
