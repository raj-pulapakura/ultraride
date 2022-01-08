import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { graphqlClient } from "../../../graphql/client";
import { useCreateProductMutation } from "../../../graphql/generated";
import { FormContainer } from "../../../components/forms/FormContainer";
import { FormTitle } from "../../../components/forms/FormTitle";
import { SimpleFormControl } from "../../../components/forms/SimpleFormControl";
import { FormSubmitButton } from "../../../components/forms/FormSubmitButton";
import { ListFormControl } from "../../../components/forms/ListFormControl";
import { FormControlDuoWrapper } from "../../../components/forms/FormControlDuoWrapper";
import { BackToLink } from "../../../components/misc/BackToLink";

interface CreateProductPageProps {}

export const CreateProductPage: React.FC<CreateProductPageProps> = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const [createProductFormState, setCreateProductFormState] = useState({
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    category: "",
    tags: ["sports"],
    brand: "",
  });
  const [createProductFormErrors, setCreateProductFormErrors] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "",
    tags: "",
    brand: "",
  });

  const { mutateAsync: createAccount, isLoading: createAccountIsLoading } =
    useCreateProductMutation(graphqlClient);

  const onCreateProductFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setCreateProductFormErrors({
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      category: "",
      tags: "",
      brand: "",
    });

    const data = await createAccount({
      input: { ...createProductFormState },
    });

    console.log({ data });

    if (data?.createProduct?.error) {
      return setCreateProductFormErrors({
        ...createProductFormErrors,
        [data.createProduct.error.field]: data.createProduct.error.ufm,
      });
    }

    const next = query.get("next");
    if (next) {
      return navigate("/" + next);
    }

    navigate("/admin");
  };

  return (
    <FormContainer>
      <BackToLink to="/admin" label="Admin Dashboard" />
      <form onSubmit={onCreateProductFormSubmit}>
        <FormTitle>List a new Product</FormTitle>
        <FormControlDuoWrapper>
          <SimpleFormControl
            value={createProductFormState.name}
            onChange={(e) =>
              setCreateProductFormState({
                ...createProductFormState,
                name: e.target.value,
              })
            }
            label="Name"
            error={createProductFormErrors.name}
          />
          <SimpleFormControl
            value={createProductFormState.category}
            onChange={(e) =>
              setCreateProductFormState({
                ...createProductFormState,
                category: e.target.value,
              })
            }
            label="Category"
            error={createProductFormErrors.category}
          />
        </FormControlDuoWrapper>

        <FormControlDuoWrapper>
          <SimpleFormControl
            value={createProductFormState.brand}
            onChange={(e) =>
              setCreateProductFormState({
                ...createProductFormState,
                brand: e.target.value,
              })
            }
            label="Brand"
            error={createProductFormErrors.brand}
          />
          <SimpleFormControl
            value={createProductFormState.price}
            onChange={(e) =>
              setCreateProductFormState({
                ...createProductFormState,
                price: parseInt(e.target.value),
              })
            }
            label="Price"
            type="number"
            error={createProductFormErrors.price}
          />
        </FormControlDuoWrapper>

        <SimpleFormControl
          value={createProductFormState.imageUrl}
          onChange={(e) =>
            setCreateProductFormState({
              ...createProductFormState,
              imageUrl: e.target.value,
            })
          }
          label="Image URL"
          error={createProductFormErrors.imageUrl}
        />

        <SimpleFormControl
          value={createProductFormState.description}
          onChange={(e) =>
            setCreateProductFormState({
              ...createProductFormState,
              description: e.target.value,
            })
          }
          label="Description"
          error={createProductFormErrors.description}
        />

        <ListFormControl
          list={createProductFormState.tags}
          onListChange={(value) => {
            if (!value) {
              return setCreateProductFormErrors({
                ...createProductFormErrors,
                tags: "Please enter a tag",
              });
            }
            if (createProductFormState.tags.includes(value)) {
              return setCreateProductFormErrors({
                ...createProductFormErrors,
                tags: "That tag has already been added",
              });
            }
            setCreateProductFormState({
              ...createProductFormState,
              tags: [...createProductFormState.tags, value],
            });
          }}
          onItemDelete={(value) => {
            setCreateProductFormState({
              ...createProductFormState,
              tags: createProductFormState.tags.filter((tag) => tag !== value),
            });
          }}
          error={createProductFormErrors.tags}
          label="Add a tag"
        />

        <FormSubmitButton>Create</FormSubmitButton>
      </form>
    </FormContainer>
  );
};
