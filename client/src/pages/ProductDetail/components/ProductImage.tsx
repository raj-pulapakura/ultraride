import { Grid } from "@mui/material";
import React from "react";

interface ProductImageProps {
  productImageUrl: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  productImageUrl,
}) => {
  return (
    <Grid md={6} item>
      <img src={productImageUrl} style={{ width: "100%" }} />
    </Grid>
  );
};
