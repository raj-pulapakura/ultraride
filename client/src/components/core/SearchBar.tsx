import React from "react";
import { IconButton, Box, BoxProps } from "@mui/material";
import { Search } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  searchBar: {
    display: "flex",
    background: "white",
    borderRadius: "5rem",
    padding: "0rem 1rem",
  },
  searchBarInput: {
    border: "none",
    outline: "none",
    borderRadius: "5rem",
    flexGrow: 1,
    background: "inherit",
    fontFamily: "Work Sans",
    fontWeight: "bold",
    color: "grey",
  },
  searchBarIcon: {},
});

type SearchBarProps = BoxProps;

export const SearchBar: React.FC<SearchBarProps> = ({ ...props }) => {
  const classes = useStyles();

  return (
    <Box {...props} className={classes.searchBar}>
      <input
        className={classes.searchBarInput}
        placeholder="Search for you fav products..."
      />
      <IconButton>
        <Search htmlColor="black" />
      </IconButton>
    </Box>
  );
};
