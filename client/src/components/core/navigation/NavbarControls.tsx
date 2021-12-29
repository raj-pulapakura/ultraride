import React, { useEffect } from "react";
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Flex } from "../../helper/Flex";
import { Menu, Search, ShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMenuOpen } from "../../../store/menu/menuActions";
import { Link, useNavigate } from "react-router-dom";
import { useNavbarControlsStyles } from "./NavbarControls.styles";
import { brandName } from "../../../App";
import { brandFont, theme } from "../../../theme";
import { StoreState } from "../../../store";
import { SearchBarIcon } from "./SearchBarIcon";

interface NavbarControlsProps {}

export const NavbarControls: React.FC<NavbarControlsProps> = ({}) => {
  const classes = useNavbarControlsStyles();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onMenuButtonClick = () => {
    dispatch(setMenuOpen(true));
  };

  const onLinkClick = (path: string) => {
    navigate(path);
  };

  const menuLinks = useSelector<StoreState>(
    (state) => state.menu.menuLinks
  ) as StoreState["menu"]["menuLinks"];

  const screenIsBig = useMediaQuery(theme.breakpoints.up("sm"));
  const screenIsReallyBig = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    console.log({ screenIsBig, screenIsReallyBig });
  }, [screenIsBig, screenIsReallyBig]);

  return (
    <>
      {screenIsReallyBig ? (
        <>
          <Flex>
            <Box>
              <Typography
                className={classes.brand}
                variant="h5"
                fontWeight="bold"
                fontFamily={brandFont}
              >
                {brandName.toUpperCase()}
              </Typography>
            </Box>
            <Flex style={{ gap: "2rem" }}>
              {menuLinks.map((menuLink) => (
                <Typography
                  sx={{
                    display: "inline",
                  }}
                >
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to={menuLink.to}
                  >
                    {menuLink.text}
                  </Link>
                </Typography>
              ))}
            </Flex>
          </Flex>
        </>
      ) : screenIsBig ? (
        <Flex>
          <Box>
            <Typography
              className={classes.brand}
              variant="h5"
              fontFamily={brandFont}
              fontWeight="bold"
            >
              {brandName.toUpperCase()}
            </Typography>
          </Box>
          <Box>
            {menuLinks.map((menuLink) => (
              <Tooltip key={menuLink.text} title={menuLink.text}>
                <IconButton onClick={() => onLinkClick(menuLink.to)}>
                  {menuLink.iconWhite}
                </IconButton>
              </Tooltip>
            ))}
          </Box>
        </Flex>
      ) : (
        <Flex>
          <IconButton onClick={onMenuButtonClick}>
            <Menu htmlColor="white" />
          </IconButton>
          <Typography
            className={classes.brand}
            variant="h5"
            fontWeight="bold"
            fontFamily={brandFont}
          >
            {brandName.toUpperCase()}
          </Typography>
          <Flex>
            <SearchBarIcon />
            <IconButton onClick={() => onLinkClick("/cart")}>
              <ShoppingCart htmlColor="white" />
            </IconButton>
          </Flex>
        </Flex>
      )}
    </>
  );
};
