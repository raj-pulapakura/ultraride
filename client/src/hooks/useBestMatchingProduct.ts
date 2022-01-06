import { ProductQuery } from "../graphql/generated";
import { useRelatedProducts } from "./useRelatedProducts";

export const useBestMatchingProduct = (product: ProductQuery["product"]) => {
  const relatedProducts = useRelatedProducts(product);

  const reallyRelatedProducts = relatedProducts.filter((candidate) => {
    const numberOfTagsMatch = product?.tags.reduce(
      (acc, curr) =>
        candidate.tags.map((tag) => tag.text).includes(curr.text)
          ? acc + 1
          : acc,
      0
    );

    if (numberOfTagsMatch && numberOfTagsMatch > 1) {
      return true;
    }
    return false;
  });

  if (reallyRelatedProducts[0]) {
    return reallyRelatedProducts[0];
  }

  return relatedProducts[0];
};
