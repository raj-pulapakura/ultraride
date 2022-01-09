import { Search } from "@mui/icons-material";
import { IconButton, IconButtonProps } from "@mui/material";
import React, { useState } from "react";
import { SearchBarModal } from "./SearchBarModal";

type SearchBarIconProps = {} & IconButtonProps;

export const SearchBarIcon: React.FC<SearchBarIconProps> = ({ ...props }) => {
  const [isSearchModalVisible, setSearchModalVisible] = useState(false);

  const onSearchBarIconClick = () => {
    setSearchModalVisible(true);
  };

  const onSearchBarModalClose = () => {
    setSearchModalVisible(false);
  };

  return (
    <>
      {isSearchModalVisible && (
        <SearchBarModal onClose={onSearchBarModalClose} />
      )}
      <IconButton {...props} onClick={onSearchBarIconClick}>
        <Search htmlColor="white" />
      </IconButton>
    </>
  );
};
