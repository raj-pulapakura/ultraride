import { Box, Typography } from "@mui/material";
import React from "react";
import { graphqlClient } from "../../graphql/client";
import { useProductsQuery } from "../../graphql/generated";

interface UltrarideStatsProps {}

export const UltrarideStats: React.FC<UltrarideStatsProps> = ({}) => {
  const { data: productsData } = useProductsQuery(graphqlClient);

  return (
    <Box>
      <Typography>Total Products: {productsData?.products.length}</Typography>
    </Box>
  );
};
