import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Flex } from "./Flex";
import { grey } from "@mui/material/colors";
import { BoxProps } from "@mui/material";

type CollapseFieldProps = {
  title: string;
} & BoxProps;

export const CollapseField: React.FC<CollapseFieldProps> = ({
  title,
  children,
  ...props
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => setExpanded(!expanded);

  return (
    <Box
      {...props}
      sx={{
        "&:hover": {
          cursor: "pointer",
        },
        ...props.sx,
      }}
    >
      <Flex
        style={{
          justifyContent: "",
          gap: "0.25rem",
          borderBottom: expanded ? "none" : `solid 2px ${grey[300]}`,
        }}
      >
        <IconButton onClick={handleExpandClick}>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
        <Typography
          sx={{ marginLeft: 1, color: grey[700] }}
          variant="h6"
          fontWeight="normal"
        >
          {title}
        </Typography>
      </Flex>
      <Collapse
        sx={{ marginTop: "0.5rem" }}
        in={expanded}
        timeout="auto"
        unmountOnExit
      >
        {children}
      </Collapse>
    </Box>
  );
};
