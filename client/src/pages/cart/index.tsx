import React, { useEffect, useState } from "react";
import { CartItemList } from "../../providers/cart/CartItemList";
import { Box, Button, Typography } from "@mui/material";
import { EmptyCart } from "../../providers/cart/EmptyCart";
import { useMeQuery } from "../../graphql/generated";
import { graphqlClient } from "../../graphql/client";
import { useNavigate } from "react-router-dom";
import { useCartItemProducts } from "../../hooks/useCartItemProducts";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";
import { STRIPE_API } from "../../constants";
import { convertCartItemProductsToLineItems } from "../../utils/convertCartItemProductsToLineItems";
import { useStripe } from "@stripe/react-stripe-js";

interface CartPageProps {}

export const CartPage: React.FC<CartPageProps> = ({}) => {
  const navigate = useNavigate();

  const stripe = useStripe();

  const { data: meData } = useMeQuery(graphqlClient);

  const cartItemProducts = useCartItemProducts();

  const cartItems = useSelector<StoreState>(
    (state) => state.cart.items
  ) as StoreState["cart"]["items"];

  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    setTotalCost(
      cartItemProducts.reduce((acc, curr) => {
        if (curr?.quantity && curr?.product?.price) {
          return acc + curr.quantity * curr.product.price;
        }
        return acc;
      }, 0)
    );
  }, [cartItemProducts, cartItems]);

  const onContinueToCheckoutClick = async () => {
    if (!meData?.me?.account) {
      navigate("/register?next=cart");
    }
    const body = {
      line_items: convertCartItemProductsToLineItems(cartItemProducts),
    };

    const res = await fetch(`${STRIPE_API}/checkout`, {
      body: JSON.stringify(body),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { id: sessionId } = await res.json();

    await stripe?.redirectToCheckout({ sessionId });
  };

  return (
    <>
      {cartItemProducts.length ? (
        <Box sx={{ width: "min(600p x, 100%)", margin: "auto" }}>
          <Typography
            variant="h5"
            fontWeight="bold"
          >{`Total Cost: $${totalCost}`}</Typography>
          <CartItemList cartItems={cartItems} />
          <Button
            variant="contained"
            fullWidth
            onClick={onContinueToCheckoutClick}
            sx={{ marginTop: "2rem" }}
          >
            Continue to Checkout
          </Button>
        </Box>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};
