import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { FloatContainer } from "../../../components/wrappers/FloatContainer";
import { SimpleContainer } from "../../../components/wrappers/SimpleContainer";

interface CheckoutSuccessPageProps {}

export const CheckoutSuccessPage: React.FC<CheckoutSuccessPageProps> = ({}) => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <FloatContainer noBackground>
      <SimpleContainer>
        <Typography sx={{ color: "green" }}>
          The purchase was successful!
        </Typography>
        <Typography variant="h5" sx={{ marginTop: "1rem" }}>
          Thank you for shopping with Ultraride.
        </Typography>
      </SimpleContainer>
    </FloatContainer>
  );
};
