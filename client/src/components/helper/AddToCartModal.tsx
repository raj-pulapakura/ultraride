import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { ProductQuery } from "../../graphql/generated";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../../store/cart/cartActions";
import { LoadingText } from "../../components/helper/LoadingText";
import { Modal } from "../../components/helper/Modal";
import { StoreState } from "../../store";
import { useAddToCartModalStyles } from "./AddToCartModal.styles";
import { SmallProductDisplay } from "../../components/helper/SmallProductDisplay";
import { QuantityController } from "./QuantityController";
import { Flex } from "./Flex";
import { Close } from "@mui/icons-material";

interface AddToCartModalProps {
  product: ProductQuery["product"];
  onClose: () => void;
}

export const AddToCartModal: React.FC<AddToCartModalProps> = ({
  product,
  onClose,
}) => {
  const classes = useAddToCartModalStyles();
  const dispatch = useDispatch();

  const cartItems = useSelector<StoreState>(
    (state) => state.cart.items
  ) as StoreState["cart"]["items"];

  const currentCartItem = cartItems.find(
    (cartItem) => cartItem.productId === product?.id
  );

  const [productQuantity, setProductQuantity] = useState(
    currentCartItem ? currentCartItem.quantity : 1
  );

  if (!product) {
    return <LoadingText>Loading...</LoadingText>;
  }

  const onAddToCartButtonClick = () => {
    if (productQuantity < 1) {
      return;
    }
    dispatch(
      addCartItem({ productId: product?.id, quantity: productQuantity })
    );
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <Typography variant="h6">Add product to cart</Typography>
      {currentCartItem && (
        <Typography variant="subtitle1" className={classes.alreadyInCart}>
          This product is already in your cart
        </Typography>
      )}
      <SmallProductDisplay product={product} />
      <Box>
        <Flex>
          <Typography>Quantity:</Typography>
          <QuantityController
            value={productQuantity}
            onPlusButtonClick={() => setProductQuantity(productQuantity + 1)}
            onMinusButtonClick={() => setProductQuantity(productQuantity - 1)}
          />
        </Flex>
        <Flex>
          <Typography>Subtotal:</Typography>
          <Typography> ${product.price * productQuantity}</Typography>
        </Flex>
      </Box>
      <Box className={classes.addToCartButton}>
        <Button variant="contained" fullWidth onClick={onAddToCartButtonClick}>
          {currentCartItem ? "Update cart" : "Add to cart"}
        </Button>
      </Box>
    </Modal>
  );
};
