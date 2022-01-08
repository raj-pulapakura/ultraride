import { Button, ButtonGroup, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FloatContainer } from "../wrappers/FloatContainer";

interface Route404Props {}

export const Route404: React.FC<Route404Props> = ({}) => {
  const navigate = useNavigate();
  const onButtonClick = (path: string) => {
    navigate(path);
  };
  return (
    <>
      <FloatContainer noBackground textCentered>
        <Typography variant="h1" fontWeight="bold">
          404
        </Typography>
        <Typography variant="h5" fontWeight="bold">
          That page could not be found.
        </Typography>
        <ButtonGroup sx={{ marginTop: "1rem" }} size="large">
          <Button onClick={() => onButtonClick("/")} variant="contained">
            Home Page
          </Button>
          <Button onClick={() => onButtonClick("/products")} variant="outlined">
            Browse products
          </Button>
        </ButtonGroup>
      </FloatContainer>
    </>
  );
};
