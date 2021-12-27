import React from "react";
import { Typography } from "@mui/material";
import { useProductsQuery } from "../../graphql/generated";
import { graphqlClient } from "../../graphql/client";
import { SingleProduct } from "./components/SingleProduct";
import { ProductList } from "./components/ProductList";
import { LoadingText } from "../../components/helper/LoadingText";

interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = ({}) => {
  const { data: productsData, isLoading: productsDataIsLoading } =
    useProductsQuery(graphqlClient);

  if (productsDataIsLoading || !productsData?.products) {
    return <LoadingText>Loading products...</LoadingText>;
  }

  return (
    <>
      <ProductList products={productsData.products} />
    </>
  );
};
