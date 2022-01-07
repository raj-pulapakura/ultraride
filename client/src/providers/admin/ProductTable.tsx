import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import { graphqlClient } from "../../graphql/client";
import { ProductsQuery, useProductsQuery } from "../../graphql/generated";
import Settings from "@mui/icons-material/Settings";
import { IconMenu } from "../../shared/IconMenu";
import { EditProductModal } from "./EditProductModal";
import { RemoveProductModal } from "./RemoveProductModal";
import { useNavigate } from "react-router-dom";

interface ProductTableProps {}

export const ProductTable: React.FC<ProductTableProps> = ({}) => {
  const { data: productsData } = useProductsQuery(graphqlClient);
  const [actionsModalVisible, setActionsModalVisible] = useState(false);
  const [currentProductId, setCurrentProductId] = useState("");
  const [actionMode, setActionMode] = useState("");
  const navigate = useNavigate();

  const onProductActionClick = (productId: string, actionMode: string) => {
    setActionsModalVisible(true);
    setCurrentProductId(productId);
    setActionMode(actionMode);
  };

  const onActionsModalClose = () => {
    setActionsModalVisible(false);
    setCurrentProductId("");
    setActionMode("");
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">Id</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Brand</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Price ($USD)</TableCell>
              <TableCell align="left">Category</TableCell>
              <TableCell align="left">Image URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsData?.products.map((product) => (
              <TableRow
                key={product?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">
                  <IconMenu
                    icon={<Settings />}
                    items={[
                      {
                        text: "Edit",
                        onClick: () => onProductActionClick(product.id, "edit"),
                      },
                      {
                        text: "Remove",
                        onClick: () =>
                          onProductActionClick(product.id, "remove"),
                      },
                      {
                        text: "View in store",
                        onClick: () => {
                          navigate("/products/" + product.id);
                        },
                      },
                    ]}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {product.id}
                </TableCell>
                <TableCell align="left">{product.name}</TableCell>
                <TableCell align="left">{product.brand}</TableCell>
                <TableCell align="left">{product.description}</TableCell>
                <TableCell align="left">{product.price}</TableCell>
                <TableCell align="left">{product.category}</TableCell>
                <TableCell align="left">
                  <a href={product.imageUrl}>{product.imageUrl}</a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {actionsModalVisible && actionMode === "edit" ? (
        <>
          <EditProductModal
            onClose={onActionsModalClose}
            product={
              productsData?.products.find(
                (product) => product.id === currentProductId
              ) as ProductsQuery["products"][0]
            }
          />
        </>
      ) : actionMode === "remove" ? (
        <>
          <RemoveProductModal
            onClose={onActionsModalClose}
            product={
              productsData?.products.find(
                (product) => product.id === currentProductId
              ) as ProductsQuery["products"][0]
            }
          />
        </>
      ) : null}
    </Box>
  );
};
