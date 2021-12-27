import React from "react";
import { CartItem } from "../../../store/cart/cartTypes";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useProductQuery } from "../../../graphql/generated";
import { LoadingText } from "../../../components/helper/LoadingText";
import { graphqlClient } from "../../../graphql/client";

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
});

interface SingleCartItemProps {
  cartItem: CartItem;
}

export const SingleCartItem: React.FC<SingleCartItemProps> = ({ cartItem }) => {
  const classes = useStyles();

  const { data: productData, isLoading: productDataIsLoading } =
    useProductQuery(graphqlClient, {
      productIdOrName: cartItem.productId,
    });

  if (productDataIsLoading || !productData?.product) {
    return <LoadingText>Loading cart items...</LoadingText>;
  }

  const { product } = productData;

  return (
    <Box className={classes.productBox}>
      <img src={product?.imageUrl} className={classes.productImage} />
      <Box className={classes.productDetails}>
        <Typography variant="subtitle1">{product?.name}</Typography>
        <Typography variant="subtitle2" className={classes.productCategory}>
          {`Quantity: ${cartItem.quantity}`}
        </Typography>
      </Box>
    </Box>
  );
};
