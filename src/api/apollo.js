import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  from,
  gql,
} from "@apollo/client";
import { onError } from '@apollo/client/link/error';

export { gql };

export const getQueryNames = (bodies) => {
  const queryNames = bodies.map((body) => {
    let queryName = body.operationName;
    if (!queryName || queryName === '') {
      console.error({
        message: 'GraphQL query does not have a name',
        payload: { query: body.query },
      });
      queryName = 'unknownQueryName';
    }
    return queryName;
  });

  return queryNames.join(',');
};

const link = new HttpLink({
  fetch,
  uri: 'https://www.dnd5eapi.co/graphql',
})

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    onError(({
      graphQLErrors,
      networkError,
      operation,
      response,
    }) => {
      const queryString = operation?.operationName ?? 'unknown query name';

      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
          console.error({
            message: `Error while loading query "${queryString}": ${message}`,
            payload: {
              locations: JSON.stringify(locations),
              operation: JSON.stringify(operation),
              path,
              response: JSON.stringify(response),
            },
          });
        });
        response.errors = null;
      }

      if (networkError) {
        console.error({
          message: `Network error while loading query "${queryString}"`,
          payload: {
            networkError: JSON.stringify(networkError),
            operation: JSON.stringify(operation),
          },
        });
      }
    }),
    link,
  ]),
});
