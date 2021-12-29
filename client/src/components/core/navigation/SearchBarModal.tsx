import { Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { graphqlClient } from "../../../graphql/client";
import {
  GetProductsQuery,
  useGetProductsQuery,
} from "../../../graphql/generated";
import { Modal } from "../../helper/Modal";
import { SmallProductDisplay } from "../../helper/SmallProductDisplay";

interface SearchBarModalProps {
  onClose: () => void;
}

export const SearchBarModal: React.FC<SearchBarModalProps> = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<
    GetProductsQuery["getProducts"]
  >([]);
  const searchBarRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (searchBarRef.current) {
      searchBarRef.current.focus();
    }
  }, [searchBarRef.current]);

  const { data: productsData } = useGetProductsQuery(graphqlClient);

  const onSearchButtonClick = () => {
    const filterQuery = searchQuery.toLowerCase();
    const products = productsData?.getProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(filterQuery) ||
        product.category.toLowerCase().includes(filterQuery)
    );
    if (products) {
      setFilteredProducts(products);
    }
  };

  const onProductDisplayClick = (productId: string) => {
    onClose();
    navigate(`/products/${productId}`);
  };

  return (
    <Modal onClose={onClose} noCrossIcon>
      <input
        value={searchQuery}
        ref={searchBarRef}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: "100%",
          outline: "none",
          border: "none",
          background: grey[200],
          fontSize: "1rem",
          borderRadius: "1rem",
          padding: "1rem",
          fontFamily: "Work Sans",
        }}
      />
      <Button
        fullWidth
        onClick={onSearchButtonClick}
        variant="contained"
        sx={{ marginTop: "1rem" }}
      >
        Search
      </Button>

      {filteredProducts.length ? (
        <Typography
          sx={{ color: "green", marginTop: "1rem", marginBottom: "1rem" }}
        >
          We found {filteredProducts.length} products for you:
        </Typography>
      ) : null}

      {filteredProducts.map((product) => (
        <SmallProductDisplay
          onClick={() => onProductDisplayClick(product.id)}
          sx={{ "&:hover": { cursor: "pointer" } }}
          product={product}
        />
      ))}
    </Modal>
  );
};
