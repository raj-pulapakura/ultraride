import { Box, Typography, BoxProps } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { graphqlClient } from "../../graphql/client";
import { useProductQuery } from "../../graphql/generated";
import { SimpleContainer } from "../../shared/SimpleContainer";
import { StoreState } from "../../store";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

type FeaturedProductProps = {} & BoxProps;

export const FeaturedProduct: React.FC<FeaturedProductProps> = ({
  ...props
}) => {
  const navigate = useNavigate();

  const featuredProductId = useSelector<StoreState>(
    (state) => state.product.featuredProductId.data
  ) as StoreState["product"]["featuredProductId"]["data"];

  const { data: featuredProductData } = useProductQuery(graphqlClient, {
    productIdOrName: featuredProductId,
  });

  const onFeaturedProductClick = () => {
    navigate("/products/" + featuredProductId);
  };

  return (
    <SimpleContainer
      {...props}
      sx={{
        ...props.sx,
        padding: "0rem",
        "&:hover": {
          cursor: "pointer",
        },
      }}
      onClick={onFeaturedProductClick}
    >
      <img
        src={featuredProductData?.product?.imageUrl}
        style={{ width: "100%", borderRadius: "0.5rem" }}
      />
      <Box sx={{ padding: "1rem" }}>
        <Typography color="secondary" gutterBottom>
          FEATURED
        </Typography>
        <Typography variant="h5" fontWeight="bold">
          {featuredProductData?.product?.name}
        </Typography>
        <Typography gutterBottom>
          {featuredProductData?.product?.category}
        </Typography>
        <Typography sx={{ color: grey[600] }}>
          {featuredProductData?.product?.description}
        </Typography>
      </Box>
    </SimpleContainer>
  );
};
