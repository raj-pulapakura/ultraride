import { Grid } from "@mui/material";
import React from "react";
import { GetProductsQuery } from "../../../graphql/generated";
import { SingleProduct } from "./SingleProduct";

interface ProductListProps {
  products: GetProductsQuery["getProducts"];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <Grid container sx={{ maxWidth: "100%" }} spacing={2}>
      {products.map((product) => (
        <Grid
          key={product.id}
          item
          sx={{ width: "100%" }}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          xl={3}
        >
          <SingleProduct key={product.id} product={product} />
        </Grid>
      ))}
    </Grid>
  );
};
