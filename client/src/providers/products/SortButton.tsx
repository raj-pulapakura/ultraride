import { Button, ButtonProps } from "@mui/material";
import React, { useState } from "react";
import { Modal } from "../../shared/Modal";
import { SortControl } from "./SortControl";

type SortButtonProps = {} & ButtonProps;

export const SortButton: React.FC<SortButtonProps> = ({ ...props }) => {
  const [sortControlIsVisible, setSortControlVisibility] = useState(false);

  const onSortButtonClick = () => {
    setSortControlVisibility(true);
  };

  const onSortControlClose = () => {
    setSortControlVisibility(false);
  };

  return (
    <>
      <Button
        {...props}
        onClick={onSortButtonClick}
        variant="contained"
        sx={{ marginBottom: "1rem", ...props.sx }}
      >
        Sort
      </Button>
      {sortControlIsVisible && (
        <Modal onClose={onSortControlClose}>
          <SortControl />
        </Modal>
      )}
    </>
  );
};
