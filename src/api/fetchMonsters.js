import { apolloClient, gql } from './apollo';
import {
  DEFAULT_ORDER,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PER_PAGE,
} from './constants';
import {
  getOrderVariables,
  getPaginationVariables,
} from './utils';

const generalMonstersQuery = gql`
  query Monsters($limit: Int, $order: MonsterOrder, $skip: Int) {
    monsters(limit: $limit, order: $order, skip: $skip) {
      armor_class {
        value
      }
      challenge_rating
      hit_points
      hit_points_roll
      index
      name
      size
      subtype
      type
    }
  }
`;

export const transformMonster = monster => ({
  armorClass: monster.armor_class[0].value,
  challengeRating: monster.challenge_rating,
  hitPoints: monster.hit_points,
  hitPointsFormula: monster.hit_points_roll,
  id: monster.index,
  name: monster.name,
  size: monster.size,
  subtype: monster.subtype,
  type: monster.type,
});

export const fetchMonsters = async (options = {}) => {
  const {
    order = DEFAULT_ORDER,
    pageNumber = DEFAULT_PAGE_NUMBER,
    perPage = DEFAULT_PER_PAGE,
  } = options;
  const variables = getPaginationVariables({ pageNumber, perPage });
  const orderVariables = getOrderVariables(order);

  if (orderVariables) {
    variables.order = orderVariables;
  }

  const { data } = await apolloClient.query({
    query: generalMonstersQuery,
    variables,
  });

  return data?.monsters ?? [];
};

// Have to do this for the time being as the GraphQL endpoint doesn't seem to return count as part of the response.
export const fetchTotalMonsterCount = async () => {
  const url = 'https://www.dnd5eapi.co/api/monsters';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`There was an issue fetching from the monsters endpoint. Response.status: ${response.status}`);
    }

    const json = await response.json();
    return json.count;
  } catch (error) {
    console.error(error.message);
  }
};
