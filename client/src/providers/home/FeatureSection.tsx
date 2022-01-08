import { Box, BoxProps, Typography } from "@mui/material";
import React from "react";
import { ProductsQuery } from "../../graphql/generated";
import { ProductCarousel } from "../../shared/ProductCarousel";
import { theme } from "../../theme";
import { useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";

type FeatureSectionProps = {
  title: string;
  subtitle: string;
  products: ProductsQuery["products"];
  gradientStartColor?: string;
  gradientEndColor?: string;
} & BoxProps;

export const FeatureSection: React.FC<FeatureSectionProps> = ({
  title,
  subtitle,
  products,
  gradientStartColor,
  gradientEndColor,
  ...props
}) => {
  const navigate = useNavigate();

  const onProductClick = (product: ProductsQuery["products"][0]) => {
    navigate(`/products/${product.id}`);
  };

  const headerStartColor = gradientStartColor || theme.palette.primary.main;
  const headerEndColor = gradientEndColor || "#42e3f5";

  return (
    <Box {...props} sx={{ ...props.sx }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          textTransform: "uppercase",
          background: `linear-gradient(to top right, ${headerStartColor}, ${headerEndColor})`,
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        sx={{ marginBottom: "1rem", textTransform: "uppercase" }}
        fontWeight="bold"
      >
        {subtitle}
      </Typography>
      <ProductCarousel products={products} onProductClick={onProductClick} />
    </Box>
  );
};
