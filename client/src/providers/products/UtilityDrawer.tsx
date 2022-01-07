import { BoxProps, Box } from "@mui/material";
import { FilterControl } from "./FilterControl";
import { SortControl } from "./SortControl";
import {
  setFilterBrands,
  setFilterTags,
} from "../../store/product/productActions";
import { useSelector } from "react-redux";
import { useAllTags } from "../../hooks/useAllTags";
import { StoreState } from "../../store";
import { useAllBrands } from "../../hooks/useAllBrands";

type UtilityDrawerProps = {} & BoxProps;

export const UtilityDrawer: React.FC<UtilityDrawerProps> = ({ ...props }) => {
  const filterTags = useSelector<StoreState>(
    (state) => state.product.filterTags.data
  ) as StoreState["product"]["filterTags"]["data"];

  const allTags = useAllTags();

  const filterBrands = useSelector<StoreState>(
    (state) => state.product.filterBrands.data
  ) as StoreState["product"]["filterBrands"]["data"];

  const allBrands = useAllBrands();

  return (
    <Box {...props} sx={{ ...props.sx, backgroundColor: "#fff" }}>
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
      <SortControl sx={{ marginTop: "2rem" }} />
    </Box>
  );
};
