import React from "react";
import { makeStyles } from "@mui/styles";
import { Backdrop } from "./Backdrop";
import { Box, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useModalStyles } from "./Modal.styles";
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

  const classes = useModalStyles();
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
