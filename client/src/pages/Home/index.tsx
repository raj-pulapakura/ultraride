import React, { useEffect } from "react";
import { useGetProductsQuery } from "../../graphql/generated";
import { graphqlClient } from "../../graphql/client";
import { ProductList } from "./components/ProductList";
import { LoadingText } from "../../components/helper/LoadingText";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../store/product/productActions";
import { StoreState } from "../../store";

interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = ({}) => {
  const { data: productsData, isLoading: productsDataIsLoading } =
    useGetProductsQuery(graphqlClient);

  const dispatch = useDispatch();

  useEffect(() => {
    if (productsData?.getProducts) {
      dispatch(setProducts(productsData?.getProducts));
    }
  }, [productsData?.getProducts]);

  const products = useSelector<StoreState>(
    (state) => state.product.products
  ) as StoreState["product"]["products"];

  if (productsDataIsLoading || !productsData?.getProducts) {
    return <LoadingText>Loading products...</LoadingText>;
  }

  return (
    <>
      <ProductList products={products} />
    </>
  );
};
