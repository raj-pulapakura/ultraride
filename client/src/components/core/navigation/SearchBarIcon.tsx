import { Search } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { SearchBarModal } from "./SearchBarModal";

interface SearchBarIconProps {}

export const SearchBarIcon: React.FC<SearchBarIconProps> = ({}) => {
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
      <IconButton onClick={onSearchBarIconClick}>
        <Search htmlColor="white" />
      </IconButton>
    </>
  );
};
