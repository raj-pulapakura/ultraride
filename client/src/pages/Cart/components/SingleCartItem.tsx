import React from "react";
import { CartItem } from "../../../store/cart/cartTypes";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useGetProductQuery } from "../../../graphql/generated";
import { LoadingText } from "../../../components/helper/LoadingText";
import { graphqlClient } from "../../../graphql/client";
import { useDispatch } from "react-redux";
import { addCartItem, deleteCartItem } from "../../../store/cart/cartActions";
import { useSingleCartItemStyles } from "./SingleCartItem.styles";

interface SingleCartItemProps {
  cartItem: CartItem;
}

export const SingleCartItem: React.FC<SingleCartItemProps> = ({ cartItem }) => {
  const classes = useSingleCartItemStyles();
  const dispatch = useDispatch();

  const { data: productData, isLoading: productDataIsLoading } =
    useGetProductQuery(graphqlClient, {
      productIdOrName: cartItem.productId,
    });

  if (productDataIsLoading || !productData?.getProduct) {
    return <LoadingText>Loading cart items...</LoadingText>;
  }

  const { getProduct: product } = productData;

  const onDeleteButtonClick = () => {
    dispatch(deleteCartItem(cartItem.productId));
  };

  const onPlusButtonClick = () => {
    dispatch(
      addCartItem({
        productId: cartItem.productId,
        quantity: cartItem.quantity + 1,
      })
    );
  };

  const onMinusButtonClick = () => {
    dispatch(
      addCartItem({
        productId: cartItem.productId,
        quantity: cartItem.quantity - 1,
      })
    );
  };

  return (
    <Box>
      <Box className={classes.productBox}>
        <img src={product?.imageUrl} className={classes.productImage} />
        <Box className={classes.productDetails}>
          <Typography variant="subtitle1" fontWeight="bold">
            {product?.name}
          </Typography>
          <Typography variant="subtitle2">
            {"Cost: $" + product?.price}
          </Typography>
          <Typography variant="subtitle2">
            {"Quantity: " + cartItem.quantity}
          </Typography>
          <Typography variant="subtitle2">
            {"Subtotal: $" + product?.price * cartItem.quantity}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.controls}>
        <ButtonGroup fullWidth>
          <Button
            variant="contained"
            onClick={onDeleteButtonClick}
            color="error"
          >
            Delete
          </Button>
          <Button
            variant="contained"
            onClick={onMinusButtonClick}
            disabled={cartItem.quantity <= 1}
          >
            Decrease
          </Button>
          <Button variant="contained" onClick={onPlusButtonClick}>
            Increase
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};
