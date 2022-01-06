import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FeaturedProduct } from "../../providers/home/FeaturedProduct";
import ultraRidePromoV2 from "../../assets/ultraride-promo-v2.svg";
import { theme } from "../../theme";
import { Flex } from "../../shared/Flex";
import { PopularProducts } from "../../providers/home/PopularProducts";

interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = ({}) => {
  const navigate = useNavigate();

  const screenIsXSmall = useMediaQuery(theme.breakpoints.up("xs"));
  const screenIsSmall = useMediaQuery(theme.breakpoints.up("sm"));
  const screenIsMedium = useMediaQuery(theme.breakpoints.up("md"));
  const screenIsLarge = useMediaQuery(theme.breakpoints.up("lg"));

  useEffect(() => {
    console.log({
      screenIsXSmall,
      screenIsSmall,
      screenIsMedium,
      screenIsLarge,
    });
  }, [screenIsXSmall, screenIsSmall, screenIsMedium, screenIsLarge]);

  return (
    <>
      {screenIsLarge ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
          }}
        >
          <img
            src={ultraRidePromoV2}
            style={{
              borderRadius: "0.5rem",
              gridColumnStart: "1",
              gridColumnEnd: "3",
              gridRowStart: "1",
              gridRowEnd: "2",
              width: "100%",
            }}
          />
          <FeaturedProduct
            sx={{
              gridRowStart: "1",
              gridRowEnd: "span 2",
            }}
          />
          <Box
            sx={{
              gridRowStart: "2",
              gridRowEnd: "3",
              gridColumnStart: "1",
              gridColumnEnd: "3",
            }}
          >
            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate("/products")}
              size="large"
            >
              Browse all Shoes
            </Button>
            <Typography sx={{ marginTop: "1rem" }}>
              Ultraride is proud to be to world's largest retailer of the
              highest quality shoes. We believe everyone deserves fantastic
              shoes. Whether you're a runner, jogger, basketballer, footballer,
              or you just want some damn good shoes, look no more.
            </Typography>
            <Typography sx={{ marginTop: "1rem" }}>
              Ultraride is proud to be to world's largest retailer of the
              highest quality shoes. We believe everyone deserves fantastic
              shoes. Whether you're a runner, jogger, basketballer, footballer,
              or you just want some damn good shoes, look no more.
            </Typography>
            <Typography sx={{ marginTop: "1rem" }}>
              Ultraride is proud to be to world's largest retailer of the
              highest quality shoes. We believe everyone deserves fantastic
              shoes. Whether you're a runner, jogger, basketballer, footballer,
              or you just want some damn good shoes, look no more.
            </Typography>
            <Typography sx={{ marginTop: "1rem" }}>
              Ultraride is proud to be to world's largest retailer of the
              highest quality shoes. We believe everyone deserves fantastic
              shoes. Whether you're a runner, jogger, basketballer, footballer,
              or you just want some damn good shoes, look no more.
            </Typography>
          </Box>
        </Box>
      ) : screenIsSmall ? (
        <>
          <img
            src={ultraRidePromoV2}
            style={{
              width: "100%",
              borderRadius: "0.5rem",
              marginBottom: "1rem",
            }}
          />
          <Flex style={{ gap: "2rem", alignItems: "flex-start" }}>
            <FeaturedProduct sx={{ width: "50%" }} />
            <Box sx={{ width: "50%" }}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => navigate("/products")}
                size="large"
              >
                Browse all Shoes
              </Button>
              <Typography sx={{ marginTop: "1rem" }}>
                Ultraride is proud to be to world's largest retailer of the
                highest quality shoes. We believe everyone deserves fantastic
                shoes. Whether you're a runner, jogger, basketballer,
                footballer, or you just want some damn good shoes, look no more.
              </Typography>
              <Typography sx={{ marginTop: "1rem" }}>
                Ultraride is proud to be to world's largest retailer of the
                highest quality shoes. We believe everyone deserves fantastic
                shoes. Whether you're a runner, jogger, basketballer,
                footballer, or you just want some damn good shoes, look no more.
              </Typography>
              <Typography sx={{ marginTop: "1rem" }}>
                Ultraride is proud to be to world's largest retailer of the
                highest quality shoes. We believe everyone deserves fantastic
                shoes. Whether you're a runner, jogger, basketballer,
                footballer, or you just want some damn good shoes, look no more.
              </Typography>
              <Typography sx={{ marginTop: "1rem" }}>
                Ultraride is proud to be to world's largest retailer of the
                highest quality shoes. We believe everyone deserves fantastic
                shoes. Whether you're a runner, jogger, basketballer,
                footballer, or you just want some damn good shoes, look no more.
              </Typography>
            </Box>
          </Flex>
        </>
      ) : (
        <Box>
          <img
            src={ultraRidePromoV2}
            style={{
              width: "100%",
              borderRadius: "0.5rem",
              marginBottom: "1rem",
            }}
          />
          <FeaturedProduct />
          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate("/products")}
            sx={{ marginTop: "1rem" }}
            size="large"
          >
            Browse all Shoes
          </Button>
          <Box>
            <Typography sx={{ marginTop: "1rem" }}>
              Ultraride is proud to be to world's largest retailer of the
              highest quality shoes. We believe everyone deserves fantastic
              shoes. Whether you're a runner, jogger, basketballer, footballer,
              or you just want some damn good shoes, look no more.
            </Typography>
            <Typography sx={{ marginTop: "1rem" }}>
              Ultraride is proud to be to world's largest retailer of the
              highest quality shoes. We believe everyone deserves fantastic
              shoes. Whether you're a runner, jogger, basketballer, footballer,
              or you just want some damn good shoes, look no more.
            </Typography>
            <Typography sx={{ marginTop: "1rem" }}>
              Ultraride is proud to be to world's largest retailer of the
              highest quality shoes. We believe everyone deserves fantastic
              shoes. Whether you're a runner, jogger, basketballer, footballer,
              or you just want some damn good shoes, look no more.
            </Typography>
            <Typography sx={{ marginTop: "1rem" }}>
              Ultraride is proud to be to world's largest retailer of the
              highest quality shoes. We believe everyone deserves fantastic
              shoes. Whether you're a runner, jogger, basketballer, footballer,
              or you just want some damn good shoes, look no more.
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};
