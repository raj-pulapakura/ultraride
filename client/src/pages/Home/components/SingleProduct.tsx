import React from "react";
import { ProductsQuery } from "../../../graphql/generated";
import { Typography, Box, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { theme } from "../../../theme";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  product: {
    borderRadius: "1rem",
    background: "white",
    display: "flex",
    marginBottom: "1rem",
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.25)",
  },
  productImage: {
    width: "40%",
  },
  productDetails: {
    padding: "0.5rem 1rem",
  },
  productDetailsPrice: {},
  productDetailsCategory: {
    color: "grey",
  },
  productDetailsStockAvailable: {
    color: "green",
  },
  productDetailsAddToCart: {},
  productDetailsAddToCartButton: {},
});

interface SingleProductProps {
  product: ProductsQuery["products"][0];
}

export const SingleProduct: React.FC<SingleProductProps> = ({ product }) => {
  const classes = useStyles();

  const navigate = useNavigate();

  const onProductBoxClick = () => {
    navigate(`products/${product.name}`);
  };

  return (
    <Box
      className={classes.product}
      key={product.name}
      onClick={onProductBoxClick}
    >
      <img className={classes.productImage} src={product.imageUrl} />
      <Box className={classes.productDetails}>
        <Typography variant="subtitle1" fontWeight="bold">
          {product.name}
        </Typography>
        <Typography
          className={classes.productDetailsCategory}
          variant="subtitle1"
        >
          {product.category}
        </Typography>
        <Typography
          className={classes.productDetailsStockAvailable}
          variant="subtitle2"
        >
          In Stock
        </Typography>
        <Typography className={classes.productDetailsPrice} variant="subtitle2">
          {"$" + product.price}
        </Typography>
      </Box>
    </Box>
  );
};
