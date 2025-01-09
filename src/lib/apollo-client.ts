import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_HASURA_ENDPOINT,
});

const authLink = setContext((operation, { headers }) => {
  const publicOperation = ["GetPublicPreview"];
  const isPublicOperation =
    operation.operationName &&
    publicOperation.includes(operation.operationName);
  if (isPublicOperation) return { headers };

  const token = localStorage.getItem("access_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
