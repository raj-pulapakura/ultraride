import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { SimpleContainer } from "../../../components/helper/SimpleContainer";

interface EmptyCartProps {}

export const EmptyCart: React.FC<EmptyCartProps> = ({}) => {
  const navigate = useNavigate();

  const onContinueShoppingButtonClick = () => {
    navigate("/");
  };

  return (
    <>
      <SimpleContainer>
        <Typography variant="h6" textAlign="center">
          You have no products in your cart.
        </Typography>
      </SimpleContainer>
      <Button
        fullWidth
        variant="contained"
        sx={{ marginTop: "1rem" }}
        onClick={onContinueShoppingButtonClick}
      >
        Continue Shopping
      </Button>
    </>
  );
};
