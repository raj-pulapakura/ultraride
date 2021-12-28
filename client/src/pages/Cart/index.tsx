import React from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";
import { CartItemList } from "./components/CartItemList";
import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { EmptyCart } from "./components/EmptyCart";
import {
  GetProductDocument,
  GetProductQuery,
  GetProductQueryVariables,
  useGetMeQuery,
  usePurchaseProductsMutation,
} from "../../graphql/generated";
import { graphqlClient } from "../../graphql/client";
import { useNavigate } from "react-router-dom";
import { useQueries } from "react-query";

const useStyles = makeStyles({
  continueToCheckoutButton: {
    marginTop: "2rem",
  },
});

interface CartPageProps {}

export const CartPage: React.FC<CartPageProps> = ({}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const cartItems = useSelector<StoreState>(
    (state) => state.cart.items
  ) as StoreState["cart"]["items"];

  const { data: meData } = useGetMeQuery(graphqlClient);
  const {
    mutateAsync: purchaseProducts,
    isLoading: purchaseProductsIsLoading,
  } = usePurchaseProductsMutation(graphqlClient);

  const productsQueries = useQueries(
    cartItems.map((cartItem) => {
      return {
        queryFn: async () => {
          return await graphqlClient.request<
            GetProductQuery,
            GetProductQueryVariables
          >(GetProductDocument, { productIdOrName: cartItem.productId });
        },
        queryKey: ["cartItem", cartItem.productId],
      };
    })
  );

  const totalCost = cartItems.reduce((acc, curr) => {
    const matchingProduct = productsQueries.find(
      (prodQuery) => prodQuery.data?.getProduct?.id === curr.productId
    );
    return (
      acc + curr.quantity * (matchingProduct?.data?.getProduct?.price as number)
    );
  }, 0);

  const onContinueToCheckoutClick = () => {
    if (!meData?.getMe?.account) {
      navigate("/register?next=cart");
    }
    purchaseProducts({
      input: {
        purchaseListings: cartItems,
        accountId: meData?.getMe?.account?.id as string,
      },
    });
  };

  return (
    <>
      {cartItems.length ? (
        <>
          <CartItemList cartItems={cartItems} />
          <Typography
            variant="h5"
            fontWeight="bold"
          >{`Total Cost: $${totalCost}`}</Typography>
          <Button
            variant="outlined"
            fullWidth
            className={classes.continueToCheckoutButton}
            onClick={onContinueToCheckoutClick}
            sx={{ marginTop: "1rem" }}
          >
            Continue to Checkout
          </Button>
        </>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};
