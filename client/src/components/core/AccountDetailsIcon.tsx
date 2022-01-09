import { AccountCircle } from "@mui/icons-material";
import {
  IconButton,
  IconButtonProps,
  Popover,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";

type AccountDetailsIconProps = {} & IconButtonProps;

export const AccountDetailsIcon: React.FC<AccountDetailsIconProps> = ({
  ...props
}) => {
  return (
    <>
      <IconButton {...props} sx={{ ...props.sx }}>
        <AccountCircle htmlColor="white" />
      </IconButton>
    </>
  );
};
