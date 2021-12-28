import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { LoadingText } from "../../components/helper/LoadingText";
import { graphqlClient } from "../../graphql/client";
import { useGetProductQuery } from "../../graphql/generated";
import { makeStyles } from "@mui/styles";
import { AddToCartModal } from "./components/AddToCartModal";

const useStyles = makeStyles({
  productTitle: {
    marginBottom: "1rem",
  },
  productImage: {
    width: "100%",
    borderRadius: "2rem",
  },
  productStockAvailability: {
    color: "green",
  },
  addToCartButton: {},
});

interface ProductDetailPageProps {}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({}) => {
  const classes = useStyles();
  const params = useParams() as { productId: string };
  const [modalVisibility, setModalVisibility] = useState(false);

  const { data: productData, isLoading: productDataIsLoading } =
    useGetProductQuery(graphqlClient, {
      productIdOrName: params.productId,
    });

  if (productDataIsLoading || !productData?.getProduct) {
    return <LoadingText>Loading product...</LoadingText>;
  }

  const onAddToCartButtonClicked = () => {
    setModalVisibility(true);
  };

  const onAddToCartModalClosed = () => {
    setModalVisibility(false);
  };

  const { id, name, price, category, description, imageUrl } =
    productData.getProduct;

  return (
    <>
      <Typography
        variant="h4"
        fontWeight="bold"
        className={classes.productTitle}
      >
        {name}
      </Typography>
      <Typography
        variant="subtitle1"
        className={classes.productStockAvailability}
        marginTop="1rem"
        marginBottom="1rem"
      >
        In Stock
      </Typography>
      <img src={imageUrl} className={classes.productImage} />
      <Typography variant="body1" marginTop="1rem" marginBottom="1rem">
        {description}
      </Typography>
      <Button
        variant="contained"
        fullWidth
        className={classes.addToCartButton}
        onClick={onAddToCartButtonClicked}
      >
        Add to cart
      </Button>
      {modalVisibility && (
        <AddToCartModal
          product={productData.getProduct}
          onClose={onAddToCartModalClosed}
        />
      )}
    </>
  );
};
