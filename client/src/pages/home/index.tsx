import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { graphqlClient } from "../../graphql/client";
import { ProductsQuery, useProductsQuery } from "../../graphql/generated";
import { FeatureSection } from "../../providers/home/FeatureSection";
import { theme } from "../../theme";

interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = ({}) => {
  const screenIsXSmall = useMediaQuery(theme.breakpoints.up("xs"));
  const screenIsSmall = useMediaQuery(theme.breakpoints.up("sm"));
  const screenIsMedium = useMediaQuery(theme.breakpoints.up("md"));
  const screenIsLarge = useMediaQuery(theme.breakpoints.up("lg"));

  // useEffect(() => {
  //   console.log({
  //     screenIsXSmall,
  //     screenIsSmall,
  //     screenIsMedium,
  //     screenIsLarge,
  //   });
  // }, [screenIsXSmall, screenIsSmall, screenIsMedium, screenIsLarge]);

  const { data: productsData } = useProductsQuery(graphqlClient);

  const nikeProducts = productsData?.products.filter(
    (product) => product.brand.toLowerCase() === "nike"
  );

  const footballProducts = productsData?.products.filter(
    (product) =>
      product.category.toLowerCase().includes("football") ||
      product.tags.map((tag) => tag.text.toLowerCase()).includes("football")
  );

  const adidasProducts = productsData?.products.filter(
    (product) => product.brand.toLowerCase() === "adidas"
  );

  const runners = productsData?.products.filter(
    (product) =>
      product.category.includes("running") ||
      product.tags.map((tag) => tag.text.toLowerCase()).includes("running")
  );

  return (
    <>
      <FeatureSection
        title="It's Nike or Nothin'"
        subtitle="Only the best"
        products={nikeProducts || []}
        gradientStartColor="#0adaff"
        gradientEndColor="#0a58ff"
      />
      <FeatureSection
        title="Football Galore"
        subtitle="Score like a Pro"
        products={footballProducts || []}
        gradientStartColor="#f54542"
        gradientEndColor="#f5c842"
        sx={{ marginTop: "3rem" }}
      />
      <FeatureSection
        title="Get Yo' Adidas On"
        subtitle="Ultra Premium Style"
        products={adidasProducts || []}
        gradientStartColor="#ca13eb"
        gradientEndColor="#4913eb"
        sx={{ marginTop: "3rem" }}
      />
      <FeatureSection
        title="Ace the Mile"
        subtitle="Leave 'em in the dust"
        products={runners || []}
        gradientStartColor="#3bff0a"
        gradientEndColor="#0adaff"
        sx={{ marginTop: "3rem" }}
      />
    </>
  );
};
