import React from "react";
import { IconButton, Box, BoxProps } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useSearchBarStyles } from "./SearchBar.styles";
type SearchBarProps = BoxProps;

export const SearchBar: React.FC<SearchBarProps> = ({ ...props }) => {
  const classes = useSearchBarStyles();

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
