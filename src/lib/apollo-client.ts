import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_HASURA_ENDPOINT,
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});
