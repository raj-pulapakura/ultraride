import { Box, BoxProps, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { usePopularProducts } from "../../hooks/usePopularProducts";
import { Flex } from "../../shared/Flex";
import { grey } from "@mui/material/colors";

type PopularProductsProps = {} & BoxProps;

export const PopularProducts: React.FC<PopularProductsProps> = ({
  ...props
}) => {
  const popularProducts = usePopularProducts(3);

  useEffect(() => {
    console.log({ popularProducts });
  }, [popularProducts]);

  return (
    <Box {...props} sx={{ ...props.sx }}>
      <Flex style={{ flexDirection: "column", gap: "1rem" }}>
        {popularProducts?.map((product) => (
          <Flex
            style={{
              alignItems: "flex-start",
              boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.25)",
              borderRadius: "0.5rem",
            }}
          >
            <img
              src={product.imageUrl}
              style={{
                width: "50%",
              }}
            />
            <Box sx={{ padding: "1rem" }}>
              <Typography color="secondary" gutterBottom>
                POPULAR
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {product.name}
              </Typography>
              <Typography sx={{ color: grey[600] }}>
                {product.category}
              </Typography>
            </Box>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};
