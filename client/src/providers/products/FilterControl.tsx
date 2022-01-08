import { Typography, Box, Chip, BoxProps } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGlobalStyles } from "../../hooks/useGlobalStyles";
import { checkArraysEqual } from "../../utils/checkArraysEqual";

type FilterControlProps = {
  header: string;
  setter: Function;
  sourceArray: any[];
  currentArray: any[];
} & BoxProps;

export const FilterControl: React.FC<FilterControlProps> = ({
  header,
  setter,
  sourceArray,
  currentArray,
  ...props
}) => {
  const dispatch = useDispatch();
  const globalClasses = useGlobalStyles();

  // useEffect(() => {
  //   console.log({ header, sourceArray, currentArray });
  // }, [sourceArray, currentArray, header]);

  const onTagClick = (text: string) => {
    console.log({ currentArray, text });

    // user chose 'All'
    if (text === "All") {
      return dispatch(setter(sourceArray));
    }

    // user chose another tag while current tag is 'All'
    if (checkArraysEqual(sourceArray, currentArray)) {
      return dispatch(setter([text]));
    }

    // only one filter tag has been chosen
    if (currentArray.length === 1 && currentArray.includes(text)) {
      return;
    }

    // text is already included in the filter tag - remove
    if (currentArray.includes(text)) {
      return dispatch(setter(currentArray.filter((tag) => tag !== text)));
    }

    // add a tag
    dispatch(setter([...currentArray, text]));
  };

  return (
    <Box {...props}>
      <Typography sx={{ marginBottom: "1rem" }} variant="h6">
        {header}
      </Typography>
      <Box>
        <Chip
          label="All"
          onClick={() => onTagClick("All")}
          sx={{ marginBottom: "0.5rem", marginRight: "0.5rem" }}
          color={
            checkArraysEqual(sourceArray, currentArray)
              ? "secondary"
              : "default"
          }
        />
        {sourceArray.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            className={globalClasses.productTagChip}
            sx={{ marginBottom: "0.5rem", marginRight: "0.5rem" }}
            onClick={() => onTagClick(tag)}
            color={
              currentArray.includes(tag) &&
              !checkArraysEqual(sourceArray, currentArray)
                ? "secondary"
                : "default"
            }
          />
        ))}
      </Box>
    </Box>
  );
};
