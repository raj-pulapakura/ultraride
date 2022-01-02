import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = ({}) => {
  const navigate = useNavigate();

  const onBrowseAllProductsButtonClick = () => {
    navigate("/products");
  };

  return (
    <Box>
      <Typography
        variant="h2"
        fontWeight="bold"
        sx={{
          background: "linear-gradient(to bottom right, #c364fa, #190087)",
          backgroundClip: "text",
          color: "transparent",
        }}
      ></Typography>
      <Button
        onClick={onBrowseAllProductsButtonClick}
        variant="contained"
        size="large"
        fullWidth
      >
        Browse All Products
      </Button>
    </Box>
  );
};
