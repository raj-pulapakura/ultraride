import { Box, BoxProps, Typography } from "@mui/material";
import React from "react";
import { ProductsQuery } from "../../graphql/generated";
import { theme } from "../../theme";
import { useNavigate } from "react-router-dom";
import { FeatureSectionProduct } from "./FeatureSectionProduct";
import { BackToLink } from "../../components/misc/BackToLink";

type FeatureSectionProps = {
  title: string;
  subtitle: string;
  product: ProductsQuery["products"][0] | null;
  gradientStartColor?: string;
  gradientEndColor?: string;
  viewSearch?: {
    searchValue: string;
    label: string;
  };
} & BoxProps;

export const FeatureSection: React.FC<FeatureSectionProps> = ({
  title,
  subtitle,
  product,
  gradientStartColor,
  gradientEndColor,
  viewSearch,
  ...props
}) => {
  const navigate = useNavigate();

  const headerStartColor = gradientStartColor || theme.palette.secondary.main;
  const headerEndColor = gradientEndColor || theme.palette.primary.main;

  if (!product) {
    return null;
  }

  return (
    <Box {...props} sx={{ ...props.sx }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 900,
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
        sx={{ textTransform: "uppercase", marginBottom: "1rem" }}
        fontWeight="bold"
      >
        {subtitle}
      </Typography>
      {viewSearch && (
        <BackToLink
          to={`/products?q=${viewSearch?.searchValue}`}
          label={viewSearch?.label}
          direction="right"
          side="right"
        />
      )}
      <FeatureSectionProduct product={product} />
    </Box>
  );
};
