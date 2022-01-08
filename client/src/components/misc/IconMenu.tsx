import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, IconButton } from "@mui/material";

interface IconMenuProps {
  icon: JSX.Element;
  items: Array<{
    text: string;
    onClick: () => void;
  }>;
}

export const IconMenu: React.FC<IconMenuProps> = ({ icon, items }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton onClick={handleClick}>{icon}</IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: "white",
          },
        }}
      >
        {items.map((item) => (
          <MenuItem
            key={item.text}
            onClick={() => {
              handleClose();
              item.onClick();
            }}
          >
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
