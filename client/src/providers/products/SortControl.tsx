import {
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  BoxProps,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store";
import { setSortingMethod } from "../../store/product/productActions";
import { SortingMethods } from "../../store/product/productTypes";

type SortControlProps = {} & BoxProps;

export const SortControl: React.FC<SortControlProps> = ({ ...props }) => {
  const dispatch = useDispatch();

  const sortingMethod = useSelector<StoreState>(
    (state) => state.product.sortingMethod
  ) as StoreState["product"]["sortingMethod"];

  const onSortingMethodChange = (method: SortingMethods) => {
    dispatch(setSortingMethod(method));
  };

  return (
    <Box {...props}>
      <Typography sx={{ marginBottom: "0.5rem" }} variant="h6">
        Sort products:
      </Typography>
      <RadioGroup
        value={sortingMethod}
        onChange={(e) =>
          onSortingMethodChange(e.target.value as SortingMethods)
        }
      >
        <FormControlLabel
          value={SortingMethods.SORT_BY_PRICE}
          control={<Radio color="primary" />}
          label={SortingMethods.SORT_BY_PRICE}
        />
        <FormControlLabel
          value={SortingMethods.SORT_BY_NAME}
          control={<Radio color="primary" />}
          label={SortingMethods.SORT_BY_NAME}
        />
      </RadioGroup>
    </Box>
  );
};
