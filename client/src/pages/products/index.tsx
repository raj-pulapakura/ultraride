import React, { useEffect, useState } from "react";
import { ProductsQuery, useProductsQuery } from "../../graphql/generated";
import { graphqlClient } from "../../graphql/client";
import { ProductList } from "../../providers/products/ProductList";
import { FilterButton } from "../../providers/products/FilterButton";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { SortButton } from "../../providers/products/SortButton";
import { Link, useLocation } from "react-router-dom";
import { useSearchProducts } from "../../hooks/useSearchProducts";
import { theme } from "../../theme";
import { UtilityDrawer } from "../../providers/products/UtilityDrawer";
import { Flex } from "../../shared/Flex";
import { ChevronLeft } from "@mui/icons-material";
import { BackToLink } from "../../shared/BackToLink";

interface AllProductsPageProps {}

export const AllProductsPage: React.FC<AllProductsPageProps> = ({}) => {
  const { data: productsData } = useProductsQuery(graphqlClient);
  const [products, setProducts] = useState<ProductsQuery["products"]>([]);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const { searchProducts } = useSearchProducts();

  const screenIsMedium = useMediaQuery(theme.breakpoints.up("md"));

  // if there is a 'q' query param, then filter down the products
  useEffect(() => {
    const searchValue = query.get("q");
    if (productsData) {
      if (searchValue) {
        const searchedProducts = searchProducts(searchValue);
        if (searchedProducts) {
          setProducts(searchedProducts);
        } else {
          setProducts(productsData.products);
        }
      } else {
        setProducts(productsData.products);
      }
    }
  }, [query.get("q"), productsData]);

  return (
    <>
      {query.get("q") ? (
        <>
          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
          >
            <BackToLink to="/products" label="All Products" />
          </Box>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ marginBottom: "0.5rem" }}
          >
            Search Results
          </Typography>
          <Typography sx={{ marginBottom: "2rem" }}>
            Search Results for '{query.get("q")}' ({products.length})
          </Typography>
        </>
      ) : (
        <>
          <BackToLink to="/" label="Home Page" />
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ marginBottom: "2rem" }}
          >
            Browse Products
          </Typography>
        </>
      )}

      {screenIsMedium ? (
        <Flex style={{ alignItems: "self-start", gap: "1rem" }}>
          <UtilityDrawer sx={{ maxWidth: "25%" }} />
          <ProductList products={products} />
        </Flex>
      ) : (
        <>
          <FilterButton />
          <SortButton sx={{ marginLeft: "0.5rem" }} />
          <ProductList products={products} />
        </>
      )}
    </>
  );
};
