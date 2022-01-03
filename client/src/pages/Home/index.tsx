import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Flex } from "../../components/helper/Flex";
import promo from "../../promo.svg";
import { FeatureBox } from "./components/FeatureBox";

interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = ({}) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box className="section-1">
        <Typography
          sx={{
            textAlign: "center",
            marginTop: "2rem",
            fontWeight: 900,
          }}
          variant="h2"
        >
          ULTRARIDE
        </Typography>
        <Typography textAlign="center">
          The one-stop shop for shoe enthusiasts.
        </Typography>
        <Flex style={{ flexDirection: "column", marginTop: "1rem" }}>
          <Button variant="contained" color="secondary" size="large" onClick={() => navigate("/products")}>
            Explore shoes
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};
