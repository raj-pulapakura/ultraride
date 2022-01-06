import { GraphQLClient } from "graphql-request";

const devServerEndPoint = "http://localhost:4000/graphql";

export const graphqlClient = new GraphQLClient(devServerEndPoint, {
  credentials: "include",
});
