import { Box, BoxProps, Typography } from "@mui/material";
import React from "react";
import { GetProductQuery } from "../../graphql/generated";
import { useSmallProductDisplayStyles } from "./SmallProductDisplay.styles";

type SmallProductDisplayProps = {
  product: GetProductQuery["getProduct"];
} & BoxProps;

export const SmallProductDisplay: React.FC<SmallProductDisplayProps> = ({
  product,
  ...props
}) => {
  const classes = useSmallProductDisplayStyles();

  return (
    <Box {...props} className={classes.productBox}>
      <img src={product?.imageUrl} className={classes.productImage} />
      <Box className={classes.productDetails}>
        <Typography variant="subtitle1">{product?.name}</Typography>
        <Typography variant="subtitle2" className={classes.productCategory}>
          {product?.category}
        </Typography>
        <Typography variant="subtitle2" className={classes.productCategory}>
          {"$" + product?.price}
        </Typography>
      </Box>
    </Box>
  );
};
