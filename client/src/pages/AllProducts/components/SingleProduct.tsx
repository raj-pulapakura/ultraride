import React, { useState } from "react";
import { ProductsQuery } from "../../../graphql/generated";
import { Typography, Box, Chip, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { useSingleProductStyles } from "./SingleProduct.styles";
import { useGlobalStyles } from "../../../hooks/useGlobalStyles";
import { Add } from "@mui/icons-material";
import { AddToCartModal } from "../../../components/helper/AddToCartModal";

interface SingleProductProps {
  product: ProductsQuery["products"][0];
}

export const SingleProduct: React.FC<SingleProductProps> = ({ product }) => {
  const classes = useSingleProductStyles();
  const globalClasses = useGlobalStyles();
  const [modalVisibility, setModalVisibility] = useState(false);

  const navigate = useNavigate();

  const onProductBoxClick = () => {
    navigate(`/products/${product.id}`);
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
        <Box sx={{ marginTop: "0.5rem" }}>
          {product.tags?.map((tag) => (
            <Chip
              label={tag.text}
              key={tag.text}
              className={globalClasses.productTagChip}
            />
          ))}
        </Box>
        <Typography
          sx={{ color: "green", marginTop: "0.5rem" }}
          variant="subtitle2"
        >
          In Stock
        </Typography>
        <Typography variant="subtitle2">{"$" + product.price}</Typography>
      </Box>
      {/* <IconButton
        onClick={onAddToCartIconButtonClick}
        sx={{ position: "absolute", bottom: 10, right: 10, zIndex: 100 }}
      >
        <Add />
      </IconButton>
      {modalVisibility && (
        <AddToCartModal product={product} onClose={onAddToCartModalClose} />
      )} */}
    </Box>
  );
};
