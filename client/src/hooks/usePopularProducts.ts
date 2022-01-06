import { useSelector } from "react-redux";
import { StoreState } from "../store";
import { useProductsQuery, ProductsQuery } from "../graphql/generated";
import { graphqlClient } from "../graphql/client";
import { randomChoice } from "../utils/randomChoice";

export const usePopularProducts = (num: number) => {
  // const featuredProductId = useSelector<StoreState>(
  //   (state) => state.product.featuredProductId
  // ) as StoreState["product"]["featuredProductId"];

  const { data: productsData } = useProductsQuery(graphqlClient);

  const popularProducts = productsData?.products.slice(0, num);

  return popularProducts;
};
