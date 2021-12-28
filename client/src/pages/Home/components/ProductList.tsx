import React from "react";
import { ProductsQuery } from "../../../graphql/generated";
import { SingleProduct } from "./SingleProduct";

interface ProductListProps {
  products: ProductsQuery["products"];
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
