import React, { useEffect, useState } from "react";
import { CartItemList } from "../../providers/cart/CartItemList";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
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
import { theme } from "../../theme";
import { Flex } from "../../components/wrappers/Flex";

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
      return navigate("/account/sign-up?next=cart");
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

  const screenIsMedium = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      {cartItemProducts.length ? (
        screenIsMedium ? (
          <>
            <Flex style={{ alignItems: "flex-start" }}>
              <Box sx={{ width: "50%" }}>
                <CartItemList cartItems={cartItems} />
              </Box>
              <Box sx={{ width: "50%" }}>
                <Box sx={{ margin: "auto", width: "fit-content" }}>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                  >{`Total Cost: $${totalCost}`}.00</Typography>
                  <Button
                    variant="contained"
                    onClick={onContinueToCheckoutClick}
                    sx={{ marginTop: "1rem", width: "fit-content" }}
                  >
                    Continue to Checkout
                  </Button>
                </Box>
              </Box>
            </Flex>
          </>
        ) : (
          <>
            <Box sx={{ width: "min(600p x, 100%)", margin: "auto" }}>
              <CartItemList cartItems={cartItems} />
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ marginTop: "1rem" }}
              >{`Total Cost: $${totalCost}`}.00</Typography>
              <Button
                variant="contained"
                fullWidth
                onClick={onContinueToCheckoutClick}
                sx={{ marginTop: "1rem" }}
              >
                Continue to Checkout
              </Button>
            </Box>
          </>
        )
      ) : (
        <EmptyCart />
      )}
    </>
  );
};
