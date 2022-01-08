import { Button, ButtonProps } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../components/modals/Modal";
import { FilterControl } from "./FilterControl";
import { StoreState } from "../../store";
import { useAllTags } from "../../hooks/useAllTags";
import {
  setFilterTags,
  setFilterBrands,
} from "../../store/product/productActions";
import { useAllBrands } from "../../hooks/useAllBrands";
import { FilterAlt } from "@mui/icons-material";

type FilterButtonProps = {} & ButtonProps;

export const FilterButton: React.FC<FilterButtonProps> = ({ ...props }) => {
  const [filterControlIsVisible, setFilterControlVisibility] = useState(false);

  const onFilterButtonClick = () => {
    setFilterControlVisibility(true);
  };

  const onFilterControlClose = () => {
    setFilterControlVisibility(false);
  };

  const filterTags = useSelector<StoreState>(
    (state) => state.product.filterTags.data
  ) as StoreState["product"]["filterTags"]["data"];

  const allTags = useAllTags();

  const filterBrands = useSelector<StoreState>(
    (state) => state.product.filterBrands.data
  ) as StoreState["product"]["filterBrands"]["data"];

  const allBrands = useAllBrands();

  return (
    <>
      <Button
        {...props}
        onClick={onFilterButtonClick}
        variant="contained"
        startIcon={<FilterAlt />}
        sx={{ marginBottom: "1rem", ...props.sx }}
      >
        Filter
      </Button>
      {filterControlIsVisible && (
        <Modal onClose={onFilterControlClose}>
          <FilterControl
            header="Filter by tags:"
            setter={setFilterTags}
            sourceArray={allTags}
            currentArray={filterTags}
          />
          <FilterControl
            header="Filter by brands:"
            setter={setFilterBrands}
            sourceArray={allBrands}
            currentArray={filterBrands}
            sx={{ marginTop: "2rem" }}
          />
        </Modal>
      )}
    </>
  );
};
