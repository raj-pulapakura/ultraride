import { GraphQLClient } from "graphql-request";
import { MAIN_API } from "../constants";

const devServerEndPoint = `${MAIN_API}/graphql`;

export const graphqlClient = new GraphQLClient(devServerEndPoint, {
  credentials: "include",
});
