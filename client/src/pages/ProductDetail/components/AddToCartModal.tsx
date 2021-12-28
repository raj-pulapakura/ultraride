import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ProductQuery } from "../../../graphql/generated";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../../../store/cart/cartActions";
import { LoadingText } from "../../../components/helper/LoadingText";
import { Modal } from "../../../components/helper/Modal";
import { StoreState } from "../../../store";

const useStyles = makeStyles({
  alreadyInCart: {
    color: "green",
  },
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
  quantityInput: {},
  addToCartButton: {
    marginTop: "1rem",
  },
});

interface AddToCartModalProps {
  product: ProductQuery["product"];
  setModalVisibility: (value: boolean) => void;
}

export const AddToCartModal: React.FC<AddToCartModalProps> = ({
  product,
  setModalVisibility,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const cartItems = useSelector<StoreState>(
    (state) => state.cart.items
  ) as StoreState["cart"]["items"];

  const currentCartItem = cartItems.find(
    (cartItem) => cartItem.productId === product?.name
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
      addCartItem({ productId: product?.name, quantity: productQuantity })
    );
    setModalVisibility(false);
  };

  return (
    <Modal setModalVisibility={setModalVisibility}>
      <Typography variant="h6">Add product to cart</Typography>
      {currentCartItem && (
        <Typography variant="subtitle1" className={classes.alreadyInCart}>
          This product is already in you cart
        </Typography>
      )}
      <Box className={classes.productBox}>
        <img src={product?.imageUrl} className={classes.productImage} />
        <Box className={classes.productDetails}>
          <Typography variant="subtitle1">{product?.name}</Typography>
          <Typography variant="subtitle2" className={classes.productCategory}>
            {product?.category}
          </Typography>
          <Typography variant="subtitle2" className={classes.productCategory}>
            {"$" + product?.price}
          </Typography>
        </Box>
      </Box>
      <TextField
        fullWidth
        label="Quantity"
        type="number"
        value={productQuantity}
        onChange={(e) => setProductQuantity(parseInt(e.target.value))}
        className={classes.quantityInput}
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
