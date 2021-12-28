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

export type AccountInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['String'];
};

export type AccountLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AccountResponse = {
  __typename?: 'AccountResponse';
  account?: Maybe<Account>;
  error?: Maybe<FieldError>;
};

export type DummyResponse = {
  __typename?: 'DummyResponse';
  message: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
  ufm: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  adminLogin: AccountResponse;
  createAccount?: Maybe<AccountResponse>;
  createProduct?: Maybe<ProductResponse>;
  createPurchase?: Maybe<PurchaseResponse>;
  deleteProduct: Scalars['Boolean'];
  login: AccountResponse;
  logout: Scalars['Boolean'];
};


export type MutationCreateAccountArgs = {
  input: AccountInput;
};


export type MutationCreateProductArgs = {
  input: ProductInput;
};


export type MutationCreatePurchaseArgs = {
  input: PurchaseInput;
};


export type MutationDeleteProductArgs = {
  productIdOrName: Scalars['String'];
};


export type MutationLoginArgs = {
  input: AccountLoginInput;
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

export type ProductInput = {
  category: Scalars['String'];
  description: Scalars['String'];
  imageUrl: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type ProductResponse = {
  __typename?: 'ProductResponse';
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

export type PurchaseInput = {
  accountId: Scalars['ID'];
  price: Scalars['Float'];
  productId: Scalars['ID'];
  quantity: Scalars['Int'];
  total: Scalars['Float'];
};

export type PurchaseResponse = {
  __typename?: 'PurchaseResponse';
  error?: Maybe<FieldError>;
  purchase?: Maybe<Purchase>;
};

export type Query = {
  __typename?: 'Query';
  account?: Maybe<Account>;
  accounts: Array<Account>;
  me?: Maybe<AccountResponse>;
  product?: Maybe<Product>;
  products: Array<Product>;
  purchase?: Maybe<Purchase>;
  purchases: Array<Purchase>;
  test: DummyResponse;
};


export type QueryAccountArgs = {
  accountIdOrEmail: Scalars['ID'];
};


export type QueryProductArgs = {
  productIdOrName: Scalars['ID'];
};


export type QueryPurchaseArgs = {
  purchaseId: Scalars['ID'];
};

export type CreateAccountMutationVariables = Exact<{
  input: AccountInput;
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount?: { __typename?: 'AccountResponse', account?: { __typename?: 'Account', id: string, firstName: string, lastName: string, email: string, password: string, role: string } | null | undefined, error?: { __typename?: 'FieldError', field: string, message: string, ufm: string } | null | undefined } | null | undefined };

export type CreatePurchaseMutationVariables = Exact<{
  input: PurchaseInput;
}>;


export type CreatePurchaseMutation = { __typename?: 'Mutation', createPurchase?: { __typename?: 'PurchaseResponse', purchase?: { __typename?: 'Purchase', accountId: string, productId: string, quantity: number, price: number, total: number } | null | undefined, error?: { __typename?: 'FieldError', field: string, message: string, ufm: string } | null | undefined } | null | undefined };

export type LoginMutationVariables = Exact<{
  input: AccountLoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AccountResponse', account?: { __typename?: 'Account', id: string, firstName: string, lastName: string, email: string } | null | undefined, error?: { __typename?: 'FieldError', field: string, message: string, ufm: string } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'AccountResponse', account?: { __typename?: 'Account', id: string, firstName: string, lastName: string, email: string } | null | undefined, error?: { __typename?: 'FieldError', field: string, message: string, ufm: string } | null | undefined } | null | undefined };

export type ProductQueryVariables = Exact<{
  productIdOrName: Scalars['ID'];
}>;


export type ProductQuery = { __typename?: 'Query', product?: { __typename?: 'Product', id: string, name: string, description: string, price: number, category: string, imageUrl: string } | null | undefined };

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, name: string, description: string, price: number, category: string, imageUrl: string }> };


export const CreateAccountDocument = `
    mutation CreateAccount($input: AccountInput!) {
  createAccount(input: $input) {
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
export const useCreateAccountMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateAccountMutation, TError, CreateAccountMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateAccountMutation, TError, CreateAccountMutationVariables, TContext>(
      'CreateAccount',
      (variables?: CreateAccountMutationVariables) => fetcher<CreateAccountMutation, CreateAccountMutationVariables>(client, CreateAccountDocument, variables, headers)(),
      options
    );
export const CreatePurchaseDocument = `
    mutation CreatePurchase($input: PurchaseInput!) {
  createPurchase(input: $input) {
    purchase {
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
export const useCreatePurchaseMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreatePurchaseMutation, TError, CreatePurchaseMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreatePurchaseMutation, TError, CreatePurchaseMutationVariables, TContext>(
      'CreatePurchase',
      (variables?: CreatePurchaseMutationVariables) => fetcher<CreatePurchaseMutation, CreatePurchaseMutationVariables>(client, CreatePurchaseDocument, variables, headers)(),
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
export const MeDocument = `
    query Me {
  me {
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
export const useMeQuery = <
      TData = MeQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: MeQueryVariables,
      options?: UseQueryOptions<MeQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<MeQuery, TError, TData>(
      variables === undefined ? ['Me'] : ['Me', variables],
      fetcher<MeQuery, MeQueryVariables>(client, MeDocument, variables, headers),
      options
    );
export const ProductDocument = `
    query Product($productIdOrName: ID!) {
  product(productIdOrName: $productIdOrName) {
    id
    name
    description
    price
    category
    imageUrl
  }
}
    `;
export const useProductQuery = <
      TData = ProductQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: ProductQueryVariables,
      options?: UseQueryOptions<ProductQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ProductQuery, TError, TData>(
      ['Product', variables],
      fetcher<ProductQuery, ProductQueryVariables>(client, ProductDocument, variables, headers),
      options
    );
export const ProductsDocument = `
    query Products {
  products {
    id
    name
    description
    price
    category
    imageUrl
  }
}
    `;
export const useProductsQuery = <
      TData = ProductsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: ProductsQueryVariables,
      options?: UseQueryOptions<ProductsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ProductsQuery, TError, TData>(
      variables === undefined ? ['Products'] : ['Products', variables],
      fetcher<ProductsQuery, ProductsQueryVariables>(client, ProductsDocument, variables, headers),
      options
    );