import { apolloClient, gql } from './apollo';

const generateQuery = gql`
  query Spells {
    spells {
      index
      level
      name
    }
  }
`;

export const fetchSpells = async () => {
  const { data } = await apolloClient.query({ query: generateQuery });
  return data?.spells ?? [];
};
