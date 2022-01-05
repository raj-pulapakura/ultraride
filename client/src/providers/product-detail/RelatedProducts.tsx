import { Typography } from "@mui/material";
import { Box, BoxProps } from "@mui/system";
import React, { useEffect, useState } from "react";
import { ProductQuery } from "../../graphql/generated";
import { useRelatedProducts } from "../../hooks/useRelatedProducts";
import { useNavigate } from "react-router-dom";
import { ProductCarousel } from "../../shared/ProductCarousel";

type RelatedProductsProps = {
  product: ProductQuery["product"];
} & BoxProps;

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  product,
  ...props
}) => {
  const navigate = useNavigate();

  const relatedProducts = useRelatedProducts(product);

  return (
    <Box {...props}>
      <Typography variant="h6">You might also like:</Typography>
      <ProductCarousel
        products={relatedProducts}
        onProductClick={(product) => navigate("/products/" + product.id)}
        sx={{ marginTop: "1rem" }}
      />
    </Box>
  );
};
