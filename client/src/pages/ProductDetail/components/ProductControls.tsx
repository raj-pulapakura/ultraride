import { Box, Button, Chip, Typography, BoxProps } from "@mui/material";
import React, { useState } from "react";
import { AddToCartModal } from "../../../components/helper/AddToCartModal";
import { ProductQuery } from "../../../graphql/generated";
import { RelatedProducts } from "../components/RelatedProducts";

type ProductControlsProps = {
  product: ProductQuery["product"];
} & BoxProps;

export const ProductControls: React.FC<ProductControlsProps> = ({
  product,
  ...props
}) => {
  const [modalVisibility, setModalVisibility] = useState(false);

  const onAddToCartButtonClicked = () => {
    setModalVisibility(true);
  };

  const onAddToCartModalClosed = () => {
    setModalVisibility(false);
  };

  return (
    <Box {...props} sx={{ ...props.sx }}>
      <Button
        size="large"
        variant="contained"
        fullWidth
        onClick={onAddToCartButtonClicked}
      >
        Add to cart
      </Button>
      <Typography variant="body1" marginTop="1rem">
        {product?.description}
      </Typography>

      <RelatedProducts product={product} sx={{ marginTop: "2rem" }} />

      {modalVisibility && (
        <AddToCartModal product={product} onClose={onAddToCartModalClosed} />
      )}
    </Box>
  );
};
