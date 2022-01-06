import { Box, BoxProps, Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useRef, useState } from "react";
import { ProductsQuery } from "../graphql/generated";
import { useNavigate } from "react-router-dom";
import { Flex } from "./Flex";

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

  const carouselRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const carousel = carouselRef.current;
  //   if (carousel) {
  //     const carouselHeight = carousel.getBoundingClientRect().height;
  //     for (const element of Array.from(carousel.childNodes)) {
  //       const productBox = element as HTMLDivElement;
  //       productBox.style.height = carouselHeight + "px";
  //     }
  //   }
  // }, [carouselRef]);

  return (
    <>
      <Box
        {...props}
        ref={carouselRef}
        sx={{
          ...props.sx,
          overflowX: "auto",
          whiteSpace: "nowrap",
          paddingBottom: "1rem",
        }}
      >
        {products.map((product) => (
          <Box
            key={product.id}
            sx={{
              maxWidth: "250px",
              display: "inline-block",
              marginRight: "2rem",
              boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.25)",
              borderRadius: "0.5rem",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => navigate("/products/" + product.id)}
          >
            <img
              src={product?.imageUrl}
              style={{
                width: "100%",
                borderRadius: "0.5rem",
                whiteSpace: "break-spaces",
              }}
            />
            <Box sx={{ margin: "1rem" }}>
              <Typography
                variant="h6"
                sx={{ marginTop: "1rem", whiteSpace: "break-spaces" }}
                gutterBottom
              >
                {product?.name}
              </Typography>
              <Typography sx={{ color: grey[600] }}>
                {product?.category}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};
