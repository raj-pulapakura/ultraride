import { Container, makeStyles, Box } from "@mui/material";
import React from "react";
import { theme } from "../../theme";

interface FloatContainerProps {
  noBackground?: boolean;
  backgroundColor?: string;
  textCentered?: boolean;
}

export const FloatContainer: React.FC<FloatContainerProps> = ({
  children,
  noBackground,
  textCentered,
  backgroundColor,
}) => {
  return (
    <div
      style={{
        width: "max(60%, 500px)",
        position: "absolute",
        left: "50%",
        top: "40%",
        transform: "translate(-50%, -50%)",
        textAlign: textCentered ? "center" : "unset"
      }}
    >
      {noBackground ? (
        <Container>
          <Box borderRadius="1rem" padding="2rem" marginTop="2rem">
            {children}
          </Box>
        </Container>
      ) : (
        <Container>
          <Box
            borderRadius="1rem"
            padding="2rem"
            marginTop="2rem"
            bgcolor={backgroundColor || theme.palette.primary.main}
          >
            {children}
          </Box>
        </Container>
      )}
    </div>
  );
};
