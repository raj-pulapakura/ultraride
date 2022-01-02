import { graphqlClient } from "../graphql/client";
import { useProductsQuery } from "../graphql/generated";

export const useAllTags = () => {
  const { data: productsData } = useProductsQuery(graphqlClient);

  let tags: string[] = [];
  if (productsData) {
    for (const product of productsData?.products) {
      tags = [...tags, ...product.tags.map((tag) => tag.text)];
    }
  }
  return Array.from(new Set(tags));
};
