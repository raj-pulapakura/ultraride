import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { graphqlClient } from "../graphql/client";
import { ProductsQuery, useProductsQuery } from "../graphql/generated";
import { useAllTags } from "../hooks/useAllTags";
import { StoreState } from "../store";
import {
  setFeaturedProductId,
  setFeaturedProductIdLoaded,
  setFilterTags,
  setFilterTagsLoaded,
} from "../store/product/productActions";
import { randomChoice } from "../utils/randomChoice";

interface LogicBoardProps {}

export const LogicBoard: React.FC<LogicBoardProps> = ({ children }) => {
  const allTags = useAllTags();
  const dispatch = useDispatch();
  const { data: productsData } = useProductsQuery(graphqlClient);
  const randomProduct = randomChoice<ProductsQuery["products"][0]>(
    productsData?.products || []
  );

  const filterTagsLoaded = useSelector<StoreState>(
    (state) => state.product.filterTagsLoaded
  ) as StoreState["product"]["filterTagsLoaded"];

  const featuredProductIdLoaded = useSelector<StoreState>(
    (state) => state.product.featuredProductIdLoaded
  ) as StoreState["product"]["featuredProductIdLoaded"];

  useEffect(() => {
    if (!filterTagsLoaded && allTags.length) {
      dispatch(setFilterTags(allTags));
      dispatch(setFilterTagsLoaded(true));
    }
  }, [allTags, filterTagsLoaded]);

  useEffect(() => {
    if (!featuredProductIdLoaded && randomProduct) {
      dispatch(setFeaturedProductId(randomProduct.id));
      dispatch(setFeaturedProductIdLoaded(true));
    }
  }, [randomProduct, featuredProductIdLoaded]);

  return <div>{children}</div>;
};
