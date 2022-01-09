import React from "react";
import { CartItem } from "../../store/cart/cartTypes";
import {
  Box,
  Typography,
  Tooltip,
  IconButton,
  Button,
  ButtonGroup,
} from "@mui/material";
import { Delete, Add, Remove } from "@mui/icons-material";
import { useProductQuery } from "../../graphql/generated";
import { LoadingText } from "../../components/misc/LoadingText";
import { graphqlClient } from "../../graphql/client";
import { useDispatch } from "react-redux";
import { addCartItem, deleteCartItem } from "../../store/cart/cartActions";
import { Flex } from "../../components/wrappers/Flex";
import { QuantityController } from "../../components/misc/QuantityController";
import { theme } from "../../theme";

interface SingleCartItemProps {
  cartItem: CartItem;
}

export const SingleCartItem: React.FC<SingleCartItemProps> = ({ cartItem }) => {
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
        quantity: Math.max(cartItem.quantity - 1, 1),
      })
    );
  };

  if (productDataIsLoading || !productData?.product) {
    return <LoadingText>Loading cart items...</LoadingText>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        marginTop: "1rem",
        marginBottom: "1rem",
        borderRadius: "0.5rem",
      }}
    >
      <Box
        sx={{
          padding: "1rem",
          position: "relative",
          width: "100%",
          border: `solid 2px ${theme.palette.primary.main}`,
          borderRadius: "0.5rem",
        }}
      >
        <Typography fontWeight="bold" variant="h6" gutterBottom>
          {productData.product.name}
        </Typography>
        <Box>
          <Flex>
            <Typography>Quantity:</Typography>
            <QuantityController
              value={cartItem.quantity}
              onPlusButtonClick={onPlusButtonClick}
              onMinusButtonClick={onMinusButtonClick}
            />
          </Flex>
          <Flex>
            <Typography>Subtotal:</Typography>
            <Typography>
              ${cartItem.quantity * productData.product.price}.00
            </Typography>
          </Flex>
        </Box>
        {/* <ButtonGroup
          variant="contained"
          sx={{
            // position: "absolute",
            // bottom: "1rem",
            // left: "1rem",
            boxShadow: "none",
            padding: "0",
          }}
        >
          <IconButton onClick={onDeleteButtonClick}>
            <Delete />
          </IconButton>
          <IconButton onClick={onPlusButtonClick}>
            <Add />
          </IconButton>
          <IconButton
            onClick={onMinusButtonClick}
            disabled={cartItem.quantity <= 1}
          >
            <Remove />
          </IconButton>
        </ButtonGroup> */}
      </Box>
    </Box>
  );
};
