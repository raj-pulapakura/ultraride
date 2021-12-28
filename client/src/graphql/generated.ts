import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Account = {
  __typename?: 'Account';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type AccountGeneralResponse = {
  __typename?: 'AccountGeneralResponse';
  account?: Maybe<Account>;
  error?: Maybe<FieldError>;
};

export type AccountLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AccountRegisterInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['String'];
};

export type CreateProductInput = {
  category: Scalars['String'];
  description: Scalars['String'];
  imageUrl: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type CreatePurchaseInput = {
  accountId: Scalars['ID'];
  price: Scalars['Float'];
  productId: Scalars['ID'];
  quantity: Scalars['Int'];
  total: Scalars['Float'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
  ufm: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  adminLogin: AccountGeneralResponse;
  createProduct?: Maybe<ProductGeneralResponse>;
  createPurchase?: Maybe<PurchaseGeneralResponse>;
  deleteProduct: Scalars['Boolean'];
  login: AccountGeneralResponse;
  logout: Scalars['Boolean'];
  purchaseProducts: Scalars['Boolean'];
  register?: Maybe<AccountGeneralResponse>;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationCreatePurchaseArgs = {
  input: CreatePurchaseInput;
};


export type MutationDeleteProductArgs = {
  productIdOrName: Scalars['String'];
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

export type Product = {
  __typename?: 'Product';
  category: Scalars['String'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  imageUrl: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  updatedAt: Scalars['String'];
};

export type ProductGeneralResponse = {
  __typename?: 'ProductGeneralResponse';
  error?: Maybe<FieldError>;
  product?: Maybe<Product>;
};

export type Purchase = {
  __typename?: 'Purchase';
  accountId: Scalars['ID'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  price: Scalars['Int'];
  productId: Scalars['ID'];
  quantity: Scalars['Int'];
  total: Scalars['Int'];
  updatedAt: Scalars['String'];
};

export type PurchaseGeneralResponse = {
  __typename?: 'PurchaseGeneralResponse';
  error?: Maybe<FieldError>;
  purchase?: Maybe<Purchase>;
};

export type PurchaseListingInput = {
  productId: Scalars['ID'];
  quantity: Scalars['Int'];
};

export type PurchaseProductsInput = {
  accountId: Scalars['ID'];
  purchaseListings: Array<PurchaseListingInput>;
};

export type Query = {
  __typename?: 'Query';
  getAccount?: Maybe<Account>;
  getAccounts: Array<Account>;
  getMe?: Maybe<AccountGeneralResponse>;
  getProduct?: Maybe<Product>;
  getProducts: Array<Product>;
  getPurchase?: Maybe<Purchase>;
  getPurchases: Array<Purchase>;
};


export type QueryGetAccountArgs = {
  accountIdOrEmail: Scalars['ID'];
};


export type QueryGetProductArgs = {
  productIdOrName: Scalars['ID'];
};


export type QueryGetPurchaseArgs = {
  purchaseId: Scalars['ID'];
};

export type LoginMutationVariables = Exact<{
  input: AccountLoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AccountGeneralResponse', account?: { __typename?: 'Account', id: string, firstName: string, lastName: string, email: string } | null | undefined, error?: { __typename?: 'FieldError', field: string, message: string, ufm: string } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type PurchaseProductsMutationVariables = Exact<{
  input: PurchaseProductsInput;
}>;


export type PurchaseProductsMutation = { __typename?: 'Mutation', purchaseProducts: boolean };

export type RegisterMutationVariables = Exact<{
  input: AccountRegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'AccountGeneralResponse', account?: { __typename?: 'Account', id: string, firstName: string, lastName: string, email: string, password: string, role: string } | null | undefined, error?: { __typename?: 'FieldError', field: string, message: string, ufm: string } | null | undefined } | null | undefined };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', getMe?: { __typename?: 'AccountGeneralResponse', account?: { __typename?: 'Account', id: string, firstName: string, lastName: string, email: string } | null | undefined, error?: { __typename?: 'FieldError', field: string, message: string, ufm: string } | null | undefined } | null | undefined };

export type GetProductQueryVariables = Exact<{
  productIdOrName: Scalars['ID'];
}>;


export type GetProductQuery = { __typename?: 'Query', getProduct?: { __typename?: 'Product', id: string, name: string, description: string, price: number, category: string, imageUrl: string } | null | undefined };

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'Query', getProducts: Array<{ __typename?: 'Product', id: string, name: string, description: string, price: number, category: string, imageUrl: string }> };


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
      field
      message
      ufm
    }
  }
}
    `;
export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      'Login',
      (variables?: LoginMutationVariables) => fetcher<LoginMutation, LoginMutationVariables>(client, LoginDocument, variables, headers)(),
      options
    );
export const LogoutDocument = `
    mutation Logout {
  logout
}
    `;
export const useLogoutMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LogoutMutation, TError, LogoutMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LogoutMutation, TError, LogoutMutationVariables, TContext>(
      'Logout',
      (variables?: LogoutMutationVariables) => fetcher<LogoutMutation, LogoutMutationVariables>(client, LogoutDocument, variables, headers)(),
      options
    );
export const PurchaseProductsDocument = `
    mutation PurchaseProducts($input: PurchaseProductsInput!) {
  purchaseProducts(input: $input)
}
    `;
export const usePurchaseProductsMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<PurchaseProductsMutation, TError, PurchaseProductsMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<PurchaseProductsMutation, TError, PurchaseProductsMutationVariables, TContext>(
      'PurchaseProducts',
      (variables?: PurchaseProductsMutationVariables) => fetcher<PurchaseProductsMutation, PurchaseProductsMutationVariables>(client, PurchaseProductsDocument, variables, headers)(),
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
      password
      role
    }
    error {
      field
      message
      ufm
    }
  }
}
    `;
export const useRegisterMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<RegisterMutation, TError, RegisterMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<RegisterMutation, TError, RegisterMutationVariables, TContext>(
      'Register',
      (variables?: RegisterMutationVariables) => fetcher<RegisterMutation, RegisterMutationVariables>(client, RegisterDocument, variables, headers)(),
      options
    );
export const GetMeDocument = `
    query GetMe {
  getMe {
    account {
      id
      firstName
      lastName
      email
    }
    error {
      field
      message
      ufm
    }
  }
}
    `;
export const useGetMeQuery = <
      TData = GetMeQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetMeQueryVariables,
      options?: UseQueryOptions<GetMeQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetMeQuery, TError, TData>(
      variables === undefined ? ['GetMe'] : ['GetMe', variables],
      fetcher<GetMeQuery, GetMeQueryVariables>(client, GetMeDocument, variables, headers),
      options
    );
export const GetProductDocument = `
    query GetProduct($productIdOrName: ID!) {
  getProduct(productIdOrName: $productIdOrName) {
    id
    name
    description
    price
    category
    imageUrl
  }
}
    `;
export const useGetProductQuery = <
      TData = GetProductQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetProductQueryVariables,
      options?: UseQueryOptions<GetProductQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetProductQuery, TError, TData>(
      ['GetProduct', variables],
      fetcher<GetProductQuery, GetProductQueryVariables>(client, GetProductDocument, variables, headers),
      options
    );
export const GetProductsDocument = `
    query GetProducts {
  getProducts {
    id
    name
    description
    price
    category
    imageUrl
  }
}
    `;
export const useGetProductsQuery = <
      TData = GetProductsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetProductsQueryVariables,
      options?: UseQueryOptions<GetProductsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetProductsQuery, TError, TData>(
      variables === undefined ? ['GetProducts'] : ['GetProducts', variables],
      fetcher<GetProductsQuery, GetProductsQueryVariables>(client, GetProductsDocument, variables, headers),
      options
    );