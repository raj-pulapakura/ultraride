import React from "react";
import { Backdrop } from "../misc/Backdrop";
import { Box, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useModalStyles } from "./Modal.styles";

interface ModalProps {
  onClose: () => void;
  noCrossIcon?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  onClose,
  noCrossIcon,
}) => {
  const onCloseButtonClick = () => {
    onClose();
  };

  const classes = useModalStyles();
  return (
    <>
      <Backdrop onClick={onClose} />
      <Box className={classes.modal}>
        <Box className={classes.closeButton}>
          {!noCrossIcon && (
            <IconButton onClick={onCloseButtonClick}>
              <Close />
            </IconButton>
          )}
        </Box>

        {children}
      </Box>
    </>
  );
};
