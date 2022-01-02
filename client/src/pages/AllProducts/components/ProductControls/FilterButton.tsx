import { Button, ButtonProps } from "@mui/material";
import React, { useState } from "react";
import { Modal } from "../../../../components/helper/Modal";
import { FilterControl } from "./FilterControl";

type FilterButtonProps = {} & ButtonProps;

export const FilterButton: React.FC<FilterButtonProps> = ({ ...props }) => {
  const [filterControlIsVisible, setFilterControlVisibility] = useState(false);

  const onFilterButtonClick = () => {
    setFilterControlVisibility(true);
  };

  const onFilterControlClose = () => {
    setFilterControlVisibility(false);
  };

  return (
    <>
      <Button
        {...props}
        onClick={onFilterButtonClick}
        variant="contained"
        sx={{ marginBottom: "1rem", ...props.sx }}
      >
        Filter
      </Button>
      {filterControlIsVisible && (
        <Modal onClose={onFilterControlClose}>
          <FilterControl />
        </Modal>
      )}
    </>
  );
};
