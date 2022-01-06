import { GraphQLClient } from "graphql-request";
import { RequestInit } from "graphql-request/dist/types.dom";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "react-query";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};

function fetcher<TData, TVariables>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables,
  headers?: RequestInit["headers"]
) {
  return async (): Promise<TData> =>
    client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AccountAdminLoginInput = {
  adminId: Scalars["ID"];
  adminPassword: Scalars["String"];
};

export type AccountGeneralResponse = {
  __typename?: "AccountGeneralResponse";
  account?: Maybe<AccountGraphql>;
  error?: Maybe<FieldError>;
};

export type AccountGraphql = {
  __typename?: "AccountGraphql";
  createdAt: Scalars["String"];
  email: Scalars["String"];
  firstName: Scalars["String"];
  id: Scalars["ID"];
  lastName: Scalars["String"];
  role: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type AccountLoginInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type AccountRegisterInput = {
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  password: Scalars["String"];
  role: Scalars["String"];
};

export type CreateProductInput = {
  category: Scalars["String"];
  description: Scalars["String"];
  imageUrl: Scalars["String"];
  name: Scalars["String"];
  price: Scalars["Float"];
  tags: Array<Scalars["String"]>;
};

export type CreatePurchaseInput = {
  accountId: Scalars["ID"];
  price: Scalars["Float"];
  productId: Scalars["ID"];
  quantity: Scalars["Int"];
  total: Scalars["Float"];
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
  ufm: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  adminLogin: Scalars["Boolean"];
  createProduct?: Maybe<ProductGeneralResponse>;
  createPurchase?: Maybe<PurchaseGeneralResponse>;
  deleteProduct: Scalars["Boolean"];
  login: AccountGeneralResponse;
  logout: Scalars["Boolean"];
  purchaseProducts: PurchasesGeneralResponse;
  register?: Maybe<AccountGeneralResponse>;
  updateProduct: ProductGeneralResponse;
};

export type MutationAdminLoginArgs = {
  input: AccountAdminLoginInput;
};

export type MutationCreateProductArgs = {
  input: CreateProductInput;
};

export type MutationCreatePurchaseArgs = {
  input: CreatePurchaseInput;
};

export type MutationDeleteProductArgs = {
  productIdOrName: Scalars["String"];
};

export type MutationLoginArgs = {
  input: AccountLoginInput;
};

export type MutationPurchaseProductsArgs = {
  input: PurchaseProductsInput;
};

export type MutationRegisterArgs = {
  input: AccountRegisterInput;
};

export type MutationUpdateProductArgs = {
  input: UpdateProductInput;
};

export type ProductGeneralResponse = {
  __typename?: "ProductGeneralResponse";
  error?: Maybe<FieldError>;
  product?: Maybe<ProductGraphql>;
};

export type ProductGraphql = {
  __typename?: "ProductGraphql";
  category: Scalars["String"];
  createdAt: Scalars["String"];
  description: Scalars["String"];
  id: Scalars["ID"];
  imageUrl: Scalars["String"];
  name: Scalars["String"];
  price: Scalars["Float"];
  tags: Array<TagGraphql>;
  updatedAt: Scalars["String"];
};

export type PurchaseGeneralResponse = {
  __typename?: "PurchaseGeneralResponse";
  error?: Maybe<FieldError>;
  purchase?: Maybe<PurchaseGraphql>;
};

export type PurchaseGraphql = {
  __typename?: "PurchaseGraphql";
  accountId: Scalars["ID"];
  createdAt: Scalars["String"];
  id: Scalars["ID"];
  price: Scalars["Int"];
  productId: Scalars["ID"];
  quantity: Scalars["Int"];
  total: Scalars["Int"];
  updatedAt: Scalars["String"];
};

export type PurchaseListingInput = {
  productId: Scalars["ID"];
  quantity: Scalars["Int"];
};

export type PurchaseProductsInput = {
  accountId: Scalars["ID"];
  purchaseListings: Array<PurchaseListingInput>;
};

export type PurchasesGeneralResponse = {
  __typename?: "PurchasesGeneralResponse";
  error?: Maybe<FieldError>;
  purchases?: Maybe<Array<PurchaseGraphql>>;
};

export type Query = {
  __typename?: "Query";
  account?: Maybe<AccountGraphql>;
  accounts: Array<AccountGraphql>;
  adminMe: Scalars["Boolean"];
  me?: Maybe<AccountGeneralResponse>;
  product?: Maybe<ProductGraphql>;
  products: Array<ProductGraphql>;
  purchase?: Maybe<PurchaseGraphql>;
  purchases: Array<PurchaseGraphql>;
};

export type QueryAccountArgs = {
  accountIdOrEmail: Scalars["ID"];
};

export type QueryProductArgs = {
  productIdOrName: Scalars["ID"];
};

export type QueryPurchaseArgs = {
  purchaseId: Scalars["ID"];
};

export type TagGraphql = {
  __typename?: "TagGraphql";
  createdAt: Scalars["String"];
  id: Scalars["ID"];
  productId: Scalars["ID"];
  text: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type UpdateProductInput = {
  category?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  id: Scalars["ID"];
  imageUrl?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  price?: InputMaybe<Scalars["Float"]>;
  tags?: InputMaybe<Array<Scalars["String"]>>;
};

export type FieldErrorFragmentFragment = {
  __typename?: "FieldError";
  field: string;
  message: string;
  ufm: string;
};

export type ProductFragmentFragment = {
  __typename?: "ProductGraphql";
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  tags: Array<{
    __typename?: "TagGraphql";
    id: string;
    productId: string;
    text: string;
  }>;
};

export type AdminLoginMutationVariables = Exact<{
  input: AccountAdminLoginInput;
}>;

export type AdminLoginMutation = {
  __typename?: "Mutation";
  adminLogin: boolean;
};

export type CreateProductMutationVariables = Exact<{
  input: CreateProductInput;
}>;

export type CreateProductMutation = {
  __typename?: "Mutation";
  createProduct?:
    | {
        __typename?: "ProductGeneralResponse";
        product?:
          | {
              __typename?: "ProductGraphql";
              id: string;
              name: string;
              description: string;
              price: number;
              category: string;
              imageUrl: string;
              tags: Array<{
                __typename?: "TagGraphql";
                id: string;
                productId: string;
                text: string;
              }>;
            }
          | null
          | undefined;
        error?:
          | {
              __typename?: "FieldError";
              field: string;
              message: string;
              ufm: string;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type DeleteProductMutationVariables = Exact<{
  productIdOrName: Scalars["String"];
}>;

export type DeleteProductMutation = {
  __typename?: "Mutation";
  deleteProduct: boolean;
};

export type LoginMutationVariables = Exact<{
  input: AccountLoginInput;
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "AccountGeneralResponse";
    account?:
      | {
          __typename?: "AccountGraphql";
          id: string;
          firstName: string;
          lastName: string;
          email: string;
        }
      | null
      | undefined;
    error?:
      | {
          __typename?: "FieldError";
          field: string;
          message: string;
          ufm: string;
        }
      | null
      | undefined;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean };

export type PurchaseProductsMutationVariables = Exact<{
  input: PurchaseProductsInput;
}>;

export type PurchaseProductsMutation = {
  __typename?: "Mutation";
  purchaseProducts: {
    __typename?: "PurchasesGeneralResponse";
    purchases?:
      | Array<{
          __typename?: "PurchaseGraphql";
          id: string;
          createdAt: string;
          updatedAt: string;
          accountId: string;
          productId: string;
          quantity: number;
          price: number;
          total: number;
        }>
      | null
      | undefined;
    error?:
      | {
          __typename?: "FieldError";
          field: string;
          message: string;
          ufm: string;
        }
      | null
      | undefined;
  };
};

export type RegisterMutationVariables = Exact<{
  input: AccountRegisterInput;
}>;

export type RegisterMutation = {
  __typename?: "Mutation";
  register?:
    | {
        __typename?: "AccountGeneralResponse";
        account?:
          | {
              __typename?: "AccountGraphql";
              id: string;
              firstName: string;
              lastName: string;
              email: string;
              role: string;
            }
          | null
          | undefined;
        error?:
          | {
              __typename?: "FieldError";
              field: string;
              message: string;
              ufm: string;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type UpdateProductMutationVariables = Exact<{
  input: UpdateProductInput;
}>;

export type UpdateProductMutation = {
  __typename?: "Mutation";
  updateProduct: {
    __typename?: "ProductGeneralResponse";
    error?:
      | {
          __typename?: "FieldError";
          field: string;
          message: string;
          ufm: string;
        }
      | null
      | undefined;
    product?:
      | {
          __typename?: "ProductGraphql";
          createdAt: string;
          id: string;
          updatedAt: string;
          name: string;
          description: string;
          category: string;
          price: number;
          imageUrl: string;
          tags: Array<{
            __typename?: "TagGraphql";
            id: string;
            createdAt: string;
            updatedAt: string;
            productId: string;
            text: string;
          }>;
        }
      | null
      | undefined;
  };
};

export type AccountsQueryVariables = Exact<{ [key: string]: never }>;

export type AccountsQuery = {
  __typename?: "Query";
  accounts: Array<{
    __typename?: "AccountGraphql";
    id: string;
    createdAt: string;
    updatedAt: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  }>;
};

export type AdminMeQueryVariables = Exact<{ [key: string]: never }>;

export type AdminMeQuery = { __typename?: "Query"; adminMe: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?:
    | {
        __typename?: "AccountGeneralResponse";
        account?:
          | {
              __typename?: "AccountGraphql";
              id: string;
              firstName: string;
              lastName: string;
              email: string;
              createdAt: string;
            }
          | null
          | undefined;
        error?:
          | {
              __typename?: "FieldError";
              field: string;
              message: string;
              ufm: string;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type ProductQueryVariables = Exact<{
  productIdOrName: Scalars["ID"];
}>;

export type ProductQuery = {
  __typename?: "Query";
  product?:
    | {
        __typename?: "ProductGraphql";
        id: string;
        name: string;
        description: string;
        price: number;
        category: string;
        imageUrl: string;
        tags: Array<{
          __typename?: "TagGraphql";
          id: string;
          productId: string;
          text: string;
        }>;
      }
    | null
    | undefined;
};

export type ProductsQueryVariables = Exact<{ [key: string]: never }>;

export type ProductsQuery = {
  __typename?: "Query";
  products: Array<{
    __typename?: "ProductGraphql";
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    tags: Array<{
      __typename?: "TagGraphql";
      id: string;
      productId: string;
      text: string;
    }>;
  }>;
};

export const FieldErrorFragmentFragmentDoc = `
    fragment FieldErrorFragment on FieldError {
  field
  message
  ufm
}
    `;
export const ProductFragmentFragmentDoc = `
    fragment ProductFragment on ProductGraphql {
  id
  name
  description
  price
  category
  imageUrl
  tags {
    id
    productId
    text
  }
}
    `;
export const AdminLoginDocument = `
    mutation AdminLogin($input: AccountAdminLoginInput!) {
  adminLogin(input: $input)
}
    `;
export const useAdminLoginMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    AdminLoginMutation,
    TError,
    AdminLoginMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"]
) =>
  useMutation<
    AdminLoginMutation,
    TError,
    AdminLoginMutationVariables,
    TContext
  >(
    "AdminLogin",
    (variables?: AdminLoginMutationVariables) =>
      fetcher<AdminLoginMutation, AdminLoginMutationVariables>(
        client,
        AdminLoginDocument,
        variables,
        headers
      )(),
    options
  );
export const CreateProductDocument = `
    mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    product {
      ...ProductFragment
    }
    error {
      ...FieldErrorFragment
    }
  }
}
    ${ProductFragmentFragmentDoc}
${FieldErrorFragmentFragmentDoc}`;
export const useCreateProductMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    CreateProductMutation,
    TError,
    CreateProductMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"]
) =>
  useMutation<
    CreateProductMutation,
    TError,
    CreateProductMutationVariables,
    TContext
  >(
    "CreateProduct",
    (variables?: CreateProductMutationVariables) =>
      fetcher<CreateProductMutation, CreateProductMutationVariables>(
        client,
        CreateProductDocument,
        variables,
        headers
      )(),
    options
  );
export const DeleteProductDocument = `
    mutation DeleteProduct($productIdOrName: String!) {
  deleteProduct(productIdOrName: $productIdOrName)
}
    `;
export const useDeleteProductMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    DeleteProductMutation,
    TError,
    DeleteProductMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"]
) =>
  useMutation<
    DeleteProductMutation,
    TError,
    DeleteProductMutationVariables,
    TContext
  >(
    "DeleteProduct",
    (variables?: DeleteProductMutationVariables) =>
      fetcher<DeleteProductMutation, DeleteProductMutationVariables>(
        client,
        DeleteProductDocument,
        variables,
        headers
      )(),
    options
  );
export const LoginDocument = `
    mutation Login($input: AccountLoginInput!) {
  login(input: $input) {
    account {
      id
      firstName
      lastName
      email
    }
    error {
      ...FieldErrorFragment
    }
  }
}
    ${FieldErrorFragmentFragmentDoc}`;
export const useLoginMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    LoginMutation,
    TError,
    LoginMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"]
) =>
  useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
    "Login",
    (variables?: LoginMutationVariables) =>
      fetcher<LoginMutation, LoginMutationVariables>(
        client,
        LoginDocument,
        variables,
        headers
      )(),
    options
  );
export const LogoutDocument = `
    mutation Logout {
  logout
}
    `;
export const useLogoutMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    LogoutMutation,
    TError,
    LogoutMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"]
) =>
  useMutation<LogoutMutation, TError, LogoutMutationVariables, TContext>(
    "Logout",
    (variables?: LogoutMutationVariables) =>
      fetcher<LogoutMutation, LogoutMutationVariables>(
        client,
        LogoutDocument,
        variables,
        headers
      )(),
    options
  );
export const PurchaseProductsDocument = `
    mutation PurchaseProducts($input: PurchaseProductsInput!) {
  purchaseProducts(input: $input) {
    purchases {
      id
      createdAt
      updatedAt
      accountId
      productId
      quantity
      price
      total
    }
    error {
      field
      message
      ufm
    }
  }
}
    `;
export const usePurchaseProductsMutation = <
  TError = unknown,
  TContext = unknown
>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    PurchaseProductsMutation,
    TError,
    PurchaseProductsMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"]
) =>
  useMutation<
    PurchaseProductsMutation,
    TError,
    PurchaseProductsMutationVariables,
    TContext
  >(
    "PurchaseProducts",
    (variables?: PurchaseProductsMutationVariables) =>
      fetcher<PurchaseProductsMutation, PurchaseProductsMutationVariables>(
        client,
        PurchaseProductsDocument,
        variables,
        headers
      )(),
    options
  );
export const RegisterDocument = `
    mutation Register($input: AccountRegisterInput!) {
  register(input: $input) {
    account {
      id
      firstName
      lastName
      email
      role
    }
    error {
      ...FieldErrorFragment
    }
  }
}
    ${FieldErrorFragmentFragmentDoc}`;
export const useRegisterMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    RegisterMutation,
    TError,
    RegisterMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"]
) =>
  useMutation<RegisterMutation, TError, RegisterMutationVariables, TContext>(
    "Register",
    (variables?: RegisterMutationVariables) =>
      fetcher<RegisterMutation, RegisterMutationVariables>(
        client,
        RegisterDocument,
        variables,
        headers
      )(),
    options
  );
export const UpdateProductDocument = `
    mutation UpdateProduct($input: UpdateProductInput!) {
  updateProduct(input: $input) {
    error {
      field
      message
      ufm
    }
    product {
      createdAt
      id
      updatedAt
      name
      description
      category
      price
      imageUrl
      tags {
        id
        createdAt
        updatedAt
        productId
        text
      }
    }
  }
}
    `;
export const useUpdateProductMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    UpdateProductMutation,
    TError,
    UpdateProductMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"]
) =>
  useMutation<
    UpdateProductMutation,
    TError,
    UpdateProductMutationVariables,
    TContext
  >(
    "UpdateProduct",
    (variables?: UpdateProductMutationVariables) =>
      fetcher<UpdateProductMutation, UpdateProductMutationVariables>(
        client,
        UpdateProductDocument,
        variables,
        headers
      )(),
    options
  );
export const AccountsDocument = `
    query Accounts {
  accounts {
    id
    createdAt
    updatedAt
    firstName
    lastName
    email
    role
  }
}
    `;
export const useAccountsQuery = <TData = AccountsQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: AccountsQueryVariables,
  options?: UseQueryOptions<AccountsQuery, TError, TData>,
  headers?: RequestInit["headers"]
) =>
  useQuery<AccountsQuery, TError, TData>(
    variables === undefined ? ["Accounts"] : ["Accounts", variables],
    fetcher<AccountsQuery, AccountsQueryVariables>(
      client,
      AccountsDocument,
      variables,
      headers
    ),
    options
  );
export const AdminMeDocument = `
    query AdminMe {
  adminMe
}
    `;
export const useAdminMeQuery = <TData = AdminMeQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: AdminMeQueryVariables,
  options?: UseQueryOptions<AdminMeQuery, TError, TData>,
  headers?: RequestInit["headers"]
) =>
  useQuery<AdminMeQuery, TError, TData>(
    variables === undefined ? ["AdminMe"] : ["AdminMe", variables],
    fetcher<AdminMeQuery, AdminMeQueryVariables>(
      client,
      AdminMeDocument,
      variables,
      headers
    ),
    options
  );
export const MeDocument = `
    query Me {
  me {
    account {
      id
      firstName
      lastName
      email
      createdAt
    }
    error {
      ...FieldErrorFragment
    }
  }
}
    ${FieldErrorFragmentFragmentDoc}`;
export const useMeQuery = <TData = MeQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: MeQueryVariables,
  options?: UseQueryOptions<MeQuery, TError, TData>,
  headers?: RequestInit["headers"]
) =>
  useQuery<MeQuery, TError, TData>(
    variables === undefined ? ["Me"] : ["Me", variables],
    fetcher<MeQuery, MeQueryVariables>(client, MeDocument, variables, headers),
    options
  );
export const ProductDocument = `
    query Product($productIdOrName: ID!) {
  product(productIdOrName: $productIdOrName) {
    ...ProductFragment
  }
}
    ${ProductFragmentFragmentDoc}`;
export const useProductQuery = <TData = ProductQuery, TError = unknown>(
  client: GraphQLClient,
  variables: ProductQueryVariables,
  options?: UseQueryOptions<ProductQuery, TError, TData>,
  headers?: RequestInit["headers"]
) =>
  useQuery<ProductQuery, TError, TData>(
    ["Product", variables],
    fetcher<ProductQuery, ProductQueryVariables>(
      client,
      ProductDocument,
      variables,
      headers
    ),
    options
  );
export const ProductsDocument = `
    query Products {
  products {
    ...ProductFragment
  }
}
    ${ProductFragmentFragmentDoc}`;
export const useProductsQuery = <TData = ProductsQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: ProductsQueryVariables,
  options?: UseQueryOptions<ProductsQuery, TError, TData>,
  headers?: RequestInit["headers"]
) =>
  useQuery<ProductsQuery, TError, TData>(
    variables === undefined ? ["Products"] : ["Products", variables],
    fetcher<ProductsQuery, ProductsQueryVariables>(
      client,
      ProductsDocument,
      variables,
      headers
    ),
    options
  );
