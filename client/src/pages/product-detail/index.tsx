import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Typography, Box, useMediaQuery, Chip, Grid } from "@mui/material";
import { LoadingText } from "../../shared/LoadingText";
import { graphqlClient } from "../../graphql/client";
import { useProductQuery } from "../../graphql/generated";
import { theme } from "../../theme";
import { Flex } from "../../shared/Flex";
import { ChevronLeft } from "@mui/icons-material";
import { ProductControls } from "../../providers/product-detail/ProductControls";
import { RelatedProducts } from "../../providers/product-detail/RelatedProducts";
import { BackToLink } from "../../shared/BackToLink";

interface ProductDetailPageProps {}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({}) => {
  const navigate = useNavigate();
  const params = useParams() as { productId: string };

  const { data: productData, isLoading: productDataIsLoading } =
    useProductQuery(graphqlClient, {
      productIdOrName: params.productId,
    });

  const screenIsSmall = useMediaQuery(theme.breakpoints.up("sm"));
  const screenIsMedium = useMediaQuery(theme.breakpoints.up("md"));

  if (productDataIsLoading) {
    return <LoadingText actionText="Loading product..." />;
  }

  if (!productData?.product) {
    return (
      <LoadingText
        actionText="That product does not exist"
        actionButton="Browse products"
        actionButtonOnClick={() => navigate("/products")}
      />
    );
  }

  return (
    <>
      <BackToLink to="/products" label="All products" />
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ marginBottom: "0.2rem" }}
      >
        {productData?.product.name}
      </Typography>
      <Typography variant="subtitle1">
        {productData.product.category}
      </Typography>
      <Box sx={{ marginTop: "0.5rem", marginBottom: "1rem" }}>
        {productData.product.tags.map((tag) => (
          <Chip
            color="primary"
            sx={{ marginLeft: "0.2rem", marginBottom: "0.5rem" }}
            label={tag.text}
            key={tag.text}
          />
        ))}
      </Box>

      {screenIsMedium ? (
        <Box>
          <Flex style={{ gap: "4rem", alignItems: "flex-start" }}>
            <Grid sx={{ width: "50%" }} container spacing={theme.spacing(1)}>
              <Grid md={6} item>
                <img
                  src={productData.product.imageUrl}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid md={6} item>
                <img
                  src={productData.product.imageUrl}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid md={6} item>
                <img
                  src={productData.product.imageUrl}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid md={6} item>
                <img
                  src={productData.product.imageUrl}
                  style={{ width: "100%" }}
                />
              </Grid>
            </Grid>
            <ProductControls
              sx={{ width: "50%" }}
              product={productData.product}
            />
          </Flex>
        </Box>
      ) : screenIsSmall ? (
        <Box>
          <Flex style={{ gap: "2rem", alignItems: "flex-start" }}>
            <Grid sx={{ width: "50%" }} container spacing={theme.spacing(1)}>
              <Grid sm={12} item>
                <img
                  src={productData.product.imageUrl}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid sm={12} item>
                <img
                  src={productData.product.imageUrl}
                  style={{ width: "100%" }}
                />
              </Grid>
            </Grid>
            <ProductControls
              sx={{ width: "50%" }}
              product={productData.product}
            />
          </Flex>
        </Box>
      ) : (
        <Box>
          <img
            src={productData.product.imageUrl}
            style={{ width: "100%", marginBottom: "1rem" }}
          />
          <ProductControls product={productData.product} />
        </Box>
      )}
    </>
  );
};
