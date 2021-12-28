import React from "react";
import { Typography } from "@mui/material";
import { useGetProductsQuery } from "../../graphql/generated";
import { graphqlClient } from "../../graphql/client";
import { SingleProduct } from "./components/SingleProduct";
import { ProductList } from "./components/ProductList";
import { LoadingText } from "../../components/helper/LoadingText";

interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = ({}) => {
  const { data: productsData, isLoading: productsDataIsLoading } =
    useGetProductsQuery(graphqlClient);

  if (productsDataIsLoading || !productsData?.getProducts) {
    return <LoadingText>Loading products...</LoadingText>;
  }

  return (
    <>
      <ProductList products={productsData.getProducts} />
    </>
  );
};
