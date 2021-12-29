import React from "react";
import { GetProductsQuery } from "../../../graphql/generated";
import { Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { useSingleProductStyles } from "./SingleProduct.styles";

interface SingleProductProps {
  product: GetProductsQuery["getProducts"][0];
}

export const SingleProduct: React.FC<SingleProductProps> = ({ product }) => {
  const classes = useSingleProductStyles();

  const navigate = useNavigate();

  const onProductBoxClick = () => {
    navigate(`products/${product.id}`);
  };

  return (
    <Box className={classes.product} onClick={onProductBoxClick}>
      <img className={classes.productImage} src={product.imageUrl} />
      <Box sx={{ padding: "1rem" }}>
        <Typography variant="h6" fontWeight="bold">
          {product.name}
        </Typography>
        <Typography sx={{ color: grey[600] }} variant="subtitle1">
          {product.category}
        </Typography>
        <Typography
          sx={{ color: "green", marginTop: "1rem" }}
          variant="subtitle2"
        >
          In Stock
        </Typography>
        <Typography variant="subtitle2">{"$" + product.price}</Typography>
      </Box>
    </Box>
  );
};
