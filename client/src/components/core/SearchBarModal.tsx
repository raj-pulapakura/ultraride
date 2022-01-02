import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductsQuery } from "../../graphql/generated";
import { useSearchProducts } from "../../hooks/useSearchProducts";
import { Modal } from "../helper/Modal";
import { SmallProductDisplay } from "../helper/SmallProductDisplay";

interface SearchBarModalProps {
  onClose: () => void;
}

export const SearchBarModal: React.FC<SearchBarModalProps> = ({ onClose }) => {
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState<ProductsQuery["products"]>([]);
  const searchBarRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { searchProducts } = useSearchProducts();

  // when the user enters the search value, they are redirected to products page
  useEffect(() => {
    if (searchBarRef.current) {
      searchBarRef.current.focus();
      searchBarRef.current.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          navigate(`/products?q=${searchValue}`);
          onClose();
        }
      });
    }
  }, [searchBarRef.current, searchValue]);

  // everytime the search value changes, the displayed products are updated
  useEffect(() => {
    if (!searchValue) {
      return;
    }
    const searchedProducts = searchProducts(searchValue);
    if (searchedProducts) {
      setProducts(searchedProducts);
    }
  }, [searchValue]);

  const onProductClick = (productId: string) => {
    onClose();
    navigate(`/products/${productId}`);
  };

  return (
    <Modal onClose={onClose} noCrossIcon>
      <input
        value={searchValue}
        ref={searchBarRef}
        onChange={(e) => setSearchValue(e.target.value)}
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
      {products.length ? (
        <Typography
          sx={{ color: "green", marginTop: "1rem", marginBottom: "1rem" }}
        >
          We found {products.length} products for you:
        </Typography>
      ) : searchValue ? (
        <Typography sx={{ color: "red", marginTop: "1rem" }}>
          Sorry, we couldn't find any products for you
        </Typography>
      ) : null}

      {products.map((product) => (
        <SmallProductDisplay
          key={product.id}
          onClick={() => onProductClick(product.id)}
          sx={{ "&:hover": { cursor: "pointer" } }}
          product={product}
        />
      ))}
    </Modal>
  );
};
