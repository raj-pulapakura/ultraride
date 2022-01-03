import { Box, BoxProps, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";
import { ProductsQuery } from "../../graphql/generated";

type ProductCarouselProps = {
  products: ProductsQuery["products"];
  onProductClick: (product: ProductsQuery["products"][0]) => void;
} & BoxProps;

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  products,
  onProductClick,
  ...props
}) => {
  const [currentProductId, setCurrentProductId] = useState(products[0]?.id);

  const currentProduct = products.find(
    (product) => product.id === currentProductId
  );

  return (
    <Box
      {...props}
      sx={{
        ...props.sx,
        overflowX: "scroll",
        whiteSpace: "nowrap",
        paddingBottom: "2rem",
      }}
    >
      {products.map((product) => (
        <Box
          sx={{
            maxWidth: "250px",
            display: "inline-block",
            marginRight: "2rem",
          }}
        >
          <img
            src={product?.imageUrl}
            style={{ width: "100%", borderRadius: "1rem" }}
          />
          <Typography
            variant="h6"
            sx={{ marginTop: "1rem", whiteSpace: "break-spaces" }}
          >
            {product?.name}
          </Typography>
          <Typography sx={{ color: grey[600] }}>{product?.category}</Typography>
        </Box>
      ))}
    </Box>
  );
};
