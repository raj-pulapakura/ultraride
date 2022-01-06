import { graphqlClient } from "../graphql/client";
import {
  ProductQuery,
  ProductsQuery,
  useProductsQuery,
} from "../graphql/generated";

export const useRelatedProducts = (
  product: ProductQuery["product"]
): ProductsQuery["products"] => {
  const { data: productsData } = useProductsQuery(graphqlClient);

  const relatedProducts = productsData?.products.filter((candidate) => {
    const categoryMatches = candidate.category === product?.category;
    const tagsMatch = product?.tags.reduce(
      (acc, curr) =>
        acc || candidate.tags.map((tag) => tag.text).includes(curr.text),
      false
    );
    return (categoryMatches || tagsMatch) && product?.name !== candidate.name;
  });

  return relatedProducts || [];
};
