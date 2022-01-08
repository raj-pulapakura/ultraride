import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { graphqlClient } from "../graphql/client";
import { ProductsQuery, useProductsQuery } from "../graphql/generated";
import { useAllBrands } from "../hooks/useAllBrands";
import { useAllTags } from "../hooks/useAllTags";
import { StoreState } from "../store";
import { addCartItem } from "../store/cart/cartActions";
import {
  setFeaturedProductId,
  setFeaturedProductIdLoaded,
  setFilterBrands,
  setFilterBrandsLoaded,
  setFilterTags,
  setFilterTagsLoaded,
} from "../store/product/productActions";
import { randomChoice } from "../utils/randomChoice";

interface LogicBoardProps {}

export const LogicBoard: React.FC<LogicBoardProps> = ({ children }) => {
  const allTags = useAllTags();
  const allBrands = useAllBrands();
  const dispatch = useDispatch();

  const { data: productsData } = useProductsQuery(graphqlClient);
  const randomProduct = randomChoice<ProductsQuery["products"][0]>(
    productsData?.products || []
  );

  const filterTagsLoaded = useSelector<StoreState>(
    (state) => state.product.filterTags.loaded
  ) as StoreState["product"]["filterTags"]["loaded"];

  const filterBrandsLoaded = useSelector<StoreState>(
    (state) => state.product.filterBrands.loaded
  ) as StoreState["product"]["filterBrands"]["loaded"];

  const featuredProductIdLoaded = useSelector<StoreState>(
    (state) => state.product.featuredProductId.loaded
  ) as StoreState["product"]["featuredProductId"]["loaded"];

  const cartItems = useSelector<StoreState>(
    (state) => state.cart.items
  ) as StoreState["cart"]["items"];

  // set filter tags
  useEffect(() => {
    if (!filterTagsLoaded && allTags.length) {
      dispatch(setFilterTags(allTags));
      dispatch(setFilterTagsLoaded(true));
    }
  }, [allTags, filterTagsLoaded]);

  // set filter brands
  useEffect(() => {
    if (!filterBrandsLoaded && allBrands.length) {
      dispatch(setFilterBrands(allBrands));
      dispatch(setFilterBrandsLoaded(true));
    }
  }, [allBrands, filterBrandsLoaded]);

  // set featured product id
  useEffect(() => {
    if (!featuredProductIdLoaded && randomProduct) {
      dispatch(setFeaturedProductId(randomProduct.id));
      dispatch(setFeaturedProductIdLoaded(true));
    }
  }, [randomProduct, featuredProductIdLoaded]);

  // find items in localstorage and set them as cart items
  useEffect(() => {
    const keys = Object.keys(localStorage);
    for (const key of keys) {
      const value = localStorage.getItem(key);
      if (value) {
        dispatch(addCartItem({ productId: key, quantity: parseInt(value) }));
      }
    }
  }, []);

  // update localstorage whenever cart items change
  useEffect(() => {
    cartItems.forEach((item) => {
      localStorage.setItem(item.productId, item.quantity.toString());
    });
  }, [cartItems]);

  return <div>{children}</div>;
};
