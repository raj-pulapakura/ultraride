import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { ProductsQuery } from "../../graphql/generated";

interface ProductCarouselSingleProps {
  onProductClick: (product: ProductsQuery["products"][0]) => void;
  product: ProductsQuery["products"][0];
}

export const ProductCarouselSingle: React.FC<ProductCarouselSingleProps> = ({
  onProductClick,
  product,
}) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [controlsShowing, setControlsShowing] = useState(false);

  return (
    <Box
      ref={boxRef}
      sx={{
        display: "inline-block",
        marginRight: "1rem",
        maxWidth: "300px",
        position: "relative",
      }}
      onMouseOver={() => setControlsShowing(true)}
      onClick={() => setControlsShowing(true)}
      onMouseLeave={() => setControlsShowing(false)}
    >
      <img
        src={product.imageUrl}
        style={{ width: "100%", borderRadius: "0.5rem" }}
      />
      {controlsShowing && (
        <>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.65)",
              borderRadius: "0.5rem",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  whiteSpace: "break-spaces",
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                {product.name}
              </Typography>
              <Button
                sx={{
                  color: "white",
                  border: "solid 2px white",
                  marginTop: "1rem",
                  "&:hover": {
                    border: "solid 2px white",
                  },
                }}
                fullWidth
                variant="outlined"
                onClick={() => onProductClick(product)}
              >
                Explore
              </Button>
            </Box>
          </div>
        </>
      )}
    </Box>
  );
};
