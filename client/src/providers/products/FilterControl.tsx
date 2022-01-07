import { Typography, Box, Chip, BoxProps } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAllTags } from "../../hooks/useAllTags";
import { useGlobalStyles } from "../../hooks/useGlobalStyles";
import { StoreState } from "../../store";
import { setFilterTags } from "../../store/product/productActions";
import { checkArraysEqual } from "../../utils/checkArraysEqual";

type FilterControlProps = {} & BoxProps;

export const FilterControl: React.FC<FilterControlProps> = ({ ...props }) => {
  const dispatch = useDispatch();
  const globalClasses = useGlobalStyles();

  const filterTags = useSelector<StoreState>(
    (state) => state.product.filterTags.data
  ) as StoreState["product"]["filterTags"]["data"];

  const allTags = useAllTags();

  const onTagClick = (text: string) => {
    // user chose 'All'
    if (text === "All") {
      return dispatch(setFilterTags(allTags));
    }

    // user chose another tag while current tag is 'All'
    if (checkArraysEqual(allTags, filterTags)) {
      return dispatch(setFilterTags([text]));
    }

    // only one filter tag has been chosen
    if (filterTags.length === 1 && filterTags.includes(text)) {
      return;
    }

    // text is already included in the filter tag - remove
    if (filterTags.includes(text)) {
      return dispatch(setFilterTags(filterTags.filter((tag) => tag !== text)));
    }

    // add a tag
    dispatch(setFilterTags([...filterTags, text]));
  };

  return (
    <Box {...props}>
      <Typography sx={{ marginBottom: "1rem" }} variant="h6">
        Filter by tags:
      </Typography>
      <Box>
        <Chip
          label="All"
          onClick={() => onTagClick("All")}
          sx={{ marginBottom: "0.5rem", marginRight: "0.5rem" }}
          color={
            checkArraysEqual(allTags, filterTags) ? "secondary" : "default"
          }
        />
        {allTags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            className={globalClasses.productTagChip}
            sx={{ marginBottom: "0.5rem", marginRight: "0.5rem" }}
            onClick={() => onTagClick(tag)}
            color={
              filterTags.includes(tag) && !checkArraysEqual(allTags, filterTags)
                ? "secondary"
                : "default"
            }
          />
        ))}
      </Box>
    </Box>
  );
};
