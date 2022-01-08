import { Box, BoxProps, Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useRef, useState } from "react";
import { ProductsQuery } from "../graphql/generated";
import { useNavigate } from "react-router-dom";
import { Flex } from "./Flex";
import { SmallProductDisplay } from "./SmallProductDisplay";

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
  const [carouselHeight, setCarouselHeight] = useState(0);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      setCarouselHeight(carousel.getBoundingClientRect().height);
    }
  }, [carouselRef]);

  return (
    <Box
      {...props}
      ref={carouselRef}
      sx={{
        ...props.sx,
        overflowX: "auto",
        whiteSpace: "nowrap",
        paddingBottom: "2rem",
      }}
    >
      {products.map((product) => (
        <Box
          sx={{
            display: "inline-block",
            marginRight: "1rem",
            maxWidth: "300px",
            height: carouselHeight ? carouselHeight + "px" : "100%",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => onProductClick(product)}
        >
          <img
            src={product.imageUrl}
            style={{ width: "100%", borderRadius: "0.5rem" }}
          />
          <Typography
            variant="h6"
            sx={{
              whiteSpace: "break-spaces",
              marginTop: "1rem",
            }}
            gutterBottom
          >
            {product.name}
          </Typography>
          <Typography sx={{ whiteSpace: "break-spaces" }}>
            {product.category}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
