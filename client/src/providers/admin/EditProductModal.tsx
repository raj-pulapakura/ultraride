import React, { useState } from "react";
import { graphqlClient } from "../../graphql/client";
import {
  ProductsQuery,
  useUpdateProductMutation,
} from "../../graphql/generated";
import { FormControlDuoWrapper } from "../../components/forms/FormControlDuoWrapper";
import { FormSubmitButton } from "../../components/forms/FormSubmitButton";
import { FormTitle } from "../../components/forms/FormTitle";
import { ListFormControl } from "../../components/forms/ListFormControl";
import { Modal } from "../../components/modals/Modal";
import { SimpleFormControl } from "../../components/forms/SimpleFormControl";

interface EditProductModalProps {
  onClose: () => void;
  product: ProductsQuery["products"][0];
}

export const EditProductModal: React.FC<EditProductModalProps> = ({
  onClose,
  product,
}) => {
  const [editProductFormState, setEditProductFormState] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    imageUrl: product.imageUrl,
    category: product.category,
    tags: product.tags.map((tag) => tag.text),
  });

  const [editProductFormErrors, setEditProductFormErrors] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "",
    tags: "",
  });

  const { mutateAsync: updateAccount, isLoading: updateAccountIsLoading } =
    useUpdateProductMutation(graphqlClient);

  const onEditProductFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setEditProductFormErrors({
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      category: "",
      tags: "",
    });

    const data = await updateAccount({
      input: { ...editProductFormState, id: product.id },
    });

    if (data?.updateProduct?.error) {
      return setEditProductFormErrors({
        ...editProductFormErrors,
        [data.updateProduct.error.field]: data.updateProduct.error.ufm,
      });
    }

    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={onEditProductFormSubmit}>
        <FormTitle>Edit Product</FormTitle>
        <FormControlDuoWrapper>
          <SimpleFormControl
            value={editProductFormState.name}
            onChange={(e) =>
              setEditProductFormState({
                ...editProductFormState,
                name: e.target.value,
              })
            }
            label="Name"
            error={editProductFormErrors.name}
          />
          <SimpleFormControl
            value={editProductFormState.category}
            onChange={(e) =>
              setEditProductFormState({
                ...editProductFormState,
                category: e.target.value,
              })
            }
            label="Category"
            error={editProductFormErrors.category}
          />
        </FormControlDuoWrapper>

        <FormControlDuoWrapper>
          <SimpleFormControl
            value={editProductFormState.imageUrl}
            onChange={(e) =>
              setEditProductFormState({
                ...editProductFormState,
                imageUrl: e.target.value,
              })
            }
            label="Image URL"
            error={editProductFormErrors.imageUrl}
          />
          <SimpleFormControl
            value={editProductFormState.price}
            onChange={(e) =>
              setEditProductFormState({
                ...editProductFormState,
                price: parseInt(e.target.value),
              })
            }
            label="Price"
            type="number"
            error={editProductFormErrors.price}
          />
        </FormControlDuoWrapper>

        <SimpleFormControl
          value={editProductFormState.description}
          onChange={(e) =>
            setEditProductFormState({
              ...editProductFormState,
              description: e.target.value,
            })
          }
          label="Description"
          error={editProductFormErrors.description}
        />

        <ListFormControl
          list={editProductFormState.tags}
          onListChange={(value) => {
            if (!value) {
              return setEditProductFormErrors({
                ...editProductFormErrors,
                tags: "Please enter a tag",
              });
            }
            if (editProductFormState.tags.includes(value)) {
              return setEditProductFormErrors({
                ...editProductFormErrors,
                tags: "That tag has already been added",
              });
            }
            setEditProductFormState({
              ...editProductFormState,
              tags: [...editProductFormState.tags, value],
            });
          }}
          onItemDelete={(value) => {
            setEditProductFormState({
              ...editProductFormState,
              tags: editProductFormState.tags.filter((tag) => tag !== value),
            });
          }}
          error={editProductFormErrors.tags}
          label="Add a tag"
        />

        <FormSubmitButton>Update</FormSubmitButton>
      </form>
    </Modal>
  );
};
