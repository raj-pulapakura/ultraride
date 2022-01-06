import { graphqlClient } from "../graphql/client";
import { useProductsQuery } from "../graphql/generated";

export const useAllCategories = () => {
  const { data: productsData } = useProductsQuery(graphqlClient);

  return Array.from(
    new Set(productsData?.products.map((product) => product.category))
  );
};
