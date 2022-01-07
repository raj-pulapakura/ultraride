import { Typography } from "@mui/material";
import React from "react";
import { FloatContainer } from "../../../shared/FloatContainer";
import { SimpleContainer } from "../../../shared/SimpleContainer";

interface CheckoutFailedPageProps {}

export const CheckoutFailedPage: React.FC<CheckoutFailedPageProps> = ({}) => {
  return (
    <FloatContainer noBackground>
      <SimpleContainer>
        <Typography sx={{ color: "red" }}>
          The purchase was not successful.
        </Typography>
        <Typography variant="h5" sx={{ marginTop: "1rem" }}>
          Oh no! Something went wrong, but no money was debitted from your
          account.
        </Typography>
      </SimpleContainer>
    </FloatContainer>
  );
};
