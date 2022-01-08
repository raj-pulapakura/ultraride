import { useProductsQuery } from "../graphql/generated";
import { graphqlClient } from "../graphql/client";

export const useSearchProducts = () => {
  const { data: productsData } = useProductsQuery(graphqlClient);

  const searchProducts = (searchValue: string) => {
    searchValue = searchValue.toLowerCase();

    return productsData?.products.filter((product) => {
      const productName = product.name.toLowerCase();
      const productCategory = product.category.toLowerCase();
      const productTags = product.tags.map((tag) => tag.text.toLowerCase());
      const productBrand = product.brand.toLowerCase();

      const productNameContainsSearchValue = productName.includes(searchValue);
      const productCategoryContainsSearchValue =
        productCategory.includes(searchValue);
      const searchValueContainsProductName = searchValue.includes(productName);
      const searchValueContainsProductCategory =
        searchValue.includes(productCategory);
      const productTagsIncludeSearchValue = productTags.includes(searchValue);
      const searchValueIncludesProductTags = productTags.reduce(
        (acc, curr) => searchValue.includes(curr) || acc,
        false
      );
      const productBrandIncludesSearchValue =
        productBrand.includes(searchValue);
      const searchValueIncludesProductBrand =
        searchValue.includes(productBrand);

      return (
        productNameContainsSearchValue ||
        productCategoryContainsSearchValue ||
        searchValueContainsProductName ||
        searchValueContainsProductCategory ||
        productTagsIncludeSearchValue ||
        searchValueIncludesProductTags ||
        productBrandIncludesSearchValue ||
        searchValueIncludesProductBrand
      );
    });
  };

  return { searchProducts };
};
