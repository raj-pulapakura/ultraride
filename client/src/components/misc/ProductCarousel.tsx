import { Box, BoxProps, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { ProductsQuery } from "../../graphql/generated";
import { useNavigate } from "react-router-dom";
import { ProductCarouselSingle } from "./ProductCarouselSingle";

type ProductCarouselProps = {
  products: ProductsQuery["products"];
  onProductClick: (product: ProductsQuery["products"][0]) => void;
} & BoxProps;

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  products,
  onProductClick,
  ...props
}) => {
  const navigate = useNavigate();

  return (
    <Box
      {...props}
      sx={{
        ...props.sx,
        overflowX: "auto",
        whiteSpace: "nowrap",
        paddingBottom: "2rem",
      }}
    >
      {products.map((product) => (
        <ProductCarouselSingle
          key={product.id}
          onProductClick={onProductClick}
          product={product}
        />
      ))}
    </Box>
  );
};
