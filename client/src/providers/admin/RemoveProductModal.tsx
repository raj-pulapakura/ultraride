import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { graphqlClient } from "../../graphql/client";
import {
  ProductsQuery,
  useDeleteProductMutation,
} from "../../graphql/generated";
import { AttributeText } from "../../components/misc/AttributeText";
import { Flex } from "../../components/wrappers/Flex";
import { FormTitle } from "../../components/forms/FormTitle";
import { Modal } from "../../components/modals/Modal";
import { grey } from "@mui/material/colors";

interface RemoveProductModalProps {
  onClose: () => void;
  product: ProductsQuery["products"][0];
}

export const RemoveProductModal: React.FC<RemoveProductModalProps> = ({
  onClose,
  product,
}) => {
  const { mutateAsync: deleteProduct } =
    useDeleteProductMutation(graphqlClient);

  const onDeleteButtonClick = async () => {
    await deleteProduct({ productIdOrName: product.id });
    onClose();
  };

  const onCancelButtonClick = () => {
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <FormTitle>Remove Product</FormTitle>
      <Typography sx={{ marginBottom: "1rem", color: grey[700] }}>
        You cannot undo this action. Once you delete this product, you cannot
        retrieve it.
      </Typography>
      <AttributeText label="Name" value={product.name} />

      <Flex>
        <Box sx={{ marginTop: "3rem", marginLeft: "auto" }}>
          <Button
            variant="contained"
            sx={{ marginRight: "1rem" }}
            onClick={onCancelButtonClick}
          >
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={onDeleteButtonClick}
          >
            Delete
          </Button>
        </Box>
      </Flex>
    </Modal>
  );
};
