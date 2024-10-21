import { apolloClient, gql } from "./apollo";

const generateQuery = gql`
  query Spells($limit: Int, $order: SpellOrder, $skip: Int) {
    spells(limit: $limit, order: $order, skip: $skip) {
      index
      level
      name
      school {
        name
      }
      components
      ritual
      casting_time
      duration
      concentration
      range
      area_of_effect {
        size
        type
      }
      dc {
        type {
          name
        }
      }
      attack_type
      damage {
        damage_type {
          name
        }
      }
    }
  }
`;

export const transformSpell = spell => ({
  areaOfEffect: spell.area_of_effect != null
    ? {
      size: spell.area_of_effect.size,
      type: spell.area_of_effect.type,
    }
    : null,
  attackType: spell.attack_type,
  castingTime: spell.casting_time,
  components: spell.components.join(', '),
  damageType: spell?.damage?.damage_type?.name ?? null,
  duration: spell.duration,
  id: spell.index,
  isRitual: spell.ritual,
  level: spell.level,
  name: spell.name,
  range: spell.range,
  requiresConcentration: spell.concentration,
  saveType: spell?.dc?.type?.name ?? null,
  school: spell.school.name,
});

export const getPaginationVariables = ({ pageNumber, perPage }) => {
  const limit = perPage < 1
    ? 20
    : perPage;
  const skip = pageNumber < 2
    ? 0
    : (pageNumber - 1) * limit;

  return {
    limit,
    skip,
  };
};

const sortFields = {
  level: 'LEVEL',
  name: 'NAME',
  school: 'SCHOOL',
};

const sortDirection = {
  asc: 'ASCENDING',
  desc: 'DESCENDING',
};

export const getOrderVariables = ([first, ...rest] = []) => {
  if (!first) {
    return;
  }

  const variables = {
    by: sortFields[first.by],
    direction: sortDirection[first.direction],
  };

  return rest.length === 0
    ? variables
    : {
      ...variables,
      thenBy: getOrderVariables(rest),
    };
};

export const fetchSpells = async (options = {}) => {
  const {
    order = [{ by: 'name', direction: 'asc' }],
    pageNumber = 1,
    perPage = 20,
  } = options;
  const variables = getPaginationVariables({ pageNumber, perPage });
  const orderVariables = getOrderVariables(order);

  if (orderVariables) {
    variables.order = orderVariables;
  }

  const { data } = await apolloClient.query({
    query: generateQuery,
    variables,
  });

  return data?.spells ?? [];
};

// Have to do this for the time being as the GraphQL endpoint doesn't seem to return count as part of the response.
export const fetchTotalSpellCount = async () => {
  const url = 'https://www.dnd5eapi.co/api/spells';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`There was an issue fetching from the spells endpoint. Response.status: ${response.status}`);
    }

    const json = await response.json();
    return json.count;
  } catch (error) {
    console.error(error.message);
  }
};
