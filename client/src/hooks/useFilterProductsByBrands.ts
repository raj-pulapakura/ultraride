import { ProductsQuery } from "../graphql/generated";

export const useFilterProductsByBrands = () => {
  const filterProductsByBrands = (
    products: ProductsQuery["products"],
    brands: string[]
  ) => {
    return products.filter((product) => brands.includes(product.brand));
  };
  return { filterProductsByBrands };
};
