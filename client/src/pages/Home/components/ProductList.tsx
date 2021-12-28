import React from "react";
import { GetProductsQuery } from "../../../graphql/generated";
import { SingleProduct } from "./SingleProduct";

interface ProductListProps {
  products: GetProductsQuery["getProducts"];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <>
      {products.map((product) => (
        <SingleProduct key={product.id} product={product} />
      ))}
    </>
  );
};
