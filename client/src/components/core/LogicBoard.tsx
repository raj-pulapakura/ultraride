import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAllTags } from "../../hooks/useAllTags";
import { useAllCategories } from "../../hooks/useAllCategories";
import { StoreState } from "../../store";
import {
  setFilterTags,
  setFilterTagsLoaded,
  setFilterCategories,
  setFilterCategoriesLoaded,
} from "../../store/product/productActions";

interface LogicBoardProps {}

export const LogicBoard: React.FC<LogicBoardProps> = ({ children }) => {
  const allTags = useAllTags();
  const allCategories = useAllCategories();
  const dispatch = useDispatch();

  const filterTagsLoaded = useSelector<StoreState>(
    (state) => state.product.filterTagsLoaded
  ) as StoreState["product"]["filterTagsLoaded"];

  const filterCategoriesLoaded = useSelector<StoreState>(
    (state) => state.product.filterCategoriesLoaded
  ) as StoreState["product"]["filterCategoriesLoaded"];

  useEffect(() => {
    if (!filterTagsLoaded && allTags.length) {
      dispatch(setFilterTags(allTags));
      dispatch(setFilterTagsLoaded(true));
    }
  }, [allTags, filterTagsLoaded]);

  useEffect(() => {
    if (!filterCategoriesLoaded && allCategories.length) {
      dispatch(setFilterCategories(allCategories));
      dispatch(setFilterCategoriesLoaded(true));
    }
  }, [allCategories, filterCategoriesLoaded]);

  return <div>{children}</div>;
};
