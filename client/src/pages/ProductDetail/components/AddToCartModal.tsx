import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { GetProductQuery } from "../../../graphql/generated";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../../../store/cart/cartActions";
import { LoadingText } from "../../../components/helper/LoadingText";
import { Modal } from "../../../components/helper/Modal";
import { StoreState } from "../../../store";
import { useAddToCartModalStyles } from "./AddToCartModal.styles";
import { SmallProductDisplay } from "../../../components/helper/SmallProductDisplay";

interface AddToCartModalProps {
  product: GetProductQuery["getProduct"];
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
      <TextField
        fullWidth
        label="Quantity"
        type="number"
        value={productQuantity}
        onChange={(e) => setProductQuantity(parseInt(e.target.value))}
        InputProps={{ inputProps: { min: 1 } }}
      />
      <Typography variant="body1" marginTop="1rem">
        {`Total Price: $${product.price * productQuantity}`}
      </Typography>
      <Box className={classes.addToCartButton}>
        <Button variant="contained" fullWidth onClick={onAddToCartButtonClick}>
          {currentCartItem ? "Update cart" : "Add to cart"}
        </Button>
      </Box>
    </Modal>
  );
};
