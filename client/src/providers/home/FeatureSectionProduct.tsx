import { Chip, Typography, useMediaQuery } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SmallProductDisplay } from "../../components/misc/SmallProductDisplay";
import { Flex } from "../../components/wrappers/Flex";
import { ProductsQuery } from "../../graphql/generated";
import { theme } from "../../theme";

interface FeatureSectionProductProps {
  product: ProductsQuery["products"][0];
}

export const FeatureSectionProduct: React.FC<FeatureSectionProductProps> = ({
  product,
}) => {
  const navigate = useNavigate();

  const onProductClick = () => {
    navigate(`/products/${product.id}`);
  };

  const screenIsSmall = useMediaQuery(theme.breakpoints.up("sm"));
  const screenIsMedium = useMediaQuery(theme.breakpoints.up("md"));
  const screenIsLarge = useMediaQuery(theme.breakpoints.up("lg"));

  useEffect(() => {
    console.log({ screenIsSmall, screenIsMedium, screenIsLarge });
  }, [screenIsSmall, screenIsMedium]);

  return (
    <Box onClick={onProductClick} sx={{ "&:hover": { cursor: "pointer" } }}>
      {screenIsMedium ? (
        <>
          <Flex
            style={{
              justifyContent: "",
              gap: "1rem",
              alignItems: "flex-start",
              margin: "auto",
            }}
          >
            <img
              src={product.imageUrl}
              style={{ width: "50%", borderRadius: "1rem", marginTop: "1rem" }}
            />
            <Box>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ marginTop: "1rem" }}
                gutterBottom
              >
                {product.name}
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: grey[700], marginBottom: "1rem" }}
              >
                {product.category}
              </Typography>
              {product.tags.map((tag) => (
                <Chip
                  key={tag.text}
                  label={tag.text}
                  color="primary"
                  sx={{ marginBottom: "0.5rem", marginRight: "0.5rem" }}
                />
              ))}
              <Typography
                sx={{
                  color: grey[700],
                  marginTop: "1rem",
                }}
              >
                {product.description}
              </Typography>
            </Box>
          </Flex>
        </>
      ) : screenIsSmall ? (
        <Flex
          style={{ justifyContent: "", gap: "1rem", alignItems: "flex-start" }}
        >
          <img
            src={product.imageUrl}
            style={{ width: "50%", borderRadius: "1rem", marginTop: "1rem" }}
          />
          <Box>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ marginTop: "1rem" }}
              gutterBottom
            >
              {product.name}
            </Typography>
            <Typography sx={{ color: grey[700], marginBottom: "1rem" }}>
              {product.category}
            </Typography>
            {product.tags.map((tag) => (
              <Chip
                key={tag.text}
                label={tag.text}
                color="primary"
                sx={{ marginBottom: "0.5rem", marginRight: "0.5rem" }}
              />
            ))}
          </Box>
        </Flex>
      ) : (
        <>
          <img
            src={product.imageUrl}
            style={{ width: "100%", borderRadius: "1rem", marginTop: "1rem" }}
          />
          <Typography variant="h6" fontWeight="bold" sx={{ marginTop: "1rem" }}>
            {product.name}
          </Typography>
          <Typography sx={{ color: grey[700] }}>{product.category}</Typography>
        </>
      )}
    </Box>
  );
};
