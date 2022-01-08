import React from "react";
import { CartItem } from "../../store/cart/cartTypes";
import { Box, Typography, Tooltip, IconButton } from "@mui/material";
import { useProductQuery } from "../../graphql/generated";
import { LoadingText } from "../../shared/LoadingText";
import { graphqlClient } from "../../graphql/client";
import { useDispatch } from "react-redux";
import { addCartItem, deleteCartItem } from "../../store/cart/cartActions";
import { useSingleCartItemStyles } from "./SingleCartItem.styles";
import { Delete, Add, Remove } from "@mui/icons-material";
import { SimpleContainer } from "../../shared/SimpleContainer";
import { theme } from "../../theme";
import { grey } from "@mui/material/colors";
import { Flex } from "../../shared/Flex";

interface SingleCartItemProps {
  cartItem: CartItem;
}

export const SingleCartItem: React.FC<SingleCartItemProps> = ({ cartItem }) => {
  const classes = useSingleCartItemStyles();
  const dispatch = useDispatch();

  const { data: productData, isLoading: productDataIsLoading } =
    useProductQuery(graphqlClient, {
      productIdOrName: cartItem.productId,
    });

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

  if (productDataIsLoading || !productData?.product) {
    return <LoadingText>Loading cart items...</LoadingText>;
  }

  return (
    <Box className={classes.productBox}>
      <img
        src={productData.product.imageUrl}
        className={classes.productImage}
      />
      <Box className={classes.productDetails}>
        <Typography variant="h6" fontWeight="bold">
          {productData.product.name}
        </Typography>
        <Typography variant="subtitle1">
          {"Cost: $" + productData.product.price}
        </Typography>
        <Typography variant="subtitle1">
          {"Quantity: " + cartItem.quantity}
        </Typography>
        <Typography variant="subtitle1">
          {"Subtotal: $" + productData.product.price * cartItem.quantity}
        </Typography>
        {/* <Flex
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            backgroundColor: grey[100],
            width: "100%",
            borderBottomRightRadius: "0.5rem",
            justifyContent: "space-around",
          }}
        >
          <IconButton>
            <Delete htmlColor="black" />
          </IconButton>
          <IconButton>
            <Add htmlColor="black" />
          </IconButton>
          <IconButton>
            <Remove htmlColor="black" />
          </IconButton>
        </Flex> */}
      </Box>
    </Box>
  );
};
