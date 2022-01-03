import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ProductsQuery } from "../../../graphql/generated";
import { useFilterProducts } from "../../../hooks/useFilterProducts";
import { StoreState } from "../../../store";
import { SortingMethods } from "../../../store/product/productTypes";
import { SingleProduct } from "./SingleProduct";

interface ProductListProps {
  products: ProductsQuery["products"];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const sortingMethod = useSelector<StoreState>(
    (state) => state.product.sortingMethod
  ) as StoreState["product"]["sortingMethod"];

  const filterTags = useSelector<StoreState>(
    (state) => state.product.filterTags
  ) as StoreState["product"]["filterTags"];

  const dispatch = useDispatch();
  const [productList, setProductList] = useState(products);
  const { filterProducts } = useFilterProducts();

  // sorting products
  useEffect(() => {
    let compareFn;
    switch (sortingMethod) {
      case SortingMethods.NO_SORT:
        return setProductList(products);
      case SortingMethods.SORT_BY_PRICE:
        compareFn = (
          productA: ProductsQuery["products"][0],
          productB: ProductsQuery["products"][0]
        ) => productA.price - productB.price;
        break;
      case SortingMethods.SORT_BY_NAME:
        compareFn = (
          productA: ProductsQuery["products"][0],
          productB: ProductsQuery["products"][0]
        ) => (productA.name > productB.name ? 1 : -1);
        break;
    }

    return setProductList(products.sort(compareFn));
  }, [sortingMethod, products]);

  // filtering products by tags
  useEffect(() => {
    setProductList(filterProducts(products, filterTags));
  }, [filterTags]);

  // useEffect(() => {
  //   console.log({ productsLength: products.length });
  // }, [products]);

  return (
    <>
      {productList.length ? (
        <Grid container sx={{ maxWidth: "100%" }} spacing={2}>
          {productList.map((product) => (
            <Grid
              key={product.id}
              item
              sx={{ width: "100%" }}
              xs={12}
              sm={6}
              md={4}
              lg={4}
              xl={4}
            >
              <SingleProduct key={product.id} product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box>
          <Typography>No products found.</Typography>
        </Box>
      )}
    </>
  );
};
