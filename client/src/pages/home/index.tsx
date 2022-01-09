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

  const footballProducts = productsData?.products.filter(
    (product) =>
      product.category.toLowerCase().includes("football") ||
      product.tags.map((tag) => tag.text.toLowerCase()).includes("football")
  );

  const runners = productsData?.products.filter(
    (product) =>
      product.category.toLowerCase().includes("running") ||
      product.tags.map((tag) => tag.text.toLowerCase()).includes("running")
  );

  const golfProducts = productsData?.products.filter(
    (product) =>
      product.category.includes("golf") ||
      product.tags.map((tag) => tag.text.toLowerCase()).includes("golf")
  );

  return (
    <Box sx={{ maxWidth: "60rem", margin: "auto" }}>
      <FeatureSection
        title="Football Fiesta"
        subtitle="Score like a Pro"
        product={footballProducts ? footballProducts[0] : null}
        viewSearch={{
          searchValue: "football",
          label: "View all Football Shoes",
        }}
      />
      <FeatureSection
        title="Conquer the Mile"
        subtitle="Leave 'em in the dust"
        product={runners ? runners[0] : null}
        sx={{ marginTop: "3rem" }}
        viewSearch={{
          searchValue: "running",
          label: "View all Running shoes",
        }}
      />
      <FeatureSection
        title="Birdies all the way"
        subtitle="Golf shoes that are as slick as you"
        product={golfProducts ? golfProducts[0] : null}
        sx={{ marginTop: "3rem" }}
        viewSearch={{
          searchValue: "golf",
          label: "View all Golf Shoes",
        }}
      />
    </Box>
  );
};
