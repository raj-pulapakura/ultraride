import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CenterContainer } from "../../components/wrappers/CenterContainer";
import { SimpleContainer } from "../../components/wrappers/SimpleContainer";

interface EmptyCartProps {}

export const EmptyCart: React.FC<EmptyCartProps> = ({}) => {
  const navigate = useNavigate();

  const onContinueShoppingButtonClick = () => {
    navigate("/products");
  };

  return (
    <>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Your cart is empty.
      </Typography>
      <Typography>
        When you add some shoes to your cart, they will appear here.
      </Typography>
      <Button
        variant="contained"
        sx={{ marginTop: "1rem" }}
        onClick={onContinueShoppingButtonClick}
      >
        Continue Shopping
      </Button>
    </>
  );
};
