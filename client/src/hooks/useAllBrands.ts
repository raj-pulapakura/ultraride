import { useEffect } from "react";
import { graphqlClient } from "../graphql/client";
import { useProductsQuery } from "../graphql/generated";

export const useAllBrands = (): string[] => {
  const { data: productsData } = useProductsQuery(graphqlClient);

  let brands = productsData?.products.map((product) => product.brand);

  return Array.from(new Set(brands || []));
};
