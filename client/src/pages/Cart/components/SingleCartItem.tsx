import React from "react";
import { CartItem } from "../../../store/cart/cartTypes";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useProductQuery } from "../../../graphql/generated";
import { LoadingText } from "../../../components/helper/LoadingText";
import { graphqlClient } from "../../../graphql/client";
import { useDispatch } from "react-redux";
import { addCartItem, deleteCartItem } from "../../../store/cart/cartActions";

const useStyles = makeStyles({
  productBox: {
    display: "flex",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  productDetails: {
    padding: "1rem",
  },
  productCategory: {
    color: "grey",
  },
  productImage: {
    width: "40%",
    borderRadius: "1rem",
  },
  controls: {
    // margin: "auto",
    // width: "fit-content",
    marginBottom: "2rem",
  },
});

interface SingleCartItemProps {
  cartItem: CartItem;
}

export const SingleCartItem: React.FC<SingleCartItemProps> = ({ cartItem }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { data: productData, isLoading: productDataIsLoading } =
    useProductQuery(graphqlClient, {
      productIdOrName: cartItem.productId,
    });

  if (productDataIsLoading || !productData?.product) {
    return <LoadingText>Loading cart items...</LoadingText>;
  }

  const { product } = productData;

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
    <>
      <Box className={classes.productBox}>
        <img src={product?.imageUrl} className={classes.productImage} />
        <Box className={classes.productDetails}>
          <Typography variant="subtitle1" fontWeight="bold">
            {product?.name}
          </Typography>
          {/* <Typography variant="h6">{`$${product.price} x ${
            cartItem.quantity
          } = $${product.price * cartItem.quantity}`}</Typography> */}
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
          <Button variant="contained" onClick={onMinusButtonClick}>
            Decrease
          </Button>
          <Button variant="contained" onClick={onPlusButtonClick}>
            Increase
          </Button>
        </ButtonGroup>
      </Box>
    </>
  );
};
