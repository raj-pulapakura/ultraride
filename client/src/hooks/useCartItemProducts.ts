import { useQueries } from "react-query";
import { useSelector } from "react-redux";
import { graphqlClient } from "../graphql/client";
import {
  ProductQuery,
  ProductQueryVariables,
  ProductDocument,
} from "../graphql/generated";
import { StoreState } from "../store";

export const useCartItemProducts = () => {
  const cartItems = useSelector<StoreState>(
    (state) => state.cart.items
  ) as StoreState["cart"]["items"];

  const productsQueries = useQueries(
    cartItems.map((cartItem) => {
      return {
        queryFn: async () => {
          const response = await graphqlClient.request<
            ProductQuery,
            ProductQueryVariables
          >(ProductDocument, { productIdOrName: cartItem.productId });
          return { ...response, quantity: cartItem.quantity };
        },
        queryKey: ["cartItem", cartItem.productId],
      };
    })
  );

  return productsQueries.map((prodQuery) => prodQuery.data);
};
