import React from "react";
import { makeStyles } from "@mui/styles";
import { Backdrop } from "./Backdrop";
import { Box, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const useStyles = makeStyles({
  modal: {
    position: "fixed",
    width: "clamp(50%, 400px, 90%)",
    left: "50%",
    top: "10%",
    transform: "translateX(-50%)",
    background: "white",
    borderRadius: "1rem",
    padding: "1rem",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

interface ModalProps {
  setModalVisibility: (value: boolean) => void;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  setModalVisibility,
}) => {
  const onCloseButtonClick = () => {
    setModalVisibility(false);
  };

  const classes = useStyles();
  return (
    <>
      <Backdrop />
      <Box className={classes.modal}>
        <Box className={classes.closeButton}>
          <IconButton onClick={onCloseButtonClick}>
            <Close />
          </IconButton>
        </Box>

        {children}
      </Box>
    </>
  );
};
