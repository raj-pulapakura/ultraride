import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAccountsQuery } from "../../graphql/generated";
import { graphqlClient } from "../../graphql/client";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { Settings } from "@mui/icons-material";
import { CollapseField } from "../../shared/CollapseField";
import { parseDate } from "../../utils/parseDate";

interface AccountTableProps {}

export const AccountTable: React.FC<AccountTableProps> = () => {
  const { data: accountsData } = useAccountsQuery(graphqlClient);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Join Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accountsData?.accounts.map((account) => (
            <TableRow
              key={account.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {account.id}
              </TableCell>
              <TableCell align="left">{account.firstName}</TableCell>
              <TableCell align="left">{account.lastName}</TableCell>
              <TableCell align="left">{account.email}</TableCell>
              <TableCell align="left">{parseDate(parseInt(account.createdAt))}</TableCell>
              {/* <TableCell align="left">
                <IconButton onClick={handleClick}>
                  <Settings />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={!!anchorEl}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  sx={{ boxShadow: "none" }}
                >
                  <MenuItem onClick={handleClose}>Edit Product</MenuItem>
                  <MenuItem onClick={handleClose}>Remove Product</MenuItem>
                </Menu>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
