import { ProductsQuery } from "../graphql/generated";

export const useFilterProducts = () => {
  const filterProducts = (
    products: ProductsQuery["products"],
    tags: string[]
  ) => {
    return products.filter((product) => {
      const productTags = product.tags.map((tag) => tag.text);
      for (const tag of tags) {
        if (productTags.includes(tag)) {
          return true;
        }
      }
      return false;
    });
  };
  return { filterProducts };
};
